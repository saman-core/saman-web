import { FormioComponent, FormioUtils } from '@formio/angular';
import { Component as Component2 } from '@formio/js/types/components/_classes/component/component';

export class FormUtils {
  private _keys: string[] = [];

  getComponentKeys(component: FormioComponent): string[] {
    this._keys = [];
    this._iterateComponent(component.formio.components);
    return this._keys;
  }

  private _iterateComponent(cs: Component2[]): void {
    const comp: Array<Component2> = [];
    FormioUtils.eachComponent(cs, (c: Component2) => comp.push(c), true);

    comp.forEach((c) => this._printNotLayout(c));
  }

  private _printNotLayout(c: Component2): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let c2: any = c;
    if (typeof c.component !== 'undefined') {
      c2 = c.component;
    }

    if (FormioUtils.isLayoutComponent(c2)) {
      if (typeof c2.components !== 'undefined') {
        this._iterateComponent(c2.components);
      } else if (typeof c2.rows !== 'undefined') {
        c2.rows.forEach((row) => {
          row.forEach((colum) => {
            this._iterateComponent(colum.components);
          });
        });
      } else if (typeof c2.columns !== 'undefined') {
        c2.columns.forEach((colum) => {
          this._iterateComponent(colum.components);
        });
      }
    } else {
      this._keys.push(c2.key);
    }
  }
}
