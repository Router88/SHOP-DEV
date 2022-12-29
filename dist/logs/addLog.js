"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLog = void 0;
//import { FileLogger } from "./fileLogger";
const repository_1 = require("./repository");
const telegramLogger_1 = require("./telegramLogger");
//const fileLogger = new FileLogger();
const telegramLogger = new telegramLogger_1.TelegramLogger();
const repo = new repository_1.Repository();
//repo.attach(fileLogger);
repo.attach(telegramLogger);
function addLog(message) {
    repo.notify(String(message));
}
exports.addLog = addLog;
