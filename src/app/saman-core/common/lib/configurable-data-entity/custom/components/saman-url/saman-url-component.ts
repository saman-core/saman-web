/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from 'formiojs';
import editForm from './saman-url.form';

const Component = (Formio as any).Components.components.url;

export default class SamanUrlComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      type: 'samanUrl',
      label: 'Url',
      key: 'url',
      inputType: 'url'
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Url',
      group: 'advanced',
      icon: 'link',
      documentation: '/userguide/form-building/advanced-components#url',
      weight: 20,
      schema: SamanUrlComponent.schema()
    };
  }

  static editForm = editForm;
}
