export declare abstract class ValueObject<TProps extends object> {
    protected readonly props: Readonly<TProps>;
    protected constructor(props: TProps);
    equals(valueObject?: ValueObject<TProps>): boolean;
    toJSON(): Readonly<TProps>;
    protected abstract validate(props: TProps): void;
}
