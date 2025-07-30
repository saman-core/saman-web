/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import editForm from './saman-tabs.form';

const Component = (Formio as any).Components.components.tabs;

export default class SamanTabsComponent extends Component {
  static schema(...extend) {
    return Component.schema(
      {
        label: 'Tabs',
        type: 'samanTabs',
        input: false,
        key: 'tabs',
        persistent: false,
        tableView: false,
        components: [
          {
            label: 'Tab 1',
            key: 'tab1',
            components: [],
          },
        ],
        verticalLayout: false,
      },
      ...extend,
    );
  }

  static get builderInfo() {
    return {
      title: 'Tabs',
      group: 'layout',
      icon: 'folder-o',
      weight: 50,
      documentation: '/userguide/form-building/layout-components#tabs',
      showPreview: false,
      schema: SamanTabsComponent.schema(),
    };
  }

  static editForm = editForm;
}
