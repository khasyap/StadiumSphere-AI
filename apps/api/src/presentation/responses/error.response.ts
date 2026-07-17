export class ErrorResponse {
  public constructor(
    public readonly correlationId: string,
    public readonly message: string,
    public readonly statusCode: number,
    public readonly timestamp: string,
  ) {}
}
