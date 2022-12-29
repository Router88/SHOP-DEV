"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLog = void 0;
const fileLogger_1 = require("./fileLogger");
const repository_1 = require("./repository");
const telegramLogger_1 = require("./telegramLogger");
const fileLogger = new fileLogger_1.FileLogger();
const telegramLogger = new telegramLogger_1.TelegramLogger();
const repo = new repository_1.Repository();
repo.attach(fileLogger);
repo.attach(telegramLogger);
function addLog(message) {
    repo.notify(String(message));
}
exports.addLog = addLog;
