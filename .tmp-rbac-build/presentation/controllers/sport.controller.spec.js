"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sport_dto_1 = require("../dto/sport.dto");
const sport_controller_1 = require("./sport.controller");
describe('SportController', () => {
    const service = {
        create: jest.fn(async (_command) => ({ id: 'sport-1' })),
        delete: jest.fn(async (_id) => undefined),
        findAll: jest.fn(async () => [{ id: 'sport-1' }]),
        findById: jest.fn(async (_id) => ({ id: 'sport-1' })),
        update: jest.fn(async (_id, _command) => ({ id: 'sport-1' })),
    };
    const controller = new sport_controller_1.SportController(service);
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('delegates reads to the application service and wraps the response', async () => {
        await expect(controller.list()).resolves.toMatchObject({ success: true });
        await expect(controller.getById('sport-1')).resolves.toMatchObject({ success: true });
        expect(service.findAll).toHaveBeenCalledTimes(1);
        expect(service.findById).toHaveBeenCalledWith('sport-1');
    });
    it('delegates commands without mapping or persistence access', async () => {
        const create = Object.assign(new sport_dto_1.CreateSportDto(), { name: 'Football' });
        const update = Object.assign(new sport_dto_1.UpdateSportDto(), { name: 'Association Football' });
        await controller.create(create);
        await controller.update('sport-1', update);
        await controller.delete('sport-1');
        expect(service.create).toHaveBeenCalledWith(create);
        expect(service.update).toHaveBeenCalledWith('sport-1', update);
        expect(service.delete).toHaveBeenCalledWith('sport-1');
    });
});
//# sourceMappingURL=sport.controller.spec.js.map