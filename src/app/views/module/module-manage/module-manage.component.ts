import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-module-manage',
  templateUrl: './module-manage.component.html',
  styleUrls: ['./module-manage.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTabsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class ModuleManageComponent {
  searchFormControl = new FormControl('');
  modules = [
    {
      title: 'Policy Management',
      desc: 'Administration and issuance of insurance policies.',
      version: '2.3.1',
      updated: '08/01/2025',
    },
    {
      title: 'Claims',
      desc: 'Registration and tracking of claims and incidents.',
      version: '1.8.0',
      updated: '07/15/2025',
    },
    {
      title: 'Client Management',
      desc: 'Administration of insureds data and documents.',
      version: '3.0.0',
      updated: '06/20/2025',
    },
    {
      title: 'Collections',
      desc: 'Payments control, invoicing and receipts.',
      version: '2.1.5',
      updated: '07/05/2025',
    },
    {
      title: 'Agent Management',
      desc: 'Administration of agents and commissions.',
      version: '1.5.2',
      updated: '06/28/2025',
    },
    {
      title: 'Reports',
      desc: 'System reports and statistics generation.',
      version: '1.2.0',
      updated: '07/10/2025',
    },
    {
      title: 'Settings',
      desc: 'General system settings and parameterization.',
      version: '1.0.0',
      updated: '06/01/2025',
    },
    {
      title: 'Client Portal',
      desc: 'Web access for insureds and policy consultation.',
      version: '2.0.0',
      updated: '07/18/2025',
    },
    {
      title: 'Coverages',
      desc: 'Definition and management of insurance coverages.',
      version: '1.0.0',
      updated: '08/10/2025',
    },
    {
      title: 'Reinsurance',
      desc: 'Reinsurance contracts and ceded risk management.',
      version: '1.0.0',
      updated: '08/12/2025',
    },
    {
      title: 'Coinsurance',
      desc: 'Management of coinsurance agreements and shared risks.',
      version: '1.0.0',
      updated: '08/14/2025',
    },
    {
      title: 'Agreements',
      desc: 'Administration of agreements and strategic partnerships.',
      version: '1.0.0',
      updated: '08/16/2025',
    },
  ];
}
