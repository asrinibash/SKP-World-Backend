"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestExpection = void 0;
const root_1 = require("./root");
class BadRequestExpection extends root_1.HttpException {
    constructor(message, errorCode) {
        super(message, errorCode, 400, errorCode);
    }
}
exports.BadRequestExpection = BadRequestExpection;
