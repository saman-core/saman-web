/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from 'formiojs';
import editForm from './saman-select.form';

const Component = (Formio as any).Components.components.select;

export default class SamanSelectComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      type: 'samanSelect',
      label: 'Select',
      key: 'Select',
      idPath: 'id',
      data: {
        values: [{ label: '', value: '' }],
        json: '',
        url: '',
        resource: '',
        custom: ''
      },
      clearOnRefresh: false,
      limit: 100,
      valueProperty: '',
      lazyLoad: true,
      filter: '',
      searchEnabled: true,
      searchDebounce: 0.3,
      searchField: '',
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
        filter: {}
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
      schema: SamanSelectComponent.schema()
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

    // Only load the data if it is visible.
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
        // If there is no resource, or we are lazyLoading, wait until active.
        if (!this.component.data.resource || (!forceUpdate && !this.active)) {
          this.itemsLoadedResolve();
          return;
        }

        const resourceUrl = this.options.formio ? this.options.formio.formsUrl : `${Formio.getProjectUrl()}/nuevo`;

        if (forceUpdate || this.additionalResourcesAvailable || !this.serverCount) {
          try {
            this.loadItems(resourceUrl, searchInput, this.requestHeaders);
          }
          catch (err) {
            console.warn(`Unable to load resources for ${this.key}`);
          }
        }
        else {
          this.setItems(this.downloadedResources);
        }
        break;
      }
    }
  }
}
