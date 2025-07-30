import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, MatSortHeader } from '@angular/material/sort';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormioComponent, FormioModule } from '@formio/angular';
import { CdeRepository, PageableModel, TemplateRepository } from '@saman-core/data';
import { FormUtilService, MapperTableRow } from '@saman-core/common';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  from,
  map,
  merge,
  mergeAll,
  of,
  skip,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import _ from 'lodash';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
  MatExpansionPanelActionRow,
} from '@angular/material/expansion';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormField, MatLabel, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import {
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
  MatNoDataRow,
} from '@angular/material/table';
import { NgIf, NgFor } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatMenuTrigger, MatMenu, MatMenuContent, MatMenuItem } from '@angular/material/menu';
import { MatRipple } from '@angular/material/core';
import { ConfigurableDataEntityModule } from '../../configurable-data-entity/configurable-data-entity.module';

@Component({
  selector: 'app-cde-search',
  templateUrl: './cde-search.component.html',
  styleUrl: './cde-search.component.scss',
  imports: [
    ConfigurableDataEntityModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    FormioModule,
    MatExpansionPanelActionRow,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    MatIconButton,
    MatIcon,
    MatTable,
    MatSort,
    NgIf,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCheckbox,
    MatCellDef,
    MatCell,
    NgFor,
    MatSortHeader,
    MatMenuTrigger,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatRipple,
    MatNoDataRow,
    MatPaginator,
    MatMenu,
    MatMenuContent,
    MatMenuItem,
  ],
})
export class CdeSearchComponent implements AfterViewInit, OnInit, OnDestroy {
  private readonly _templateRepository = inject(TemplateRepository);
  private readonly _cdeRepository = inject(CdeRepository);
  private readonly _formUtilService = inject(FormUtilService);
  private readonly _cdref = inject(ChangeDetectorRef);

  private readonly _unsubscribe = new Subject<void>();
  private readonly _filterData = new BehaviorSubject<object>({});
  private _isRequestStarted = false;
  @Input() initializedRequests = true;
  @Input() searchProperty: string = 'id';
  @Input() moduleName: string = '';
  @Input() productName: string = '';
  @Input() templateName: string = '';
  @Input() isMultipleSelection: boolean = false;
  @Input() viewAction: boolean = true;
  @Input() editAction: boolean = true;
  @Input() deleteAction: boolean = true;
  @Input() avancedSearch: boolean = true;
  @Input() displayedColumns: string[] = [];
  @Input() refreshTable: Observable<boolean> = new Observable<boolean>();

  @Output() modelEmitter = new EventEmitter<object[]>();
  @Output() actionSelected = new EventEmitter<{ action: string; id: number }>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('formio') formComponent!: FormioComponent;

  basicFormControl = new FormControl('');
  selection = new SelectionModel<object>(false);
  resultsLength = 0;
  data: object[] = [];
  isLoadingResults = false;
  columnsToDisplay: string[] = [];
  columnsHeader: { [column: string]: string } = {};
  mappers: MapperTableRow[] = [];
  filterFormJson: object = {};
  hasMenu = false;
  step = 1;

  ngOnInit(): void {
    this.selection = new SelectionModel<object>(this.isMultipleSelection);
    this._templateRepository
      .getJson(this.moduleName, this.productName, this.templateName)
      .subscribe((formJson) => {
        const flatProperties = this._formUtilService.getFlatInputComponents(formJson);
        this.displayedColumns.forEach((colum) => {
          const componentLabel = flatProperties['components'].find(
            (element) => element['key'] === colum,
          );
          this.columnsHeader[colum] =
            typeof componentLabel === 'undefined' ? colum : componentLabel['label'];
        });
        this.filterFormJson = this._formUtilService.getFlatInputComponents(flatProperties, {
          dbIndex: true,
        });
        this.mappers = this._formUtilService.getListMappers(formJson, this.displayedColumns);
      });
    this.columnsToDisplay = this.displayedColumns;
    if (this.isMultipleSelection) {
      this.columnsToDisplay = ['_select', ...this.columnsToDisplay];
    }
    if (this.viewAction || this.editAction || this.deleteAction) {
      this.hasMenu = true;
      this.columnsToDisplay = [...this.columnsToDisplay, '_menu'];
    }
  }

  ngAfterViewInit(): void {
    if (this.initializedRequests) {
      this._startRequests();
      this._isRequestStarted = true;
    }
  }

  _startRequests(): void {
    this._sortChange().subscribe(() => (this.paginator.pageIndex = 0));
    this._fetchData().subscribe((data) => (this.data = data));
  }

  _sortChange(): Observable<Sort> {
    return this.sort.sortChange.pipe(takeUntil(this._unsubscribe));
  }

  _fetchData(): Observable<object[]> {
    this.isLoadingResults = true;
    this._cdref.detectChanges();
    return merge(
      this.sort.sortChange,
      this.paginator.page,
      this._filterData.asObservable(),
      this.refreshTable,
    ).pipe(
      takeUntil(this._unsubscribe),
      switchMap(() => {
        this.isLoadingResults = true;
        const pageableModel = new PageableModel();
        pageableModel.page = this.paginator.pageIndex;
        pageableModel.size = this.paginator.pageSize;
        pageableModel.sort = this.sort.active;
        pageableModel.order = this.sort.direction;
        return this._cdeRepository.getPage(
          this.moduleName,
          this.productName,
          this.templateName,
          pageableModel,
          this._filterData.getValue(),
        );
      }),
      map((page) => {
        this.selection.clear();
        this.resultsLength = page.count;
        return page.data;
      }),
      switchMap((rows) => {
        const total = this.mappers.length;
        if (total === 0) return of(rows);
        return from(this.mappers.map((m) => m(rows))).pipe(mergeAll(), skip(total - 1));
      }),
      tap(() => (this.isLoadingResults = false)),
      catchError((err) => {
        console.error(err);
        this.isLoadingResults = false;
        this.selection.clear();
        this.resultsLength = 0;
        return of([]);
      }),
    );
  }

  onChangeModel(row: object): void {
    this.selection.toggle(row);
    this.modelEmitter.emit(this.selection.selected);
  }

  onActionEvent(action: string, id: number): void {
    this.actionSelected.emit({ action: action, id: id });
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.data.forEach((row) => this.selection.select(row));
    }
    this.modelEmitter.emit(this.selection.selected);
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  applyFilter(): void {
    if (!this._isRequestStarted) this._startRequests();
    this.paginator.pageIndex = 0;
    const paramns = {};
    const filterValue = this.basicFormControl.value;
    if (filterValue.trim() !== '') paramns[this.searchProperty] = filterValue;
    this._filterData.next(paramns);
  }

  applyAvancedFilter(): void {
    if (!this._isRequestStarted) this._startRequests();
    this.paginator.pageIndex = 0;
    const paramns = this.formComponent.formio.data;
    Object.keys(paramns).forEach((k) => {
      if (this._isEmpty(paramns[k])) {
        delete paramns[k];
      }
    });
    this._filterData.next(paramns);
  }

  cleanFilter(): void {
    this.formComponent.formio.emit('resetForm');
  }

  setStep(index: number) {
    this.step = index;
  }

  _isEmpty(value): boolean {
    if (_.isNil(value)) {
      return true;
    }
    if (Array.isArray(value) && value.length === 0) {
      return true;
    }
    if (typeof value === 'string' && value.trim() === '') {
      return true;
    }
    return false;
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
    this._filterData.complete();
  }
}
