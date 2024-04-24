/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from 'formiojs';
import EditData from './editForm/file.edit.data';
import EditDisplay from './editForm/file.edit.display';
import EditValidation from './editForm/file.edit.validation';
import EditLayout from './editForm/file.edit.layout';

const componentForm = (Formio as any).Components.components.file.editForm;

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
