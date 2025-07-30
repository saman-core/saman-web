/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import editForm from './saman-textarea.form';

const Component = (Formio as any).Components.components.textarea;

export default class SamanTextareaComponent extends Component {
  static schema(...extend) {
    return Component.schema(
      {
        type: 'samanTextarea',
        label: 'Text Area',
        key: 'textArea',
        rows: 3,
        wysiwyg: false,
        editor: '',
        fixedSize: true,
        inputFormat: 'html',
        validate: {
          minWords: '',
          maxWords: '',
        },
      },
      ...extend,
    );
  }

  static get builderInfo() {
    return {
      title: 'Text Area',
      group: 'basic',
      icon: 'font',
      documentation: '/userguide/form-building/form-components#text-area',
      weight: 20,
      schema: SamanTextareaComponent.schema(),
    };
  }

  static editForm = editForm;
}
