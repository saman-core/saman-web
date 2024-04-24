import { Utils } from 'formiojs';
import { HTML } from './builder-edit-form';
import Evaluator = Utils.Evaluator;

export const template = {
    builderEditForm: {
      form: function (ctx) {
        return Evaluator.interpolate(HTML, ctx, {});
      }
    }
  };