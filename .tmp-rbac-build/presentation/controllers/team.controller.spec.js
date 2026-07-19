"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const team_dto_1 = require("../dto/team.dto");
const team_controller_1 = require("./team.controller");
describe('TeamController', () => {
    const service = {
        create: jest.fn(async (_command) => ({ id: 'team-1' })),
        delete: jest.fn(async (_id) => undefined),
        findAll: jest.fn(async () => [{ id: 'team-1' }]),
        findById: jest.fn(async (_id) => ({ id: 'team-1' })),
        update: jest.fn(async (_id, _command) => ({ id: 'team-1' })),
    };
    const controller = new team_controller_1.TeamController(service);
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('delegates reads to the application service and wraps the response', async () => {
        await expect(controller.list()).resolves.toMatchObject({ success: true });
        await expect(controller.getById('team-1')).resolves.toMatchObject({ success: true });
        expect(service.findAll).toHaveBeenCalledTimes(1);
        expect(service.findById).toHaveBeenCalledWith('team-1');
    });
    it('delegates commands without mapping or persistence access', async () => {
        const create = Object.assign(new team_dto_1.CreateTeamDto(), {
            name: 'StadiumSphere FC',
            sportId: 'sport-1',
            sportName: 'Football',
        });
        const update = Object.assign(new team_dto_1.UpdateTeamDto(), { name: 'Updated Team' });
        await controller.create(create);
        await controller.update('team-1', update);
        await controller.delete('team-1');
        expect(service.create).toHaveBeenCalledWith(create);
        expect(service.update).toHaveBeenCalledWith('team-1', update);
        expect(service.delete).toHaveBeenCalledWith('team-1');
    });
});
//# sourceMappingURL=team.controller.spec.js.map