/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from 'formiojs';
import EditData from './editForm/textarea.edit.data';
import EditDisplay from './editForm/textarea.edit.display';
import EditValidation from './editForm/textarea.edit.validation';
import EditLayout from './editForm/textarea.edit.layout';
import CommonApi from '../../common-component.edit.api';

const componentForm = (Formio as any).Components.components.textarea.editForm;

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
