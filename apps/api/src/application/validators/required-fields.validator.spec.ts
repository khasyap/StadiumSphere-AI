import { ApplicationValidationException } from '../exceptions/application-validation.exception';
import { RequiredFieldsValidator } from './required-fields.validator';

describe('RequiredFieldsValidator', () => {
  const validator = new RequiredFieldsValidator<{ name: string; optional?: string }>(['name']);

  it('accepts required populated values', () => {
    expect(() => validator.validate({ name: 'Stadium' })).not.toThrow();
  });

  it('rejects missing or blank required values', () => {
    expect(() => validator.validate({ name: ' ' })).toThrow(ApplicationValidationException);
  });
});
