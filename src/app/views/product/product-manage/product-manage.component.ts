import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductsGitRepository } from '@saman-core/data';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatTabsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class ProductManageComponent {
  modules: string[] = [];
  moduleNameSelected = '';
  items = [];

  private readonly _router = inject(Router);

  searchFormControl = new FormControl('');

  private readonly _productsGitRepository = inject(ProductsGitRepository);

  constructor() {
    this.refreshModules();
  }

  navigateToWorkflow() {
    this._router.navigate(['/product/workflow']);
  }

  refreshModules() {
    this._productsGitRepository.getAllModules().subscribe((products) => {
      this.modules = products.map((p) => p.name);
    });
  }

  openEditor(data) {
    this._productsGitRepository.getAllProductsByModule(data).subscribe((templates) => {
      this.items = templates.map((t) => {
        return {
          title: t.name,
          desc: 'Administration and issuance of insurance policies.',
          version: '2.3.1',
          updated: '08/01/2025',
        };
      });
    });
  }
}
