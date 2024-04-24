/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from 'formiojs';
import editForm from './saman-hidden.form';

const Component = (Formio as any).Components.components.hidden;

export default class SamanHiddenComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      type: 'samanHidden',
      tableView: false,
      inputType: 'hidden'
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Hidden',
      group: 'data',
      icon: 'user-secret',
      weight: 0,
      documentation: '/userguide/form-building/data-components#hidden',
      showPreview: false,
      schema: SamanHiddenComponent.schema()
    };
  }

  static editForm = editForm;
}
