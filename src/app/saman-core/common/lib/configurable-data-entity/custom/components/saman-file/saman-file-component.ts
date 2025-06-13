/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import editForm from './saman-file.form';

const Component = (Formio as any).Components.components.file;

export default class SamanFileComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      type: 'samanFile',
      label: 'Upload',
      key: 'file',
      image: false,
      privateDownload: false,
      imageSize: '200',
      filePattern: '*',
      fileMinSize: '0KB',
      fileMaxSize: '1GB',
      uploadOnly: false,
    }, ...extend);
  }
  
  static get builderInfo() {
    return {
      title: 'File',
      group: 'premium',
      icon: 'file',
      documentation: '/userguide/form-building/premium-components#file',
      weight: 100,
      schema: SamanFileComponent.schema(),
    };
  }

  static editForm = editForm;
}
