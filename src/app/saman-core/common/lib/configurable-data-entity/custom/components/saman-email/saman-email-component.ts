/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from 'formiojs';
import editForm from './saman-email.form';

const Component = (Formio as any).Components.components.email;

export default class SamanEmailComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      type: 'samanEmail',
      label: 'Email',
      key: 'email',
      inputType: 'email',
      kickbox: {
        enabled: false
      }
    }, ...extend);
  }
  
  static get builderInfo() {
    return {
      title: 'Email',
      group: 'advanced',
      icon: 'at',
      documentation: '/userguide/form-building/advanced-components#email',
      weight: 10,
      schema: SamanEmailComponent.schema()
    };
  }

  static editForm = editForm;
}
