import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormioComponent, FormioRefreshValue, FormioModule } from '@formio/angular';
import { MatButtonModule } from '@angular/material/button';
import { buildOptions } from './options';
import { ConfigurableDataEntityModule } from '../configurable-data-entity.module';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cde-builder',
  templateUrl: './cde-builder.component.html',
  styleUrl: './cde-builder.component.scss',
  imports: [
    CommonModule,
    FormioModule,
    ConfigurableDataEntityModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class CdeBuilderComponent {
  selectedStep = 0;
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
