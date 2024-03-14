import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormioComponent } from '@formio/angular';
import {
  ConditionModel,
  ConditionRepository,
  ConditionRequestModel,
  ConditionTypeEnum,
  DatasourceConsumer,
  TemplateRepository,
} from '@saman-core/data';
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
  private _consumer: DatasourceConsumer;
  form: object = { components: [] };

  constructor(
    public _prism: PrismService,
    private _templateRepository: TemplateRepository,
    private _conditionRepository: ConditionRepository,
  ) {}

  ngOnInit(): void {
    this._consumer = this._conditionRepository.getConsumer(this.productName, this.templateName);
    this._templateRepository
      .getJson(this.productName, this.templateName)
      .subscribe((json) => (this.form = json));
  }

  ngAfterViewInit() {
    this._prism.init();
  }

  callConditions(conditionRequest: ConditionRequestModel): void {
    this._conditionRepository
      .eval(this._consumer, conditionRequest)
      .subscribe((conditions: ConditionModel[]) => {
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
}
