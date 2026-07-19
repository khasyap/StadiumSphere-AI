"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Money = void 0;
const invalid_money_exception_1 = require("../exceptions/invalid-money.exception");
const value_object_1 = require("./value-object");
class Money extends value_object_1.ValueObject {
    constructor(amount, currency) {
        super({ amount, currency: currency.trim().toUpperCase() });
    }
    get amount() {
        return this.props.amount;
    }
    get currency() {
        return this.props.currency;
    }
    validate(props) {
        if (!Number.isFinite(props.amount) || props.amount < 0 || !/^[A-Z]{3}$/.test(props.currency)) {
            throw new invalid_money_exception_1.InvalidMoneyException();
        }
    }
}
exports.Money = Money;
//# sourceMappingURL=money.js.map