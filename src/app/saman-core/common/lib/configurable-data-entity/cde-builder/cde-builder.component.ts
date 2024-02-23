import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { PrismService } from '../prism.service';
import { FormioRefreshValue } from '@formio/angular';

@Component({
  selector: 'app-cde-builder',
  templateUrl: './cde-builder.component.html',
  styleUrl: './cde-builder.component.scss',
})
export class CdeBuilderComponent implements AfterViewInit {
  public refreshForm: EventEmitter<FormioRefreshValue> = new EventEmitter();
  @Input() form: object = { components: [] };
  @Output() formChange = new EventEmitter<object>();

  constructor(public prism: PrismService) {}

  onChange(event) {
    this.formChange.emit(event.form);
    this.refreshForm.emit({
      property: 'form',
      value: event.form,
    });
  }

  ngAfterViewInit() {
    this.prism.init();
  }
}
