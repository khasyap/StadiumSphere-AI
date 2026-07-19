"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoLocation = void 0;
const value_object_1 = require("./value-object");
class GeoLocation extends value_object_1.ValueObject {
    constructor(coordinates, address) {
        super(address === undefined ? { coordinates } : { coordinates, address });
    }
    get coordinates() {
        return this.props.coordinates;
    }
    get address() {
        return this.props.address;
    }
    validate(_props) { }
}
exports.GeoLocation = GeoLocation;
//# sourceMappingURL=geo-location.js.map