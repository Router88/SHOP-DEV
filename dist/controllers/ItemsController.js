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
//import { } from './functions'; //файл для функций, которых нет, но могут добавиться позже
const upload = (0, multer_1.default)({ dest: "public/img/" });
const prisma = new client_1.PrismaClient();
class ItemsController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield prisma.items.findMany();
            res.render('items/index', {
                'items': items,
                auth: req.session.auth,
                username: req.session.username,
                avatar: req.session.avatar,
                role: req.session.role,
                messageAlert: req.session.messageAlert
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
            res.render('items/show', {
                'item': item,
                auth: req.session.auth,
                username: req.session.username,
                avatar: req.session.avatar,
                role: req.session.role,
                messageAlert: req.session.messageAlert
            });
        });
    }
    create(req, res) {
        res.render('items/create', {
            auth: req.session.auth,
            username: req.session.username,
            avatar: req.session.avatar,
            role: req.session.role,
            messageAlert: req.session.messageAlert
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, image, description, author, category_id } = req.body;
            yield prisma.items.create({
                data: {
                    title,
                    image,
                    description,
                    category_id
                }
            });
            req.session.messageAlert = 'Сохранено удачно';
            res.redirect('/');
        });
    }
    storeCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description } = req.body;
            yield prisma.category.create({
                data: {
                    title,
                    description,
                }
            });
            req.session.messageAlert = 'Категория обновлена удачно';
            res.redirect('/');
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, image, description, category_id } = req.body;
            yield prisma.items.update({
                where: {
                    id: Number(id),
                },
                data: {
                    title,
                    image,
                    description,
                    category_id
                }
            });
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
            req.session.messageAlert = 'Удалено удачно';
            res.redirect('/');
        });
    }
    //главная страни
    // async home(req: Request, res: Response) {
    //     //запрос категорий
    //     const category = await prisma.category.findUnique({
    //         where: {
    //             id: Number(req.params.id)
    //         }
    //     });
    //
    //     res.render('home', {
    //         'category': category,
    //         auth: req.session.auth,
    //         username: req.session.username,
    //         avatar: req.session.avatar,
    //         role: req.session.role,
    //         messageAlert : req.session.messageAlert
    //     });
    //   }
    home(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield prisma.category.findMany();
            res.render('home', {
                'category': items,
                auth: req.session.auth,
                username: req.session.username,
                avatar: req.session.avatar,
                role: req.session.role,
                messageAlert: req.session.messageAlert
            });
        });
    }
}
exports.ItemsController = ItemsController;
