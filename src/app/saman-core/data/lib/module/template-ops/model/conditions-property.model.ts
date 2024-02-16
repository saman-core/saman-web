import { ConditionTypeEnum } from "./condition-type.enum";
import { NodeModel } from "./node.model";

export class ConditionsPropertyModel {
    public property!: string;
    public conditions!: Map<ConditionTypeEnum, NodeModel>;
}