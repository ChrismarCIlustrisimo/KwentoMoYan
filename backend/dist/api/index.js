"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const serverless_http_1 = __importDefault(require("serverless-http"));
const app_1 = __importDefault(require("../src/app"));
exports.config = {
    api: {
        bodyParser: false, // let Express handle JSON
    },
};
exports.default = (0, serverless_http_1.default)(app_1.default);
