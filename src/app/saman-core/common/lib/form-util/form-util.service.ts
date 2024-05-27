/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from "@angular/core";

@Injectable()
export class FormUtilService {
  static readonly VALID_TYPES = [
    'samanCheckbox',
    'samanDatetime',
    'samanEmail',
    'samanFile',
    'samanHidden',
    'samanNumber',
    'samanPassword',
    'samanPhoneNumber',
    'samanRadio',
    'samanSelect',
    'samanSelectboxes',
    'samanSignature',
    'samanSurvey',
    'samanTags',
    'samanTextarea',
    'samanTextfield',
    'samanTime',
    'samanUrl',
    'checkbox',
    'datetime',
    'email',
    'file',
    'hidden',
    'number',
    'password',
    'phoneNumber',
    'radio',
    'select',
    'selectboxes',
    'signature',
    'survey',
    'tags',
    'textarea',
    'textfield',
    'time',
    'url',
  ];

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
      return component[key] === value;
    });
    return validArray.length !== 0;
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
          components.push(colum['components']);
        }
      });
    } else if (typeof component['rows'] !== 'undefined') {
      const rows = component['rows'];
      rows.forEach((row) => {
        row.forEach((colum) => {
          if (colum !== null) {
            components.push(colum['components']);
          }
        });
      });
    }
    return components;
  }
}
