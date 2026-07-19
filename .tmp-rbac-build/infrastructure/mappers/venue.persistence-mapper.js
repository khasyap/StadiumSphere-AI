"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenuePersistenceMapper = void 0;
const domain_1 = require("../../domain");
class VenuePersistenceMapper {
    toDomain(document) {
        const { address, latitude, longitude } = document.location;
        const coordinates = new domain_1.Coordinates(latitude, longitude);
        const location = address === undefined
            ? new domain_1.GeoLocation(coordinates)
            : new domain_1.GeoLocation(coordinates, new domain_1.Address(address));
        return new domain_1.Venue({ location, name: document.name }, new domain_1.UniqueEntityId(document.id));
    }
    toPersistence(entity) {
        const venue = entity.toJSON();
        const address = venue.location.address?.toJSON();
        return {
            location: address === undefined
                ? {
                    latitude: venue.location.coordinates.latitude,
                    longitude: venue.location.coordinates.longitude,
                }
                : {
                    address,
                    latitude: venue.location.coordinates.latitude,
                    longitude: venue.location.coordinates.longitude,
                },
            name: venue.name,
        };
    }
}
exports.VenuePersistenceMapper = VenuePersistenceMapper;
//# sourceMappingURL=venue.persistence-mapper.js.map