import { Utils } from '@formio/js';
import { HTML } from './builder-edit-form';

const Evaluator = Utils.Evaluator;

export const template = {
    builderEditForm: {
      form: function (ctx) {
        return Evaluator.interpolate(HTML, ctx, {});
      }
    }
  };