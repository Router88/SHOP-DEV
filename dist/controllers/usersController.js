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
const addLog_1 = require("../logs/addLog");
const functions_1 = require("./functions");
class UsersController {
    auth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render("items/auth", {
                error: "",
                RegError: "",
                auth: req.session.auth,
                username: req.session.username,
                avatar: req.session.avatar
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
                avatar: req.session.avatar
            });
        });
    }
    ;
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let username = req.session.username;
            req.session.auth = false;
            req.session.username = undefined;
            req.session.avatar = undefined;
            req.session.role = undefined;
            (0, addLog_1.addLog)(`${(0, functions_1.getUserIp)(req.ip)} вышел из аккаунта ${username}`);
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
                    req.session.avatar = data.avatar; //не трогать, всё работает правильно
                    req.session.role = data.role;
                    (0, addLog_1.addLog)(`${(0, functions_1.getUserIp)(req.ip)} авторизовался в аккаунте ${req.session.username}`);
                    req.session.messageAlert = 'Авторизация прошла удачно';
                    res.redirect("/");
                }
            }
            else {
                (0, addLog_1.addLog)(`${(0, functions_1.getUserIp)(req.ip)} получил ошибку при авторизации в аккаунте ${req.session.username}. ошибка : неверные данные ввода`);
                res.render("items/auth", {
                    error: "Вы допустили ошибку или такого пользователя не существует",
                    RegError: '',
                    auth: req.session.auth,
                    username: req.session.username,
                });
            }
        });
    }
    ;
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.username == "" || req.body.password == "" || req.body.avatar == "" || req.body.email == "") {
                (0, addLog_1.addLog)(`${(0, functions_1.getUserIp)(req.ip)} получил ошибку при регистрации ${req.session.username}. ошибка : поля регистрации должны быть заполнены`);
                res.render('items/auth', {
                    RegError: "Заполните форму",
                    error: '',
                    auth: req.session.auth,
                    username: req.session.username,
                    avatar: req.session.avatar
                });
            }
            else {
                const data = yield prisma.users.findFirst({
                    where: {
                        username: req.body.username
                    }
                });
                const data2 = yield prisma.users.findFirst({
                    where: {
                        email: req.body.email
                    }
                });
                if (data != null) {
                    (0, addLog_1.addLog)(`${(0, functions_1.getUserIp)(req.ip)} получил ошибку при регистрации аккаунта ${req.session.username}. ошибка : такой пользователь уже существует`);
                    res.render('items/auth', {
                        RegError: "Такое имя пользователя уже занято, повторите попытку",
                        error: "",
                        auth: req.session.auth,
                        username: req.session.username,
                        avatar: req.session.avatar
                    });
                }
                else if (data2 != null) {
                    (0, addLog_1.addLog)(`${(0, functions_1.getUserIp)(req.ip)} получил ошибку при регистрации аккаунта ${req.session.username}. ошибка : такая почта уже указана при регистрации другого аккаунта`);
                    res.render('items/auth', {
                        RegError: "Такая  почта пользователя уже занята, повторите попытку",
                        error: "",
                        auth: req.session.auth,
                        username: req.session.username,
                        avatar: req.session.avatar
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
                    req.session.avatar = [req.body.avatar][0];
                    req.session.role = [req.body.role][0];
                    req.session.messageAlert = 'Регистрация прошла удачно';
                    (0, addLog_1.addLog)(`${(0, functions_1.getUserIp)(req.ip)} зарегистрировал аккаунт  ${req.session.username}`);
                    res.redirect('/');
                }
            }
        });
    }
    ;
    account(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = req.session.messageAlert;
            req.session.messageAlert = undefined;
            res.render("items/user", {
                auth: req.session.auth,
                username: req.session.username,
                avatar: req.session.avatar,
                messageAlert: message
            });
        });
    }
    ;
    // async accountUpdate(req: Request, res: Response) {
    //     const { id, username, password,avatar} = req.body;
    // account update
    //     await prisma.users.update({
    //         where: {
    //             username: Number(id),
    //         },
    //         data: {
    //            username,
    //            password,
    //         }
    //     });
    //     addLog(
    //         `пользователь ${req.session.username} обновил аккаунт: id=${req.body.id}`
    //     );
    //     req.session.messageAlert = 'Обновлено удачно';
    //     res.redirect('/');
    // }
    ///commentaries
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.username != undefined) {
                if (req.body.commentary != "") {
                    //const date = String(new Date().getTime());
                    yield prisma.comments.create({
                        data: {
                            author: String(req.session.username),
                            commentary: String(req.body.commentary),
                            //date_creating: stringData(date), добавится позже
                            item_id: Number(req.body.id)
                        }
                    });
                    (0, addLog_1.addLog)(`пользователь ${req.session.username} оставил комментарий на item по id=${req.body.id}`);
                    req.session.messageAlert = 'комментарий создан успешно';
                }
            }
            res.redirect("/items/" + String([req.body.id]));
        });
    }
    ;
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.comments.delete({
                where: {
                    id: Number(req.body.idComment)
                }
            });
            (0, addLog_1.addLog)(`пользователь ${req.session.username} удалил комментарий с id=${req.body.idComment}`);
            req.session.messageAlert = 'комментарий удалён успешно';
            res.redirect("/items/" + String([req.body.id]));
        });
    }
    ;
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, skip } = req.params;
            const data = yield prisma.comments.findMany({
                take: 20,
                skip: Number(skip),
                where: {
                    item_id: Number(id)
                }
            });
            res.header('Access-Control-Allow-Origin', '*');
            res.send(data);
        });
    }
}
exports.UsersController = UsersController;
