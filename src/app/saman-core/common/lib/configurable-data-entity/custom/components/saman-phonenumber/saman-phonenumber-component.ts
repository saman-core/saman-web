/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from 'formiojs';
import editForm from './saman-phonenumber.form';

const Component = (Formio as any).Components.components.phoneNumber;

export default class SamanPhoneNumberComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      type: 'samanPhoneNumber',
      label: 'Phone Number',
      key: 'phoneNumber',
      inputType: 'tel',
      inputMask: '(999) 999-9999',
      inputMode: 'decimal',
      displayMask: '',
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Phone Number',
      group: 'advanced',
      icon: 'phone-square',
      weight: 30,
      documentation: '/userguide/form-building/advanced-components#phone-number',
      schema: SamanPhoneNumberComponent.schema()
    };
  }

  static editForm = editForm;
}
