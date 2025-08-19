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
      title: 'Customer Management',
      desc: 'Customer data management module',
      version: '1.0.0',
      updated: '10/5/2025',
    },
    {
      title: 'modulo prueba v1',
      desc: 'comentario modulo de prueba v1',
      version: '1.0.0',
      updated: '10/5/2025',
    },
    {
      title: 'Inventory',
      desc: 'Inventory control module',
      version: '2.1.0',
      updated: '11/5/2025',
    },
    {
      title: 'Sales',
      desc: 'Sales tracking module',
      version: '3.0.0',
      updated: '12/5/2025',
    },
    {
      title: 'HR',
      desc: 'Human resources module',
      version: '1.2.0',
      updated: '13/5/2025',
    },
    {
      title: 'Finance',
      desc: 'Finance management module',
      version: '2.0.0',
      updated: '14/5/2025',
    },
    {
      title: 'Support',
      desc: 'Support ticket module',
      version: '1.0.1',
      updated: '15/5/2025',
    },
    {
      title: 'Analytics',
      desc: 'Analytics dashboard module',
      version: '1.5.0',
      updated: '16/5/2025',
    },
  ];
}
