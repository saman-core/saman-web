/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from 'formiojs';
import editForm from './saman-checkbox.form';

const Component = (Formio as any).Components.components.checkbox;

export default class SamanCheckboxComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      type: 'samanCheckbox',
      inputType: 'checkbox',
      label: 'Checkbox',
      key: 'checkbox',
      dataGridLabel: true,
      labelPosition: 'right',
      value: '',
      name: ''
    }, ...extend);
  }
  
  static get builderInfo() {
    return {
      title: 'Checkbox',
      group: 'basic',
      icon: 'check-square',
      documentation: '/userguide/form-building/form-components#check-box',
      weight: 50,
      schema: SamanCheckboxComponent.schema()
    };
  }

  static editForm = editForm;
}
