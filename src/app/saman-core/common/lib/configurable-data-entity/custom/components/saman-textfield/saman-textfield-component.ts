/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import editForm from './saman-textfield.form';

const Component = (Formio as any).Components.components.textfield;

export default class SamanTextfieldComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      label: 'Text Field',
      key: 'textField',
      type: 'samanTextfield',
      mask: false,
      inputType: 'text',
      inputFormat: 'plain',
      inputMask: '',
      displayMask: '',
      tableView: true,
      spellcheck: true,
      truncateMultipleSpaces: false,
      validate: {
        minLength: '',
        maxLength: '',
        pattern: ''
      }
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Text Field',
      icon: 'terminal',
      group: 'basic',
      documentation: '/userguide/form-building/form-components#text-field',
      weight: 0,
      schema: SamanTextfieldComponent.schema()
    };
  }

  static editForm = editForm;
}
