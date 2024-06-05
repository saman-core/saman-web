import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  ) {}

  ngOnInit() {
    this._activatedRoute.data.subscribe((data) => {
      this.productName = data.productName;
      this.templateName = data.templateName;
      this.routeBase = data.routeBase;
      this.initializedRequests = data.initializedRequests;
      this.searchProperty = data.searchProperty;
      this.isMultipleSelection = data.isMultipleSelection;
      this.viewAction = data.viewAction;
      this.editAction = data.editAction;
      this.deleteAction = data.deleteAction;
      this.avancedSearch = data.avancedSearch;
      this.displayedColumns = data.displayedColumns;
    });
  }

  onEmitt(event: object[]): void {
    console.log(event);
  }

  onAction(event): void {
    console.log(event);
    if (event.action === 'edit') {
      const pk = event.id;
      this._router.navigate([this.routeBase, pk]);
    }
  }
}
