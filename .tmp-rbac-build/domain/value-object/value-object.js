"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
class ValueObject {
    props;
    constructor(props) {
        this.validate(props);
        this.props = Object.freeze({ ...props });
    }
    equals(valueObject) {
        return (valueObject !== undefined && JSON.stringify(this.props) === JSON.stringify(valueObject.props));
    }
    toJSON() {
        return this.props;
    }
}
exports.ValueObject = ValueObject;
//# sourceMappingURL=value-object.js.map