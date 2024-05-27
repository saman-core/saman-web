import { Component } from '@angular/core';

@Component({
  templateUrl: 'coinsurance.component.html',
  styleUrls: ['coinsurance.component.scss']
})
export class CoinsuranceComponent {
  productName = 'auto';
  templateName = 'auto1';
  isMultipleSelection = true;
  displayedColumns = ['cedula', 'nombre', 'ocupacion'];
}
