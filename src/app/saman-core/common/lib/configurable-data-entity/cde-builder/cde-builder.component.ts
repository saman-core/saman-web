import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormioComponent, FormioRefreshValue, FormioModule } from '@formio/angular';
import { buildOptions } from './options';
import { ConfigurableDataEntityModule } from '../configurable-data-entity.module';

@Component({
  selector: 'app-cde-builder',
  templateUrl: './cde-builder.component.html',
  styleUrl: './cde-builder.component.scss',
  imports: [FormioModule, ConfigurableDataEntityModule],
})
export class CdeBuilderComponent {
  @ViewChild('formpreview') formComponent!: FormioComponent;
  public refreshForm: EventEmitter<FormioRefreshValue> = new EventEmitter();
  @Input() form: object = { components: [] };
  @Output() newVal = new EventEmitter<object>();
  public options = buildOptions;

  onChange(event) {
    this.newVal.emit(event.form);
    this.refreshForm.emit({
      property: 'form',
      value: event.form,
    });
  }
}
