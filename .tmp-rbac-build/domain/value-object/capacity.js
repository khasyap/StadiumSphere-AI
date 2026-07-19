"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Capacity = void 0;
const invalid_capacity_exception_1 = require("../exceptions/invalid-capacity.exception");
const value_object_1 = require("./value-object");
class Capacity extends value_object_1.ValueObject {
    constructor(value) {
        super({ value });
    }
    get value() {
        return this.props.value;
    }
    validate(props) {
        if (!Number.isInteger(props.value) || props.value <= 0) {
            throw new invalid_capacity_exception_1.InvalidCapacityException();
        }
    }
}
exports.Capacity = Capacity;
//# sourceMappingURL=capacity.js.map