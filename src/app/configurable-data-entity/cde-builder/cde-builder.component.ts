import {AfterViewInit, Component, ElementRef, EventEmitter, ViewChild} from '@angular/core';
import { PrismService } from '../prism.service';
import { FormioRefreshValue } from '@formio/angular';

@Component({
  selector: 'app-cde-builder',
  templateUrl: './cde-builder.component.html',
  styleUrl: './cde-builder.component.scss'
})
export class CdeBuilderComponent implements AfterViewInit {
  @ViewChild('json', {static: true}) jsonElement?: ElementRef;
  public form: Object;
  public refreshForm: EventEmitter<FormioRefreshValue> = new EventEmitter();

  constructor(public prism: PrismService) {
    this.form = {components: []};
  }

  onChange(event) {
    this.jsonElement.nativeElement.innerHTML = '';
    this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));
    this.refreshForm.emit({
      property: 'form',
      value: event.form
    });
  }

  ngAfterViewInit() {
    this.prism.init();
  }
}
