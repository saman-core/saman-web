/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import editForm from './saman-well.form';

const Component = (Formio as any).Components.components.well;

export default class SamanWellComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      type: 'samanWell',
      key: 'well',
      input: false,
      persistent: false,
      components: []
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Well',
      icon: 'square-o',
      group: 'layout',
      documentation: '/userguide/form-building/layout-components#well',
      showPreview: false,
      weight: 60,
      schema: SamanWellComponent.schema()
    };
  }

  static editForm = editForm;
}
