export class SuccessResponse<TData> {
  public readonly success = true;

  public constructor(
    public readonly message: string,
    public readonly data: TData,
  ) {}
}
