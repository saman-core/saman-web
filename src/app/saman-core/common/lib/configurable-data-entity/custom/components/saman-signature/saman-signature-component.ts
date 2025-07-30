/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import editForm from './saman-signature.form';

const Component = (Formio as any).Components.components.signature;

export default class SamanSignatureComponent extends Component {
  static schema(...extend) {
    return Component.schema(
      {
        type: 'samanSignature',
        label: 'Signature',
        key: 'signature',
        footer: 'Sign above',
        width: '100%',
        height: '150px',
        penColor: 'black',
        backgroundColor: 'rgb(245,245,235)',
        minWidth: '0.5',
        maxWidth: '2.5',
        keepOverlayRatio: true,
      },
      ...extend,
    );
  }

  static get builderInfo() {
    return {
      title: 'Signature',
      group: 'advanced',
      icon: 'pencil',
      weight: 120,
      documentation: '/developers/integrations/esign/esign-integrations#signature-component',
      schema: SamanSignatureComponent.schema(),
    };
  }

  static editForm = editForm;
}
