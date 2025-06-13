/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import EditData from './editForm/hidden.edit.data';
import EditDisplay from './editForm/hidden.edit.display';
import EditValidation from './editForm/hidden.edit.validation';
import EditLayout from './editForm/hidden.edit.layout';
import CommonApi from '../../common-component.edit.api';

const componentForm = (Formio as any).Components.components.hidden.editForm;

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
      key: 'api',
      components: CommonApi
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
