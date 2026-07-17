import { ApplicationValidationException } from '../exceptions/application-validation.exception';
import type { ApplicationValidator } from '../interfaces/application-validator.interface';

export class RequiredFieldsValidator<
  TValue extends object,
> implements ApplicationValidator<TValue> {
  public constructor(private readonly fields: readonly (keyof TValue)[]) {}

  public validate(value: TValue): void {
    for (const field of this.fields) {
      const candidate = value[field];

      if (
        candidate === undefined ||
        candidate === null ||
        (typeof candidate === 'string' && candidate.trim().length === 0)
      ) {
        throw new ApplicationValidationException(`Field "${String(field)}" is required.`);
      }
    }
  }
}
