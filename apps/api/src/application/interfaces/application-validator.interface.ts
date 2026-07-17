export interface ApplicationValidator<TValue> {
  validate(value: TValue): void;
}
