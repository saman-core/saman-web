import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Formio, FormioModule, Templates } from '@formio/angular';
import { FormioGrid } from '@formio/angular/grid';
import { FormioResources } from '@formio/angular/resource';
import { Utils } from '@formio/js';
import bootstrap4 from '@formio/bootstrap/bootstrap4';

import { CdeComponent } from './cde/cde.component';
import { CdeBuilderComponent } from './cde-builder/cde-builder.component';
import { PrismService } from './prism.service';
import { HTML } from './builder-edit-form';
import Evaluator = Utils.Evaluator;

Formio.use(bootstrap4);

Templates.current = {
  builderEditForm: {
    form: function (ctx) {
      const editForm = ctx.instance.editForm;
      let index = 0;
      editForm.components.forEach((c, i) => {
        if (c.path === 'tabs') {
          index = i;
          return;
        }
      });
      const oldComponents = editForm.components[index].component.components;
      const oldTabs = editForm.components[index].tabs;
      oldComponents.forEach((c, i) => {
        if (c.key === 'logic' || c.key === 'conditional') {
          oldTabs[i] = null;
          oldComponents[i] = null;
        }
        if (c.key === 'layout') {
          c.components = c.components.filter(subC => subC.key !== 'overlay');
          oldComponents[i] = c;
          oldTabs[i] = oldTabs[i].filter(subC => subC.key !== 'overlay');
        }
        if (c.key === 'validation') {
          c.components = c.components.filter(subC => !(subC.key === 'errors' || subC.key === 'json-validation-json' || subC.key === 'custom-validation-js'));
          oldComponents[i] = c;
          oldTabs[i] = oldTabs[i].filter(subC => !(subC.key === 'errors' || subC.key === 'json-validation-json' || subC.key === 'custom-validation-js'));
        }
        if (c.key === 'data') {
          c.components = c.components.filter(subC => !(subC.key === 'overlay' || subC.key === 'customDefaultValuePanel' || subC.key === 'calculateValuePanel' || subC.key === 'calculateServer' || subC.key === 'allowCalculateOverride'));
          oldComponents[i] = c;
          oldTabs[i] = oldTabs[i].filter(subC => !(subC.key === 'overlay' || subC.key === 'customDefaultValuePanel' || subC.key === 'calculateValuePanel' || subC.key === 'calculateServer' || subC.key === 'allowCalculateOverride'));

          c.components.forEach((subC, j) => {
            if (subC.key === 'encrypted') {
              subC.logic = [];
              const tooltip = subC.tooltip;

              const encryptedTabComponent = oldTabs[i][j];
              encryptedTabComponent.component.disabled = false;
              encryptedTabComponent.component.tooltip = tooltip;
              encryptedTabComponent.component.logic = [];
            }
          });
        }
      });
      const newComponents = oldComponents.filter(e => e !== null);
      const newTabs = oldTabs.filter(e => e !== null);

      console.log(newComponents);
      console.log(newTabs);

      editForm.components[index].component.components = newComponents;
      editForm.components[index].tabs = newTabs;

      ctx.editForm = editForm.render();
      return Evaluator.interpolate(HTML, ctx, {});
    }
  }
};

@NgModule({
  declarations: [
    CdeComponent,
    CdeBuilderComponent
  ],
  imports: [
    CommonModule,
    FormioModule,
    FormioGrid
  ],
  providers: [
    PrismService,
    FormioResources
  ],
  exports: [
    CdeComponent,
    CdeBuilderComponent
  ]
})
export class ConfigurableDataEntityModule {
}
