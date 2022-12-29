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
exports.ItemsController = void 0;
const client_1 = require("@prisma/client");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: "public/img/" });
const addLog_1 = require("../logs/addLog");
const prisma = new client_1.PrismaClient();
class ItemsController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield prisma.items.findMany();
            const message = req.session.messageAlert;
            req.session.messageAlert = undefined;
            res.render('items/index', {
                'items': items,
                auth: req.session.auth,
                username: req.session.username,
                avatar: req.session.avatar,
                role: req.session.role,
                messageAlert: message
            });
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield prisma.items.findUnique({
                where: {
                    id: Number(req.params.id)
                }
            });
            const category = yield prisma.category.findMany();
            const comments = yield prisma.comments.findMany({
                where: {
                    item_id: Number(req.params.id)
                }
            });
            const message = req.session.messageAlert;
            req.session.messageAlert = undefined;
            res.render('items/show', {
                'item': item,
                'comments': comments,
                'category': category,
                auth: req.session.auth,
                username: req.session.username,
                avatar: req.session.avatar,
                role: req.session.role,
                messageAlert: message
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = req.session.messageAlert;
            const category = yield prisma.category.findMany();
            req.session.messageAlert = undefined;
            res.render('items/create', {
                'category': category,
                auth: req.session.auth,
                username: req.session.username,
                avatar: req.session.avatar,
                role: req.session.role,
                messageAlert: message
            });
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, image, description, price, category_id } = req.body;
            yield prisma.items.create({
                data: {
                    title,
                    image,
                    description,
                    price,
                    category_id
                }
            });
            (0, addLog_1.addLog)(`пользователь ${req.session.username} создал item: title=${req.body.title}`);
            req.session.messageAlert = 'Сохранено удачно';
            res.redirect('/');
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, image, price, description, category_id } = req.body;
            yield prisma.items.update({
                where: {
                    id: Number(id),
                },
                data: {
                    title,
                    image,
                    price,
                    description,
                    category_id
                }
            });
            (0, addLog_1.addLog)(`пользователь ${req.session.username} обновил item: id=${req.body.id}`);
            req.session.messageAlert = 'Обновлено удачно';
            res.redirect('/');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            yield prisma.items.delete({
                where: {
                    id: Number(id),
                }
            });
            (0, addLog_1.addLog)(`пользователь ${req.session.username} удалил item с id=${req.body.id}, так же удалены комментарии с  item_id=${req.body.id}`);
            req.session.messageAlert = 'Удалено удачно';
            res.redirect('/');
        });
    }
    //category
    storeCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description } = req.body;
            yield prisma.category.create({
                data: {
                    title,
                    description,
                }
            });
            (0, addLog_1.addLog)(`пользователь ${req.session.username} обновил category: title=${req.body.title}`);
            req.session.messageAlert = 'Категория обновлена удачно';
            res.redirect('/');
        });
    }
    showCat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield prisma.items.findMany({
                where: {
                    category_id: Number(req.params.id)
                }
            });
            const message = req.session.messageAlert;
            req.session.messageAlert = undefined;
            res.render('items/categoryShow', {
                'items': items,
                auth: req.session.auth,
                username: req.session.username,
                avatar: req.session.avatar,
                role: req.session.role,
                messageAlert: message
            });
        });
    }
    deleteCat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            yield prisma.category.delete({
                where: {
                    id: Number(id),
                }
            });
            (0, addLog_1.addLog)(`пользователь ${req.session.username} удалил категорию с id=${req.body.id}`);
            req.session.messageAlert = 'Удалено удачно';
            res.redirect('/');
        });
    }
    //category
    home(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield prisma.category.findMany();
            const message = req.session.messageAlert;
            req.session.messageAlert = undefined;
            res.render('home', {
                'category': items,
                auth: req.session.auth,
                username: req.session.username,
                avatar: req.session.avatar,
                role: req.session.role,
                messageAlert: message
            });
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = req.session.messageAlert;
            req.session.messageAlert = undefined;
            const { search } = req.body;
            const items = yield prisma.items.findMany({
                where: {
                    'title': {
                        contains: search
                    }
                },
                include: {
                    category: true
                }
            });
            res.render('items/index', {
                'items': items,
                auth: req.session.auth,
                username: req.session.username,
                avatar: req.session.avatar,
                role: req.session.role,
                messageAlert: message
            });
        });
    }
    ;
}
exports.ItemsController = ItemsController;
