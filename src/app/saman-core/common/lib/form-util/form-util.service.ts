/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { FormioUtils } from '@formio/angular';
import { GenericResourceRepository } from '@saman-core/data';
import { Observable, catchError, map, of } from 'rxjs';
import _ from 'lodash';
import { VALID_TYPES } from './valid-types';

export type MapperTableRow = (rows: object[]) => Observable<object[]>;

@Injectable()
export class FormUtilService {
  static readonly VALID_TYPES = VALID_TYPES;

  constructor(private _resourceRepository: GenericResourceRepository) {}

  public getListMappers(formJson: object, keys: string[] = []): MapperTableRow[] {
    const selectTypeComponents = (componentType: string) => {
      const listTypes = ['samanSelect', 'samanRadio', 'select', 'radio'];
      return !!listTypes.find((t) => t === componentType);
    };
    const filters = { type: selectTypeComponents };
    if (keys.length > 0) {
      filters['key'] = (key: string) => {
        return !!keys.find((k) => k === key);
      };
    }

    const flatComponets = this.filterComponents(formJson['components'], filters);
    return flatComponets.map((c) => {
      let mapper: MapperTableRow;
      const label = this._getListLabel(c);
      const key = c['key'];

      if (c['dataSrc'] === 'json') {
        const id = c['valueProperty'];
        const items = c['data']['json'];
        mapper = this._generateMapper(id, label, key, items);
      } else if (c['dataSrc'] === 'resource') {
        const id = 'id';
        const resourceName = c['data']['resource'];
        mapper = this._generateMapperResource(id, label, key, resourceName);
      } else {
        const id = 'value';
        const items = c['data']['values'];
        mapper = this._generateMapper(id, label, key, items);
      }
      return mapper;
    });
  }

  private _generateMapper(id: string, label: string, key: string, items: object[]): MapperTableRow {
    return (rows: object[]) => {
      let newRows: object[];
      try {
        newRows = rows.map((row) => {
          const value = row[key];
          const item = this._findItem(items, id, value);
          if (typeof item !== 'undefined') {
            const newValue = FormioUtils.interpolate(label, { item: item });
            row[key] = newValue;
          }
          return row;
        });
      } catch (e) {
        console.warn(`can not Mapper rows: ${e}`);
        newRows = rows;
      }
      return of(newRows);
    };
  }

  private _generateMapperResource(
    id: string,
    label: string,
    key: string,
    resourceName: string,
  ): MapperTableRow {
    return (rows: object[]) => {
      const ids = this._getRowsIds(rows, key);
      if (ids.length === 0) {
        return of([]);
      }
      return this._resourceRepository.getAllByIds(resourceName, ids).pipe(
        map((items) => {
          const newRows = rows.map((data) => {
            const value = data[key];
            const item = this._findItem(items, id, value);
            if (typeof item !== 'undefined') {
              const newValue = FormioUtils.interpolate(label, { item: item });
              data[key] = newValue;
            }
            return data;
          });
          return newRows;
        }),
        catchError((e) => {
          console.warn(`can not Mapper rows: ${e}`);
          return of(rows);
        }),
      );
    };
  }

  private _getRowsIds(rows: object[], key: string): number[] | string[] {
    let ids: number[] | string[];
    try {
      ids = _.uniq(rows.map((r) => r[key]).filter(k => this._isKeyType(k)));
    } catch (e) {
      console.warn(`can not get rows Ids: ${e}`);
      ids = [];
    }
    return ids;
  }

  private _isKeyType(k: any): boolean {
    return typeof k === "string" || (!isNaN(parseFloat(k)) && isFinite(k));
  }

  private _findItem(items: object[], id: string, value: any): object | undefined {
    return items.find((i) => i[id] == value);
  }

  private _getListLabel(c): string {
    if (typeof c['template'] === 'undefined') {
      return '<span>{{ item.label }}</span>';
    }
    return c['template'];
  }

  public getDefaultValues(formJson: object): object {
    const components = formJson['components'];
    const flatComponets = this.filterComponents(components, {});
    const defaultValues = {};
    flatComponets
      .filter((c) => typeof c['defaultValue'] !== 'undefined')
      .forEach((c) => (defaultValues[c['key']] = c['defaultValue']));
    return defaultValues;
  }

  public getFlatInputComponents(formJson: object, filter: { [key: string]: any } = {}): object {
    const components = formJson['components'];
    const filtereds = this.filterComponents(components, filter);
    return { components: filtereds };
  }

  private filterComponents(components: object[], filter: { [key: string]: any }): object[] {
    if (components === null) {
      return [];
    }
    const componentsFiltered = [];
    components.forEach((component) => {
      if (this.isInput(component)) {
        if (this.isComponentValid(component, filter)) {
          componentsFiltered.push(component);
        }
      } else {
        componentsFiltered.push(...this.filterComponents(this.getSubComponents(component), filter));
      }
    });
    return componentsFiltered;
  }

  private isInput(component: object): boolean {
    const type = component['type'];
    const found = FormUtilService.VALID_TYPES.find((element) => element === type);
    return typeof found !== 'undefined';
  }

  private isComponentValid(component: object, filter: { [key: string]: any }): boolean {
    const keys = Object.keys(filter);
    if (keys.length === 0) {
      return true;
    }
    const validArray = keys.filter((key) => {
      const value = filter[key];
      if (typeof value === 'function') {
        return value(component[key]);
      } else {
        return component[key] === value;
      }
    });
    return validArray.length === keys.length;
  }

  private getSubComponents(component: object): object[] {
    if (typeof component['components'] !== 'undefined') {
      return component['components'];
    }
    const components = [];
    if (typeof component['columns'] !== 'undefined') {
      const columns = component['columns'];
      columns.forEach((colum) => {
        if (colum['components'] !== null) {
          components.push(...colum['components']);
        }
      });
    } else if (typeof component['rows'] !== 'undefined') {
      const rows = component['rows'];
      rows.forEach((row) => {
        row.forEach((colum) => {
          if (colum !== null) {
            components.push(...colum['components']);
          }
        });
      });
    }
    return components;
  }
}
