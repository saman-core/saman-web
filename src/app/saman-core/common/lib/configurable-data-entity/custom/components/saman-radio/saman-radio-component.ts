/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import editForm from './saman-radio.form';

const Component = (Formio as any).Components.components.radio;

export default class SamanRadioComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      type: 'samanRadio',
      inputType: 'radio',
      label: 'Radio',
      key: 'radio',
      values: [{ label: '', value: '' }],
      data: {
        url: '',
      },
      fieldSet: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Radio',
      group: 'basic',
      icon: 'dot-circle-o',
      weight: 80,
      documentation: '/userguide/form-building/form-components#radio',
      schema: SamanRadioComponent.schema()
    };
  }

  static editForm = editForm;
}
