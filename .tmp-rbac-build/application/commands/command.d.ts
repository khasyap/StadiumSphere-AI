export declare class Command<TPayload extends object = Record<string, never>> {
    readonly payload: Readonly<TPayload>;
    constructor(payload: TPayload);
}
