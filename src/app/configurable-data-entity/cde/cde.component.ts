import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormioComponent } from '@formio/angular';

import { PrismService } from '../prism.service';

@Component({
  selector: 'app-cde',
  templateUrl: './cde.component.html',
  styleUrl: './cde.component.scss'
})
export class CdeComponent implements AfterViewInit {
  @ViewChild('formio') formComponent!: FormioComponent;

  constructor(
    public prism: PrismService
  ) {
  }

  ngAfterViewInit() {
    this.prism.init();
  }
  no(): void {
    console.log(this.formComponent.formio.data);
    this.formComponent.formio.getComponent('select').setItems([
      {
        'label': 'data11',
        'value': '11'
      },
      {
        'label': 'data21',
        'value': '21'
      }
    ], true);
    this.formComponent.formio.getComponent('firstName').setValue('myvalue', {noUpdateEvent: true});
    // this.formComponent.formio.getComponent('firstName').visible = false;
    // this.formComponent.formio.getComponent('firstName').disabled = true;
  }
  no3(): void {
    this.formComponent.formio.getComponent('firstName').setCustomValidity('no funciona', false);
    console.log(this.formComponent.formio.getComponent('firstName').errors);
    this.formComponent.formio.getComponent('select').setItems([
      {
        'label': 'data12',
        'value': '12'
      },
      {
        'label': 'data22',
        'value': '22'
      }
    ], true);
  }
  no2(): void {
    this.formComponent.formio.getComponent('firstName').setCustomValidity('', false);
    console.log(this.formComponent.formio.getComponent('firstName').errors);
    this.formComponent.formio.getComponent('firstName').visible = true;
  }
}
