import type { ApplicationRepository } from '../interfaces/application-repository.interface';
import type { Mapper } from '../interfaces/mapper.interface';
export declare class EntityApplicationService<TEntity, TDto> {
    private readonly repository;
    private readonly mapper;
    constructor(repository: ApplicationRepository<TEntity>, mapper: Mapper<TEntity, TDto>);
    findAll(): Promise<readonly TDto[]>;
    findById(id: string): Promise<TDto>;
}
