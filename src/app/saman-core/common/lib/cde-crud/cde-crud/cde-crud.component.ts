import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CdeRepository } from '@saman-core/data';
import { AlertSubscriptor } from '@saman-core/core';
import { Subject } from 'rxjs';
import {
  DeleteConfirmDialogComponent,
  DeleteConfirmDialogResponse,
} from '../delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-cde-crud',
  templateUrl: './cde-crud.component.html',
  styleUrl: './cde-crud.component.scss',
})
export class CdeCrudComponent implements OnInit, OnDestroy {
  initializedRequests = true;
  searchProperty: string = 'id';
  isMultipleSelection: boolean = false;
  viewAction: boolean = true;
  editAction: boolean = true;
  deleteAction: boolean = true;
  avancedSearch: boolean = true;
  displayedColumns: string[] = [];
  moduleName: string = '';
  productName = '';
  templateName = '';
  routeBase = '';
  refreshTable = new Subject<boolean>();

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _alert: AlertSubscriptor,
    private readonly _cdeRepository: CdeRepository,
  ) {}

  ngOnInit() {
    this._activatedRoute.data.subscribe((data) => {
      this.moduleName = data.moduleName;
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
      const dialogRef = this._dialog.open(DeleteConfirmDialogComponent, {
        data: { name: 'registry' },
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((response: DeleteConfirmDialogResponse) => {
        if (response.accepted) {
          this._cdeRepository
            .delete(this.moduleName, this.productName, this.templateName, id)
            .subscribe((response) => {
              if (response) {
                this._alert.success(`Data deleted successfully, ID: ${id}`);
                this.refreshTable.next(true);
              }
            });
        }
      });
    }
  }

  create(): void {
    this._router.navigate([this.routeBase, 'create']);
  }

  ngOnDestroy(): void {
    this.refreshTable.complete();
  }
}
