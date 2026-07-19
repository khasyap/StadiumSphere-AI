export type PersistenceRecord<TPersistence extends object> = TPersistence & {
  createdAt?: Date;
  id: string;
  updatedAt?: Date;
};

export interface PersistenceMapper<TDomain, TPersistence extends object> {
  toDomain(document: PersistenceRecord<TPersistence>): TDomain;
  toPersistence(entity: TDomain): Partial<TPersistence>;
}
