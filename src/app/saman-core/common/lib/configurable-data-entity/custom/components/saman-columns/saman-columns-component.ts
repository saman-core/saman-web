/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import editForm from './saman-columns.form';

const Component = (Formio as any).Components.components.columns;

export default class SamanColumnsComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      label: 'Columns',
      key: 'columns',
      type: 'samanColumns',
      columns: [
        { components: [], width: 6, offset: 0, push: 0, pull: 0, size: 'md' },
        { components: [], width: 6, offset: 0, push: 0, pull: 0, size: 'md' }
      ],
      clearOnHide: false,
      input: false,
      tableView: false,
      persistent: false,
      autoAdjust: false
    }, ...extend);
  }
  
  static get builderInfo() {
    return {
      title: 'Columns',
      icon: 'columns',
      group: 'layout',
      documentation: '/userguide/form-building/layout-components#columns',
      showPreview: false,
      weight: 10,
      schema: SamanColumnsComponent.schema()
    };
  }

  static editForm = editForm;
}
