/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import EditData from './editForm/email.edit.data';
import EditDisplay from './editForm/email.edit.display';
import EditValidation from './editForm/email.edit.validation';
import EditLayout from './editForm/email.edit.layout';
import CommonApi from '../../common-component.edit.api';

const componentForm = (Formio as any).Components.components.email.editForm;

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
