/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from 'formiojs';
import EditData from './editForm/phonenumber.edit.data';
import EditDisplay from './editForm/phonenumber.edit.display';
import EditValidation from './editForm/phonenumber.edit.validation';
import EditLayout from './editForm/phonenumber.edit.layout';

const componentForm = (Formio as any).Components.components.phoneNumber.editForm;

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
