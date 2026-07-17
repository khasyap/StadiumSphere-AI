export interface Mapper<TDomain, TDto> {
  toDomain(dto: TDto): TDomain;
  toDto(domain: TDomain): TDto;
}
