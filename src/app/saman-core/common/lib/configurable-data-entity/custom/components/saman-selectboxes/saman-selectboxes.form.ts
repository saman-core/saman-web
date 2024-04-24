/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from 'formiojs';
import EditData from './editForm/selectboxes.edit.data';
import EditDisplay from './editForm/selectboxes.edit.display';
import EditValidation from './editForm/selectboxes.edit.validation';
import EditLayout from './editForm/selectboxes.edit.layout';

const componentForm = (Formio as any).Components.components.selectboxes.editForm;

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
