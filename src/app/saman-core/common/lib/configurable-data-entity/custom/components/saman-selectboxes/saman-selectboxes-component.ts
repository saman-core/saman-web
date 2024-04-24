/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from 'formiojs';
import editForm from './saman-selectboxes.form';

const Component = (Formio as any).Components.components.selectboxes;

export default class SamanSelectboxesComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      type: 'samanSelectboxes',
      label: 'Select Boxes',
      key: 'selectBoxes',
      inline: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Select Boxes',
      group: 'basic',
      icon: 'plus-square',
      weight: 60,
      documentation: '/userguide/form-building/form-components#select-box',
      schema: SamanSelectboxesComponent.schema()
    };
  }

  static editForm = editForm;
}
