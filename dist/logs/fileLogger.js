"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLogger = void 0;
const fs_1 = __importDefault(require("fs"));
class FileLogger {
    addLog(message) {
        const date = new Date();
        fs_1.default.appendFile("./logs/logs.txt", `${stringData(String(date.getTime()))}:${date.getMilliseconds()} ${date.getTime()}

`, (err) => { });
    }
}
exports.FileLogger = FileLogger;
function stringData(data) {
    let date = new Date(Number(data));
    function addZero(number, col) {
        if (Number(col) - Number(String(number).length) >= 0) {
            return "0".repeat(Number(col) - Number(String(number).length)) + number;
        }
        else {
            return number;
        }
    }
    return String(`${date.getFullYear()}.${addZero(Number(date.getMonth() + 1), 2)}.${addZero(date.getDate(), 2)} ${addZero(date.getHours(), 2)}:${addZero(date.getMinutes(), 2)}`);
}
