/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import editForm from './saman-htmlelement.form';

const Component = (Formio as any).Components.components.htmlelement;

export default class SamanHtmlComponent extends Component {
  static schema(...extend) {
    return Component.schema(
      {
        label: 'HTML',
        type: 'samanHtmlelement',
        tag: 'p',
        attrs: [],
        content: '',
        input: false,
        persistent: false,
      },
      ...extend,
    );
  }

  static get builderInfo() {
    return {
      title: 'HTML Element',
      group: 'layout',
      icon: 'code',
      weight: 0,
      documentation: '/userguide/form-building/layout-components#html-element',
      showPreview: false,
      schema: SamanHtmlComponent.schema(),
    };
  }

  static editForm = editForm;
}
