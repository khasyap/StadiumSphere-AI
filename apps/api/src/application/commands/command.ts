export class Command<TPayload extends object = Record<string, never>> {
  public readonly payload: Readonly<TPayload>;

  public constructor(payload: TPayload) {
    this.payload = Object.freeze({ ...payload });
  }
}
