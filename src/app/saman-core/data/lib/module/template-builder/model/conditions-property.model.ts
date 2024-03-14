import { ConditionTypeEnum } from "@saman-core/data";
import { NodeModel } from "./node.model";

export class ConditionsPropertyModel {
    public property!: string;
    public conditions!: Map<ConditionTypeEnum, NodeModel>;
}