/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import editForm from './saman-password.form';

const Component = (Formio as any).Components.components.password;

export default class SamanPasswordComponent extends Component {
  static schema(...extend) {
    return Component.schema(
      {
        type: 'samanPassword',
        label: 'Password',
        key: 'password',
        protected: true,
        tableView: false,
      },
      ...extend,
    );
  }

  static get builderInfo() {
    return {
      title: 'Password',
      icon: 'asterisk',
      group: 'basic',
      documentation: '/userguide/form-building/form-components#password',
      weight: 40,
      schema: SamanPasswordComponent.schema(),
    };
  }

  static editForm = editForm;
}
