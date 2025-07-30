/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import editForm from './saman-number.form';

const Component = (Formio as any).Components.components.number;

export default class SamanNumberComponent extends Component {
  static schema(...extend) {
    return Component.schema(
      {
        type: 'samanNumber',
        label: 'Number',
        key: 'number',
        validate: {
          min: '',
          max: '',
          step: 'any',
          integer: '',
        },
      },
      ...extend,
    );
  }

  static get builderInfo() {
    return {
      title: 'Number',
      icon: 'hashtag',
      group: 'basic',
      documentation: '/userguide/form-building/form-components#number',
      weight: 30,
      schema: SamanNumberComponent.schema(),
    };
  }

  static editForm = editForm;
}
