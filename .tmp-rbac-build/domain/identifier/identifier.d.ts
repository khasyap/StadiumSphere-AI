export declare abstract class Identifier<TValue extends string> {
    private readonly value;
    protected constructor(value: TValue);
    equals(identifier?: Identifier<TValue>): boolean;
    toString(): string;
}
