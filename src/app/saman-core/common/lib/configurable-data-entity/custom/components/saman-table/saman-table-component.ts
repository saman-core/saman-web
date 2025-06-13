/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import editForm from './saman-table.form';

const Component = (Formio as any).Components.components.table;

export default class SamanTableComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      label: 'Table',
      type: 'samanTable',
      input: false,
      key: 'table',
      numRows: 3,
      numCols: 3,
      rows: SamanTableComponent.emptyTable(3, 3),
      header: [],
      caption: '',
      cloneRows: false,
      striped: false,
      bordered: false,
      hover: false,
      condensed: false,
      persistent: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Table',
      group: 'layout',
      icon: 'table',
      weight: 40,
      documentation: '/userguide/form-building/layout-components#table',
      showPreview: false,
      schema: SamanTableComponent.schema()
    };
  }

  static editForm = editForm;
}
