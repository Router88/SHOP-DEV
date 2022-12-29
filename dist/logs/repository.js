"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
class Repository {
    constructor() {
        this.loggers = [];
    }
    attach(observers) {
        this.loggers.push(observers);
    }
    ;
    notify(message) {
        this.loggers.forEach((logger) => {
            logger.addLog(message);
        });
    }
}
exports.Repository = Repository;
