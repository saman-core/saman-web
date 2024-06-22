import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { FormioComponent } from '@formio/angular';
import { CdeRepository, PageableModel, TemplateRepository } from '@saman-core/data';
import { FormUtilService, MapperTableRow } from '@saman-core/common';
import { InitCdeService } from '@saman-core/common/lib/configurable-data-entity/init.service';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  from,
  last,
  map,
  merge,
  mergeAll,
  of,
  switchMap,
  takeUntil,
} from 'rxjs';
import _ from 'lodash';

@Component({
  selector: 'app-cde-search',
  templateUrl: './cde-search.component.html',
  styleUrl: './cde-search.component.scss',
})
export class CdeSearchComponent implements AfterViewInit, OnInit, OnDestroy {
  private _unsubscribe = new Subject<void>();
  private _filterData = new BehaviorSubject<object>({});
  private _isRequestStarted = false;
  @Input() initializedRequests = true;
  @Input() searchProperty: string = 'id';
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
  columnsToDisplay: string[] = [];
  columnsHeader: { [column: string]: string } = {};
  mappers: MapperTableRow[] = [];
  filterFormJson: object = {};
  hasMenu = false;
  step = 1;

  constructor(
    private _initCdeService: InitCdeService,
    private _templateRepository: TemplateRepository,
    private _cdeRepository: CdeRepository,
    private _formUtilService: FormUtilService,
  ) {
    this._initCdeService.initConf();
  }

  ngOnInit(): void {
    this.selection = new SelectionModel<object>(this.isMultipleSelection);
    this._templateRepository.getJson(this.productName, this.templateName).subscribe((formJson) => {
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
    return merge(
      this.sort.sortChange,
      this.paginator.page,
      this._filterData.asObservable(),
      this.refreshTable,
    ).pipe(
      takeUntil(this._unsubscribe),
      switchMap(() => {
        const pageableModel = new PageableModel();
        pageableModel.page = this.paginator.pageIndex;
        pageableModel.size = this.paginator.pageSize;
        pageableModel.sort = this.sort.active;
        pageableModel.order = this.sort.direction;
        return this._cdeRepository.getPage(
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
      switchMap((rows) => from(this.mappers.map((m) => m(rows))).pipe(mergeAll(), last())),
      catchError((err) => {
        console.error(err);
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
    this.isAllSelected()
      ? this.selection.clear()
      : this.data.forEach((row) => this.selection.select(row));
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
