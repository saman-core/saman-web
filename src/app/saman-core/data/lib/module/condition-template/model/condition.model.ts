/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConditionTypeEnum } from "@saman-core/data";

export class ConditionModel {
  public property?: string;
  public conditionType: ConditionTypeEnum;
  public value?: any;
}
