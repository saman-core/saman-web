/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import EditDisplay from './editForm/panel.edit.display';
import EditLayout from './editForm/panel.edit.layout';
import CommonApi from '../../common-component.edit.api';

const componentForm = (Formio as any).Components.components.panel.editForm;

export default function (...extend) {
  return componentForm(
    [
      {
        key: 'display',
        components: EditDisplay,
      },
      {
        key: 'layout',
        components: EditLayout,
      },
      {
        key: 'api',
        components: CommonApi,
      },
      {
        key: 'logic',
        ignore: true,
      },
      {
        key: 'conditional',
        ignore: true,
      },
    ],
    ...extend,
  );
}
