/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from 'formiojs';
import EditData from './editForm/checkbox.edit.data';
import EditDisplay from './editForm/checkbox.edit.display';
import EditValidation from './editForm/checkbox.edit.validation';
import EditLayout from './editForm/checkbox.edit.layout';

const componentForm = (Formio as any).Components.components.checkbox.editForm;

export default function(...extend) {
  return componentForm([
    {
      key: 'display',
      components: EditDisplay
    },
    {
      key: 'data',
      components: EditData
    },
    {
      key: 'validation',
      components: EditValidation
    },
    {
      key: 'layout',
      components: EditLayout
    },
    {
      key: 'logic',
      ignore: true
    },
    {
      key: 'conditional',
      ignore: true
    }
  ], ...extend);
}
