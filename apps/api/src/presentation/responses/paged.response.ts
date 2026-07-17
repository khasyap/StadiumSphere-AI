import { SuccessResponse } from './success.response';

export class PagedResponse<TData> extends SuccessResponse<readonly TData[]> {
  public constructor(
    message: string,
    data: readonly TData[],
    public readonly page: number,
    public readonly limit: number,
    public readonly total: number,
  ) {
    super(message, data);
  }
}
