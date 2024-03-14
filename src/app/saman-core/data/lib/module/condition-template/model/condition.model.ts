import { ConditionTypeEnum } from "@saman-core/data";

export class ConditionModel {
  public property?: string;
  public conditionType: ConditionTypeEnum;
  public value?: object;
}
