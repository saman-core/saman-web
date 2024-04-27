/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from 'formiojs';
import editForm from './saman-tags.form';

const Component = (Formio as any).Components.components.tags;

export default class SamanTagsComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      type: 'samanTags',
      label: 'Tags',
      key: 'tags',
      delimeter: ',',
      storeas: 'array',
      maxTags: 0
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Tags',
      icon: 'tags',
      group: 'advanced',
      documentation: '/userguide/form-building/advanced-components#tags',
      weight: 30,
      schema: SamanTagsComponent.schema()
    };
  }

  static editForm = editForm;
}
