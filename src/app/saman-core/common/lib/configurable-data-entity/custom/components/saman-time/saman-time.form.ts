/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from 'formiojs';
import EditData from './editForm/time.edit.data';
import EditDisplay from './editForm/time.edit.display';
import EditValidation from './editForm/time.edit.validation';
import EditLayout from './editForm/time.edit.layout';

const componentForm = (Formio as any).Components.components.time.editForm;

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