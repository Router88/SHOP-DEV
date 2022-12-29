"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLogger = void 0;
const fs_1 = __importDefault(require("fs"));
const functions_1 = require("../functions");
class FileLogger {
    addLog(message) {
        const date = new Date();
        fs_1.default.appendFile("./logs/logs.txt", `${(0, functions_1.stringData)(String(date.getTime()))}:${date.getMilliseconds()} ${date.getTime()}
${message}

`, (err) => { });
    }
}
exports.FileLogger = FileLogger;
