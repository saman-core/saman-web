import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CdeRepository } from '@saman-core/data';

@Component({
  selector: 'app-cde-crud',
  templateUrl: './cde-crud.component.html',
  styleUrl: './cde-crud.component.scss',
})
export class CdeCrudComponent implements OnInit {
  initializedRequests = true;
  searchProperty: string = 'id';
  isMultipleSelection: boolean = false;
  viewAction: boolean = true;
  editAction: boolean = true;
  deleteAction: boolean = true;
  avancedSearch: boolean = true;
  displayedColumns: string[] = [];
  productName = '';
  templateName = '';
  routeBase = '';

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _cdeRepository: CdeRepository,
  ) {}

  ngOnInit() {
    this._activatedRoute.data.subscribe((data) => {
      this.productName = data.productName;
      this.templateName = data.templateName;
      this.routeBase = data.routeBase;
      this.initializedRequests = data.initializedRequests;
      this.searchProperty = data.searchProperty;
      this.viewAction = data.viewAction;
      this.editAction = data.editAction;
      this.deleteAction = data.deleteAction;
      this.avancedSearch = data.avancedSearch;
      this.displayedColumns = data.displayedColumns;
    });
  }

  onAction(event): void {
    const id = event.id;
    if (event.action === 'edit') {
      this._router.navigate([this.routeBase, 'edit', id]);
    } else if (event.action === 'view') {
      this._router.navigate([this.routeBase, 'view', id]);
    } else if (event.action === 'delete') {
      this._cdeRepository
        .delete(this.productName, this.templateName, id)
        .subscribe((response) => console.log(response));
    }
  }

  create(): void {
    this._router.navigate([this.routeBase, 'create']);
  }
}
