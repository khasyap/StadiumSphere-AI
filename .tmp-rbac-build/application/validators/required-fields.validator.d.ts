import type { ApplicationValidator } from '../interfaces/application-validator.interface';
export declare class RequiredFieldsValidator<TValue extends object> implements ApplicationValidator<TValue> {
    private readonly fields;
    constructor(fields: readonly (keyof TValue)[]);
    validate(value: TValue): void;
}
