/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from 'formiojs';
import editForm from './saman-select.form';
import { PageableModel } from '@saman-core/data';
import { ServiceProvider } from '../../../service-provider';
import _ from 'lodash';

const Component = (Formio as any).Components.components.select;

export default class SamanSelectComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      authenticate: true,
      type: 'samanSelect',
      label: 'Select',
      key: 'Select',
      idPath: 'value',
      data: {
        values: [{ label: '', value: '' }],
        json: '',
        url: '',
        resource: '',
        custom: '',
      },
      clearOnRefresh: false,
      limit: 100,
      valueProperty: 'id',
      lazyLoad: true,
      filter: '',
      searchEnabled: true,
      searchDebounce: 0.3,
      searchField: 'label__regex',
      minSearch: 0,
      readOnlyValue: false,
      selectFields: '',
      selectThreshold: 0.3,
      uniqueOptions: false,
      tableView: true,
      fuseOptions: {
        include: 'score',
        threshold: 0.3,
      },
      indexeddb: {
        filter: {},
      },
      customOptions: {},
      useExactSearch: false,
    });
  }

  static get builderInfo() {
    return {
      title: 'Select',
      group: 'basic',
      icon: 'th-list',
      weight: 70,
      documentation: '/userguide/form-building/form-components#select',
      schema: SamanSelectComponent.schema(),
    };
  }

  static editForm = editForm;

  /* eslint-disable max-statements */
  updateItems(searchInput, forceUpdate) {
    if (!this.component.data) {
      console.warn(`Select component ${this.key} does not have data configuration.`);
      this.itemsLoadedResolve();
      return;
    }

    if (!this.visible) {
      this.itemsLoadedResolve();
      return;
    }

    switch (this.component.dataSrc) {
      case 'values':
        this.setItems(this.component.data.values);
        break;
      case 'json':
        this.setItems(this.component.data.json);
        break;
      case 'resource': {
        if (!this.component.data.resource || (!forceUpdate && !this.active)) {
          this.itemsLoadedResolve();
          return;
        }

        if (forceUpdate || this.additionalResourcesAvailable || !this.serverCount) {
          try {
            const resourceName = this.component.data.resource;
            this.loadItems(resourceName, searchInput);
          } catch (err) {
            console.warn(`Unable to load resources for ${this.key}`);
          }
        } else {
          this.setItems(this.downloadedResources);
        }
        break;
      }
    }
  }

  loadItems(resourceName: string, search) {
    if (!this.shouldLoad || !this.itemsFromUrl) {
      this.isScrollLoading = false;
      this.loading = false;
      this.itemsLoadedResolve();
      return;
    }

    const minSearch = parseInt(this.component.minSearch, 10);
    if (this.component.searchField && minSearch > 0 && (!search || search.length < minSearch)) {
      return this.setItems([]);
    }

    const limit = this.component.limit || 100;
    const skip = this.isScrollLoading ? this.selectOptions.length : 0;

    const pageableModel = new PageableModel();
    pageableModel.page = Math.abs(Math.floor(skip / limit));
    pageableModel.size = limit;

    if (this.component.sort) {
      pageableModel.sort = this.component.sort;
    }

    let searchField = '';
    let searchValue = '';
    if (this.component.searchField && search) {
      searchField = this.component.searchField;
      if (Array.isArray(search)) {
        searchValue = search.join(',');
      } else if (typeof search === 'object') {
        searchValue = JSON.stringify(search);
      } else {
        searchValue = search;
      }
    }

    let filter = '';
    if (this.component.filter) {
      filter = this.interpolate(this.component.filter);
    }

    this.loading = true;
    ServiceProvider.genericResourceRepository
      .loadItems(resourceName, pageableModel, filter, searchField, searchValue)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.error = null;
          this.setItems(response.data, !!search);
        },
        error: (err) => {
          if (this.itemsFromUrl) {
            this.setItems([]);
            this.disableInfiniteScroll();
          }

          this.isScrollLoading = false;
          this.handleLoadingError(err);
        },
      });
  }

  itemTemplate(data, value) {
    if (!_.isNumber(data) && _.isEmpty(data)) {
      return '';
    }

    // If they wish to show the value in read only mode, then just return the itemValue here.
    if (this.options.readOnly && this.component.readOnlyValue) {
      return this.itemValue(data);
    }
    // Perform a fast interpretation if we should not use the template.
    if (data && !this.component.template) {
      const itemLabel = data.label || data;
      const value =
        typeof itemLabel === 'string' ? this.t(itemLabel, { _userInput: true }) : itemLabel;
      return this.sanitize(value, this.shouldSanitizeValue);
    }

    if (
      this.component.multiple && _.isArray(this.dataValue)
        ? this.dataValue.find((val) => value === val)
        : this.dataValue === value
    ) {
      const selectData = this.selectData;
      if (selectData) {
        const templateValue = this.component.reference && value?._id ? value._id.toString() : value;
        if (!this.templateData || !this.templateData[templateValue]) {
          this.getOptionTemplate(data, value);
        }
        if (this.component.multiple) {
          if (selectData[templateValue]) {
            data = selectData[templateValue];
          }
        } else {
          data = selectData;
        }
      }
    }

    if (typeof data === 'string' || typeof data === 'number') {
      const resourceName = this.component.data.resource;

      let valueFromRepository: string | number;
      try {
        const response = ServiceProvider.genericResourceRepository.getByIdSync(resourceName, data);
        const options = {
          noeval: true,
          data: {},
        };
        valueFromRepository = this.sanitize(
          this.component.template
            ? this.interpolate(this.component.template, { item: response }, options)
            : response['label'],
          this.shouldSanitizeValue,
        );
      } catch (_) {
        console.warn(`Can't not fetch ${resourceName} by id ${data}`);
        valueFromRepository = data;
      }

      return this.sanitize(
        this.t(valueFromRepository, { _userInput: true }),
        this.shouldSanitizeValue,
      );
    }
    if (Array.isArray(data)) {
      return data.map((val) => {
        if (typeof val === 'string' || typeof val === 'number') {
          return this.sanitize(this.t(val, { _userInput: true }), this.shouldSanitizeValue);
        }
        return val;
      });
    }

    if (data.data) {
      // checking additional fields in the template for the selected Entire Object option
      const hasNestedFields = /item\.data\.\w*/g.test(this.component.template);
      data.data =
        this.isEntireObjectDisplay() && _.isObject(data.data) && !hasNestedFields
          ? JSON.stringify(data.data)
          : data.data;
    }
    return super.itemTemplate(data, value);
  }
}
