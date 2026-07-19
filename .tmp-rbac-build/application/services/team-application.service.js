"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamApplicationService = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../../domain");
const application_entity_not_found_exception_1 = require("../exceptions/application-entity-not-found.exception");
const application_validation_exception_1 = require("../exceptions/application-validation.exception");
const application_repository_interface_1 = require("../interfaces/application-repository.interface");
const crud_application_service_1 = require("./crud-application.service");
let TeamApplicationService = class TeamApplicationService extends crud_application_service_1.CrudApplicationService {
    sportRepository;
    constructor(repository, sportRepository) {
        super(repository);
        this.sportRepository = sportRepository;
    }
    async create(command) {
        const sport = await this.getSport(command.sportId);
        this.assertSportName(command.sportName, sport);
        return super.create({ ...command, sportName: sport.toJSON().name });
    }
    async update(id, command) {
        if (command.sportName !== undefined && command.sportId === undefined) {
            throw new application_validation_exception_1.ApplicationValidationException('sportName can only be changed with sportId.');
        }
        if (command.sportId === undefined) {
            return super.update(id, command);
        }
        const sport = await this.getSport(command.sportId);
        if (command.sportName !== undefined) {
            this.assertSportName(command.sportName, sport);
        }
        return super.update(id, { ...command, sportName: sport.toJSON().name });
    }
    createEntity(command) {
        return new domain_1.Team({ name: command.name, sport: this.createSport(command) });
    }
    updateEntity(current, command) {
        const team = current.toJSON();
        const sport = team.sport.toJSON();
        return new domain_1.Team({
            name: command.name ?? team.name,
            sport: new domain_1.Sport({ name: command.sportName ?? sport.name }, new domain_1.UniqueEntityId(command.sportId ?? sport.id)),
        }, current.id);
    }
    createSport(command) {
        return new domain_1.Sport({ name: command.sportName }, new domain_1.UniqueEntityId(command.sportId));
    }
    async getSport(sportId) {
        const sport = await this.sportRepository.findById(new domain_1.UniqueEntityId(sportId));
        if (sport === null) {
            throw new application_entity_not_found_exception_1.ApplicationEntityNotFoundException(sportId);
        }
        return sport;
    }
    assertSportName(sportName, sport) {
        if (sportName !== sport.toJSON().name) {
            throw new application_validation_exception_1.ApplicationValidationException('sportName must match the referenced Sport.');
        }
    }
};
exports.TeamApplicationService = TeamApplicationService;
exports.TeamApplicationService = TeamApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(application_repository_interface_1.TEAM_REPOSITORY)),
    __param(1, (0, common_1.Inject)(application_repository_interface_1.SPORT_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], TeamApplicationService);
//# sourceMappingURL=team-application.service.js.map