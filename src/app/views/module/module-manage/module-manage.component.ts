import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductsGitRepository } from '@saman-core/data';

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
    RouterModule,
  ],
})
export class ModuleManageComponent {
  private readonly _router = inject(Router);
  private readonly _productsGitRepository = inject(ProductsGitRepository);

  searchFormControl = new FormControl('');
  modules = [];
  filteredModules = [];

  constructor() {
    this.refreshModules();
    this.searchFormControl.valueChanges.subscribe((text: string) => {
      this.filterModules(text);
    });
  }

  navigateToHierarchy() {
    this._router.navigate(['/module/hierarchy']);
  }

  refreshModules() {
    this._productsGitRepository.getAllModules().subscribe((products) => {
      this.modules = products.map((p) => {
        return {
          title: p.name,
          desc: 'lorem ipsum dolor sit amet',
          version: '2.3.1',
          updated: '08/01/2025',
        };
      });
      this.filteredModules = [...this.modules];
    });
  }

  filterModules(text: string) {
    const search = (text || '').trim().toLowerCase();
    if (!search) {
      this.filteredModules = [...this.modules];
    } else {
      this.filteredModules = this.modules.filter((m) => m.title.toLowerCase().includes(search));
    }
  }
}
