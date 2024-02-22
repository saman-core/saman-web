export class DynamicFlatNode {
  constructor(
    public item: string,
    public level = 1,
    public parent = '',
    public expandable = false,
  ) {}
}
