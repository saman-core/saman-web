import { Component } from '@angular/core';

@Component({
  templateUrl: 'coinsurance.component.html',
  styleUrls: ['coinsurance.component.scss']
})
export class CoinsuranceComponent {
  productName = 'auto';
  templateName = 'auto1';
  isMultipleSelection = false;
  displayedColumns = ['cedula', 'nombre', 'ocupacion'];

  onEmitt(event: object[]): void {
    console.log(event);
  }
}
