"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const salt = 10;
const prisma = new client_1.PrismaClient();
class UsersController {
    auth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render("items/auth", {
                error: "",
                RegError: "",
                auth: req.session.auth,
                username: req.session.username,
            });
        });
    }
    ;
    accountRecovery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render("items/accountRecovery", {
                error: "",
                auth: req.session.auth,
                username: req.session.username,
            });
        });
    }
    ;
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.auth = false;
            req.session.username = undefined;
            res.redirect("/");
        });
    }
    ;
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma.users.findFirst({
                where: {
                    username: req.body.username
                }
            });
            if (data != null) {
                let compare = bcrypt_1.default.compareSync(req.body.password, String(data.password));
                if (compare == true) {
                    req.session.auth = true;
                    req.session.username = [req.body.username][0];
                    res.redirect("/");
                }
            }
            else
                res.render("login", {
                    error: "Такого пользователя не существует",
                    auth: req.session.auth,
                    username: req.session.username,
                });
        });
    }
    ;
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.username == "" || req.body.password == "") {
                res.render('register', {
                    RegError: "The field cannot be empty",
                    auth: req.session.auth,
                    username: req.session.username
                });
            }
            else {
                const data = yield prisma.users.findFirst({
                    where: {
                        username: req.body.username
                    }
                });
                if (data != null) {
                    res.render('register', {
                        error: "Такое имя пользователя уже занято",
                        auth: req.session.auth,
                        username: req.session.username,
                    });
                }
                else {
                    yield prisma.users.create({
                        data: {
                            username: yield req.body.username,
                            password: yield bcrypt_1.default.hash(String(req.body.password), salt),
                            email: yield bcrypt_1.default.hash(String(req.body.email), salt),
                            avatar: yield String(req.body.avatar)
                        }
                    });
                    req.session.auth = true;
                    req.session.username = [req.body.username][0];
                    res.redirect('/');
                }
            }
        });
    }
    ;
}
exports.UsersController = UsersController;
