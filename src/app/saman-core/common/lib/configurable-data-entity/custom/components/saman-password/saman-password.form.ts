/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import EditData from './editForm/password.edit.data';
import EditDisplay from './editForm/password.edit.display';
import EditValidation from './editForm/password.edit.validation';
import EditLayout from './editForm/password.edit.layout';
import CommonApi from '../../common-component.edit.api';

const componentForm = (Formio as any).Components.components.password.editForm;

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
