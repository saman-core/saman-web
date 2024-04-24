/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from 'formiojs';
import editForm from './saman-survey.form';

const Component = (Formio as any).Components.components.survey;

export default class SamanSurveyComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      type: 'samanSurvey',
      label: 'Survey',
      key: 'survey',
      questions: [],
      values: []
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Survey',
      group: 'advanced',
      icon: 'list',
      weight: 110,
      documentation: '/userguide/form-building/advanced-components#survey',
      schema: SamanSurveyComponent.schema()
    };
  }

  static editForm = editForm;
}
