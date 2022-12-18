"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderObject = void 0;
function renderObject(req, obj) {
    if (req.session.messageAlert != undefined) {
        let messageAlert = req.session.messageAlert;
        req.session.messageAlert = undefined;
        return Object.assign({
            'auth': req.session.auth,
            'message': messageAlert
        }, obj);
    }
    return Object.assign({
        'auth': req.session.auth
    }, obj);
}
exports.renderObject = renderObject;
