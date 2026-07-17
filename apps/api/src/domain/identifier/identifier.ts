export abstract class Identifier<TValue extends string> {
  protected constructor(private readonly value: TValue) {}

  public equals(identifier?: Identifier<TValue>): boolean {
    return identifier !== undefined && this.value === identifier.value;
  }

  public toString(): string {
    return this.value;
  }
}
