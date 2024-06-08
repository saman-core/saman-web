import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormioComponent } from '@formio/angular';
import {
  CdeRepository,
  ConditionModel,
  ConditionRepository,
  ConditionRequestModel,
  ConditionTypeEnum,
  DatasourceConsumer,
  TemplateRepository,
} from '@saman-core/data';
import { Subject, bufferWhen, combineLatestWith, filter, take, tap } from 'rxjs';
import uniq from 'lodash-es/uniq';
import { InitCdeService } from '../init.service';
import { FormUtilService } from '@saman-core/common';

@Component({
  selector: 'app-cde',
  templateUrl: './cde.component.html',
  styleUrl: './cde.component.scss',
})
export class CdeComponent implements AfterViewInit, OnInit {
  @ViewChild('formio') formComponent!: FormioComponent;
  @Input() productName: string;
  @Input() templateName: string;
  @Input() id: number | undefined;
  @Input() readOnly: boolean = false;
  @Output() data = new EventEmitter<object>();
  @Output() formErrors = new EventEmitter<string[]>();
  private _consumer: DatasourceConsumer;
  private _lastConditionDataEvaluated = {};
  formJson: object = { components: [] };
  formData = { data: {} };

  constructor(
    private _initCdeService: InitCdeService,
    private _templateRepository: TemplateRepository,
    private _conditionRepository: ConditionRepository,
    private _cdeRepository: CdeRepository,
    private _formUtilService: FormUtilService,
  ) {
    _initCdeService.initConf();
  }

  ngOnInit(): void {
    this._consumer = this._conditionRepository.getConsumer(this.productName, this.templateName);

    const templateObserver = this._templateRepository.getJson(this.productName, this.templateName);
    if (typeof this.id === 'undefined') {
      templateObserver.subscribe((templateJson) => {
        const data = this._formUtilService.getDefaultValues(templateJson);
        this._init(templateJson, data);
      });
    } else {
      const dataObserver = this._cdeRepository.getById(
        this.productName,
        this.templateName,
        this.id,
      );
      templateObserver
        .pipe(combineLatestWith(dataObserver))
        .subscribe(([templateJson, data]) => this._init(templateJson, data));
    }
  }

  ngAfterViewInit(): void {
    this._initCdeService.initPrism();
  }

  private _init(templateJson: object, data: object): void {
    const conditionRequest: ConditionRequestModel = {
      variables: data,
      modifiedProperties: [],
      isInitial: true,
    };
    this._conditionRepository.eval(this._consumer, conditionRequest).subscribe((conditions) => {
      this.formJson = templateJson;
      this.formData.data = data;
      this.formComponent.ready
        .asObservable()
        .pipe(take(1))
        .subscribe(() => {
          this._applyConditions(conditions);
          this._registryNewData();
          this._registryAndProcessEvents();
        });
    });
  }

  private _registryAndProcessEvents(): void {
    const grouping = new Subject<boolean>();
    let groupingInterval: NodeJS.Timeout;

    this.formComponent.change
      .asObservable()
      .pipe(
        filter((ch) => this._filterChangesByEventOrigin(ch)),
        tap(() => {
          clearTimeout(groupingInterval);
          groupingInterval = setTimeout(() => grouping.next(true), 350);
        }),
        bufferWhen(() => grouping),
      )
      .subscribe((components: object[]) => {
        const properties: string[] = uniq(components.map((c) => c['changed'].component.key));
        const data = this.formComponent.formio.data;

        this._callConditions(data, properties, true);
      });
  }

  private _filterChangesByEventOrigin(ch: object): boolean {
    if (typeof ch['changed'] === 'undefined') return false;
    if (this._lastConditionDataEvaluated[ch['changed'].component.key] == ch['changed'].value)
      return false;

    const isFromBlur = ch['flags'].fromBlur;
    const isBlur = ch['changed'].component.validateOn === 'blur' && isFromBlur;
    const isChange = ch['changed'].component.validateOn === 'change' && !isFromBlur;

    return isBlur || isChange;
  }

  private _callConditions(data: object, properties: string[], isInitial: boolean): void {
    const conditionRequest: ConditionRequestModel = {
      variables: data,
      modifiedProperties: properties,
      isInitial: isInitial,
    };

    this._conditionRepository
      .eval(this._consumer, conditionRequest)
      .subscribe((conditions: ConditionModel[]) => {
        this._applyConditions(conditions);
        this._registryNewData();
      });
  }

  private _applyConditions(conditions: ConditionModel[]): void {
    conditions.forEach((condition) => {
      try {
        switch (condition.conditionType) {
          case ConditionTypeEnum.VALUE:
            this._setValueProperty(condition);
            break;
          case ConditionTypeEnum.VISIBLE:
            this._setVisibleProperty(condition);
            break;
          case ConditionTypeEnum.DISABLE:
            this._setDisableProperty(condition);
            break;
          case ConditionTypeEnum.ALERT:
            this._throwAlertProperty(condition);
            break;
          case ConditionTypeEnum.VALIDATE:
            this._setValidateProperty(condition);
            break;
          case ConditionTypeEnum.OPTIONS:
            this._setOptionsProperty(condition);
            break;
        }
      } catch (e) {
        console.warn(`condition cannot be applied: ${JSON.stringify(condition)}`);
      }
    });
  }

  private _registryNewData(): void {
    const newData = this.formComponent.formio.data;
    this._lastConditionDataEvaluated = { ...newData };
    this.formComponent.formio.checkValidity(newData, true);
    this.formErrors.emit(this.formComponent.formio.errors);
    this.data.emit(newData);
  }

  private _setValueProperty(condition: ConditionModel): void {
    this._getProperty(condition.property).setValue(condition.value, { noUpdateEvent: true });
  }

  private _setVisibleProperty(condition: ConditionModel): void {
    this._getProperty(condition.property).component.hidden = !condition.value;
    this._getProperty(condition.property).visible = !!condition.value;
  }

  private _setDisableProperty(condition: ConditionModel): void {
    const c = this._getProperty(condition.property);
    c.component.disabled = !!condition.value;
    c.disabled = !!condition.value;
    c.redraw();
  }

  private _throwAlertProperty(condition: ConditionModel): void {
    console.log(condition);
  }

  private _setValidateProperty(condition: ConditionModel): void {
    this._getProperty(condition.property).setCustomValidity(condition.value, false);
  }

  private _setOptionsProperty(condition: ConditionModel): void {
    const c = this._getProperty(condition.property);
    const values = [
      {
        label: 'data11',
        value: '11',
      },
      {
        label: 'data21',
        value: '21',
      },
    ];
    c.component.data.values = values;
    c.setItems(values);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _getProperty(propertyName: string): any {
    return this.formComponent.formio.getComponent(propertyName);
  }
}
