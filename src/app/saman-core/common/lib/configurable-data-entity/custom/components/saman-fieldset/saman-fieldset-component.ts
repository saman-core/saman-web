/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import editForm from './saman-fieldset.form';

const Component = (Formio as any).Components.components.fieldset;

export default class SamanFieldsetComponent extends Component {
  static schema(...extend) {
    return Component.schema(
      {
        label: 'Field Set',
        key: 'fieldSet',
        type: 'samanFieldset',
        legend: '',
        components: [],
        input: false,
        persistent: false,
      },
      ...extend,
    );
  }

  static get builderInfo() {
    return {
      title: 'Field Set',
      icon: 'th-large',
      group: 'layout',
      documentation: '/userguide/form-building/layout-components#field-set',
      showPreview: false,
      weight: 20,
      schema: SamanFieldsetComponent.schema(),
    };
  }

  static editForm = editForm;
}
