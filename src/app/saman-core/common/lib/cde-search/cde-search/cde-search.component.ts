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
import { CdeRepository, PageableModel, TemplateRepository } from '@saman-core/data';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  map,
  merge,
  of,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs';
import { FormUtilService } from '../../form-util/form-util.service';

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
  @Input() editAction: boolean = true;
  @Input() deleteAction: boolean = true;
  @Input() updateAction: boolean = true;
  @Input() insertAction: boolean = true;
  @Input() avancedSearch: boolean = true;
  @Input() displayedColumns: string[] = [];

  @Output() modelEmitter = new EventEmitter<object[]>();
  @Output() actionSelected = new EventEmitter<'view' | 'edit' | 'delete' | 'update' | 'insert'>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selection = new SelectionModel<object>(false);
  resultsLength = 0;
  data: object[] = [];
  columnsToDisplay: string[] = [];
  columnsHeader: { [column: string]: string } = {};
  filterFormJson: object = {};

  constructor(
    private _templateRepository: TemplateRepository,
    private _cdeRepository: CdeRepository,
    private _formUtilService: FormUtilService,
  ) {}

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
    });
    this.columnsToDisplay = this.displayedColumns;
    if (this.isMultipleSelection) {
      this.columnsToDisplay = ['_select', ...this.columnsToDisplay];
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
    return merge(this.sort.sortChange, this.paginator.page, this._filterData.asObservable()).pipe(
      takeUntil(this._unsubscribe),
      startWith({}),
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
      map((data) => {
        this.selection.clear();
        this.resultsLength = data.count;
        return data.data;
      }),
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

  applyFilter(event: Event): void {
    if (!this._isRequestStarted) this._startRequests();
    const filterValue = (event.target as HTMLInputElement).value.trim();
    this.paginator.pageIndex = 0;
    const paramns = {};
    if (filterValue !== '') paramns[this.searchProperty] = filterValue;
    this._filterData.next(paramns);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
    this._filterData.complete();
  }
}