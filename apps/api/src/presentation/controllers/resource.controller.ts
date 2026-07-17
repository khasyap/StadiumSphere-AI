import type { RestApplicationService } from '../../application';
import { SuccessResponse } from '../responses/success.response';

export abstract class ResourceController<TCreate, TUpdate, TResponse> {
  protected constructor(
    protected readonly service: RestApplicationService<TCreate, TUpdate, TResponse>,
    private readonly resourceName: string,
  ) {}

  protected async createResource(command: TCreate): Promise<SuccessResponse<TResponse>> {
    return new SuccessResponse(`${this.resourceName} created.`, await this.service.create(command));
  }

  protected async deleteResource(id: string): Promise<SuccessResponse<undefined>> {
    await this.service.delete(id);
    return new SuccessResponse(`${this.resourceName} deleted.`, undefined);
  }

  protected async getResource(id: string): Promise<SuccessResponse<TResponse>> {
    return new SuccessResponse(`${this.resourceName} retrieved.`, await this.service.findById(id));
  }

  protected async listResources(): Promise<SuccessResponse<readonly TResponse[]>> {
    return new SuccessResponse(
      `${this.resourceName} list retrieved.`,
      await this.service.findAll(),
    );
  }

  protected async updateResource(
    id: string,
    command: TUpdate,
  ): Promise<SuccessResponse<TResponse>> {
    return new SuccessResponse(
      `${this.resourceName} updated.`,
      await this.service.update(id, command),
    );
  }
}
