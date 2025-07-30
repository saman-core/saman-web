/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import editForm from './saman-panel.form';

const Component = (Formio as any).Components.components.panel;

export default class SamanPanelComponent extends Component {
  static schema(...extend) {
    return Component.schema(
      {
        label: 'Panel',
        type: 'samanPanel',
        key: 'panel',
        title: 'Panel',
        theme: 'default',
        breadcrumb: 'default',
        components: [],
        clearOnHide: false,
        input: false,
        tableView: false,
        persistent: false,
      },
      ...extend,
    );
  }

  static get builderInfo() {
    return {
      title: 'Panel',
      icon: 'list-alt',
      group: 'layout',
      documentation: '/userguide/form-building/layout-components#panel',
      weight: 30,
      schema: SamanPanelComponent.schema(),
    };
  }

  static editForm = editForm;
}
