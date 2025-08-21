"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLastOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_last_order_dto_1 = require("./create-last-order.dto");
class UpdateLastOrderDto extends (0, swagger_1.PartialType)(create_last_order_dto_1.CreateLastOrderDto) {
}
exports.UpdateLastOrderDto = UpdateLastOrderDto;
//# sourceMappingURL=update-last-order.dto.js.map