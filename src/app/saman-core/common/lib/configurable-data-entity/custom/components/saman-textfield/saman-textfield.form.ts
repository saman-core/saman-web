/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from 'formiojs';
import EditData from './editForm/textfield.edit.data';
import EditDisplay from './editForm/textfield.edit.display';
import EditValidation from './editForm/textfield.edit.validation';
import EditLayout from './editForm/textfield.edit.layout';

const componentForm = (Formio as any).Components.components.textfield.editForm;

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
