"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coordinates = void 0;
const invalid_coordinates_exception_1 = require("../exceptions/invalid-coordinates.exception");
const value_object_1 = require("./value-object");
class Coordinates extends value_object_1.ValueObject {
    constructor(latitude, longitude) {
        super({ latitude, longitude });
    }
    get latitude() {
        return this.props.latitude;
    }
    get longitude() {
        return this.props.longitude;
    }
    validate(props) {
        if (!Number.isFinite(props.latitude) ||
            !Number.isFinite(props.longitude) ||
            props.latitude < -90 ||
            props.latitude > 90 ||
            props.longitude < -180 ||
            props.longitude > 180) {
            throw new invalid_coordinates_exception_1.InvalidCoordinatesException();
        }
    }
}
exports.Coordinates = Coordinates;
//# sourceMappingURL=coordinates.js.map