/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import editForm from './saman-time.form';

const Component = (Formio as any).Components.components.time;
const defaultDataFormat = 'HH:mm:ss';

export default class SamanTimeComponent extends Component {
  static schema(...extend) {
    return Component.schema(
      {
        type: 'samanTime',
        label: 'Time',
        key: 'time',
        inputType: 'time',
        format: 'HH:mm',
        dataFormat: defaultDataFormat,
      },
      ...extend,
    );
  }

  static get builderInfo() {
    return {
      title: 'Time',
      icon: 'clock-o',
      group: 'advanced',
      documentation: '/userguide/form-building/advanced-components#time-1',
      weight: 55,
      schema: SamanTimeComponent.schema(),
    };
  }

  static editForm = editForm;
}
