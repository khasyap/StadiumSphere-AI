export class Query<TCriteria extends object = Record<string, never>> {
  public readonly criteria: Readonly<TCriteria>;

  public constructor(criteria: TCriteria) {
    this.criteria = Object.freeze({ ...criteria });
  }
}
