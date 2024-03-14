import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormioComponent } from '@formio/angular';
import {
  ConditionModel,
  ConditionRepository,
  ConditionRequestModel,
  ConditionTypeEnum,
  DatasourceConsumer,
  TemplateRepository,
} from '@saman-core/data';
import { filter, first } from 'rxjs';
import { PrismService } from '../prism.service';

@Component({
  selector: 'app-cde',
  templateUrl: './cde.component.html',
  styleUrl: './cde.component.scss',
})
export class CdeComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('formio') formComponent!: FormioComponent;
  @Input() productName: string;
  @Input() templateName: string;
  private _consumer: DatasourceConsumer;
  form: object = { components: [] };
  data: object = {};

  constructor(
    public _prism: PrismService,
    private _templateRepository: TemplateRepository,
    private _conditionRepository: ConditionRepository,
  ) {
    this._consumer = this._conditionRepository.getConsumer(this.productName, this.templateName);
  }

  ngOnInit(): void {
    this._templateRepository
      .getJson(this.productName, this.templateName)
      .subscribe((json) => this._init(json));
  }

  ngAfterViewInit(): void {
    this._prism.init();
    this.formComponent.change
      .asObservable()
      .pipe(filter((f) => typeof f['changed'] !== 'undefined'))
      .subscribe((ch) => (this.data = ch['data']));
  }

  private _init(json: object): void {
    this.form = json;
    this.formComponent.ready
      .asObservable()
      .pipe(first())
      .subscribe((webForm) => {
        webForm.formio.on(
          'blur',
          (c) => {
            this._callConditions(c.component.key, false);
          },
          true,
        );
      });
  }

  private _callConditions(property: string, isInitial: boolean): void {
    const conditionRequest: ConditionRequestModel = {
      variables: new Map(Object.entries(this.data)),
      modifiedProperties: [property],
      isInitial: isInitial,
    };

    this._conditionRepository
      .eval(this._consumer, conditionRequest)
      .subscribe((conditions: ConditionModel[]) => {
        this._setConditions(conditions);
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

  private _getProperty(propertyName: string): any {
    this.formComponent.formio.getComponent(propertyName);
  }

  no(): void {
    /*
    this.formComponent.formio.getComponent('select').setItems(
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
    */
  }

  ngOnDestroy(): void {
    this.formComponent.formio.off('blur');
  }
}
