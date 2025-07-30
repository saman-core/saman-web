/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import editForm from './saman-content.form';

const Component = (Formio as any).Components.components.content;

export default class SamanContentComponent extends Component {
  static schema(...extend) {
    return Component.schema(
      {
        label: 'Content',
        type: 'samanContent',
        key: 'content',
        input: false,
        html: '',
      },
      ...extend,
    );
  }

  static get builderInfo() {
    return {
      title: 'Content',
      group: 'layout',
      icon: 'html5',
      preview: false,
      documentation: '/userguide/form-building/layout-components#content',
      weight: 5,
      schema: SamanContentComponent.schema(),
    };
  }

  static editForm = editForm;
}
