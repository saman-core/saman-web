/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import EditData from './editForm/select.edit.data';
import EditDisplay from './editForm/select.edit.display';
import EditValidation from './editForm/select.edit.validation';
import EditLayout from './editForm/select.edit.layout';
import CommonApi from '../../common-component.edit.api';

const componentForm = (Formio as any).Components.components.list.editForm;

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
