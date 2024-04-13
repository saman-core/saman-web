import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormioComponent, FormioRefreshValue } from '@formio/angular';
import { InitService } from '../init.service';
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

  constructor(private _initService: InitService) {
    _initService.initConf();
  }
  
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
    this._initService.initPrism();
  }
}
