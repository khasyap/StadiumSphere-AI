export abstract class ValueObject<TProps extends object> {
  protected readonly props: Readonly<TProps>;

  protected constructor(props: TProps) {
    this.validate(props);
    this.props = Object.freeze({ ...props });
  }

  public equals(valueObject?: ValueObject<TProps>): boolean {
    return (
      valueObject !== undefined && JSON.stringify(this.props) === JSON.stringify(valueObject.props)
    );
  }

  public toJSON(): Readonly<TProps> {
    return this.props;
  }

  protected abstract validate(props: TProps): void;
}
