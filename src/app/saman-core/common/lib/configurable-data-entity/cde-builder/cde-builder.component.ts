import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormioComponent, FormioRefreshValue } from '@formio/angular';
import { PrismService } from '../prism.service';
import { FormUtils } from '../form-utils';
import { buildOptions } from './options';

@Component({
  selector: 'app-cde-builder',
  templateUrl: './cde-builder.component.html',
  styleUrl: './cde-builder.component.scss',
})
export class CdeBuilderComponent implements AfterViewInit {
  @ViewChild('formpreview') formComponent!: FormioComponent;
  public refreshForm: EventEmitter<FormioRefreshValue> = new EventEmitter();
  @Input() form: object = { components: [] };
  @Output() newVal = new EventEmitter<object>();
  public options = buildOptions;

  constructor(public prism: PrismService) {}
  
  getComponentsKey(): string[] {
    const util = new FormUtils();
    return util.getComponentsKey(this.formComponent).sort();
  }

  onChange(event) {
    this.newVal.emit(event.form);
    this.refreshForm.emit({
      property: 'form',
      value: event.form,
    });
  }

  ngAfterViewInit() {
    this.prism.init();
  }
}
