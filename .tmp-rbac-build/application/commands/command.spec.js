"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("./command");
describe('Command', () => {
    it('captures an immutable command payload', () => {
        const command = new command_1.Command({ name: 'Stadium' });
        expect(command.payload).toEqual({ name: 'Stadium' });
        expect(Object.isFrozen(command.payload)).toBe(true);
    });
});
//# sourceMappingURL=command.spec.js.map