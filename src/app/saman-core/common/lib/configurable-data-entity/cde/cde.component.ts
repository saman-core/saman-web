import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormioBaseComponent, FormioComponent } from '@formio/angular';
import {
  ConditionModel,
  ConditionRepository,
  ConditionRequestModel,
  ConditionTypeEnum,
  DatasourceConsumer,
  TemplateRepository,
} from '@saman-core/data';
import { Subject, bufferWhen, filter, first, tap } from 'rxjs';
import uniq from 'lodash-es/uniq';
import { PrismService } from '../prism.service';

@Component({
  selector: 'app-cde',
  templateUrl: './cde.component.html',
  styleUrl: './cde.component.scss',
})
export class CdeComponent implements AfterViewInit, OnInit {
  @ViewChild('formio') formComponent!: FormioComponent;
  @Input() productName: string;
  @Input() templateName: string;
  @Input() pk: number | undefined;
  @Input() readOnly: boolean = false;
  @Output() data = new EventEmitter<object>();
  @Output() formErrors = new EventEmitter<string[]>();
  private _consumer: DatasourceConsumer;
  private _lastConditionDataEvaluated = {};
  form: object = { components: [] };

  constructor(
    private _prism: PrismService,
    private _templateRepository: TemplateRepository,
    private _conditionRepository: ConditionRepository,
  ) {}

  ngOnInit(): void {
    this._templateRepository
      .getJson(this.productName, this.templateName)
      .subscribe((json) => this._init(json));
    this._consumer = this._conditionRepository.getConsumer(this.productName, this.templateName);
  }

  ngAfterViewInit(): void {
    this._prism.init();
  }

  private _init(json: object): void {
    this.form = json;
    this.formComponent.ready
      .asObservable()
      .pipe(first())
      .subscribe((webForm) => {
        this._lastConditionDataEvaluated = { ...webForm.formio.data };
        this._registryAndProcessEvents(webForm);
      });
  }

  private _registryAndProcessEvents(webForm: FormioBaseComponent): void {
    const grouping = new Subject<boolean>();
    let groupingInterval: NodeJS.Timeout;

    webForm.change
      .asObservable()
      .pipe(
        filter((ch) => this._filterChangesByEventOrigin(ch)),
        tap(() => {
          clearTimeout(groupingInterval);
          groupingInterval = setTimeout(() => grouping.next(true), 250);
        }),
        bufferWhen(() => grouping),
      )
      .subscribe((components: object[]) => {
        const properties: string[] = uniq(components.map((c) => c['key']));
        const data = webForm.formio.data;

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
        this._setConditions(conditions);
        this._lastConditionDataEvaluated = { ...data };
        this.data.emit(data);
      });
  }

  private _setConditions(conditions: ConditionModel[]): void {
    conditions.forEach((condition) => {
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
      }
    });
  }

  private _setValueProperty(condition: ConditionModel): void {
    this._getProperty(condition.property).setValue(condition.value, { noUpdateEvent: true });
  }

  private _setVisibleProperty(condition: ConditionModel): void {
    this._getProperty(condition.property).visible = condition.value;
  }

  private _setDisableProperty(condition: ConditionModel): void {
    const c = this._getProperty(condition.property);
    c.component.disabled = condition.value;
    c.disabled = condition.value;
    c.redraw();
  }

  private _throwAlertProperty(condition: ConditionModel): void {
    console.log(condition);
  }

  private _setValidateProperty(condition: ConditionModel): void {
    this._getProperty(condition.property).setCustomValidity(condition.value, false);
  }

  private _setOptionsProperty(condition: ConditionModel): void {
    this._getProperty(condition.property).setItems(
      [
        {
          label: 'data11',
          value: '11',
        },
        {
          label: 'data21',
          value: '21',
        },
      ],
      true,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _getProperty(propertyName: string): any {
    return this.formComponent.formio.getComponent(propertyName);
  }
}
