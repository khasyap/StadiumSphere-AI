export type PersistenceRecord<TPersistence extends object> = TPersistence & {
    id: string;
};
export interface PersistenceMapper<TDomain, TPersistence extends object> {
    toDomain(document: PersistenceRecord<TPersistence>): TDomain;
    toPersistence(entity: TDomain): Partial<TPersistence>;
}
