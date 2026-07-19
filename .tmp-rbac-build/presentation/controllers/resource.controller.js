"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceController = void 0;
const success_response_1 = require("../responses/success.response");
class ResourceController {
    service;
    resourceName;
    constructor(service, resourceName) {
        this.service = service;
        this.resourceName = resourceName;
    }
    async createResource(command) {
        return new success_response_1.SuccessResponse(`${this.resourceName} created.`, await this.service.create(command));
    }
    async deleteResource(id) {
        await this.service.delete(id);
        return new success_response_1.SuccessResponse(`${this.resourceName} deleted.`, undefined);
    }
    async getResource(id) {
        return new success_response_1.SuccessResponse(`${this.resourceName} retrieved.`, await this.service.findById(id));
    }
    async listResources() {
        return new success_response_1.SuccessResponse(`${this.resourceName} list retrieved.`, await this.service.findAll());
    }
    async updateResource(id, command) {
        return new success_response_1.SuccessResponse(`${this.resourceName} updated.`, await this.service.update(id, command));
    }
}
exports.ResourceController = ResourceController;
//# sourceMappingURL=resource.controller.js.map