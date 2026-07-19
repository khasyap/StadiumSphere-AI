export declare class Query<TCriteria extends object = Record<string, never>> {
    readonly criteria: Readonly<TCriteria>;
    constructor(criteria: TCriteria);
}
