import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import multer from 'multer';
//import { } from './functions'; //файл для функций, которых нет, но могут добавиться позже
const upload = multer({ dest: "public/img/" });

const prisma: PrismaClient = new PrismaClient();

export class ItemsController {
    async index(req: Request, res: Response) {
        const items = await prisma.items.findMany();

        res.render('items/index', {
            'items': items,
            auth: req.session.auth,
            username: req.session.username,
            avatar: req.session.avatar,
            role: req.session.role,
            messageAlert : req.session.messageAlert
        });
    }

    async show(req: Request, res: Response) {
        const item = await prisma.items.findUnique({
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
            messageAlert : req.session.messageAlert
        });
    }

    create(req: Request, res: Response) {
        res.render('items/create', {
            auth: req.session.auth,
            username: req.session.username,
            avatar: req.session.avatar,
            role: req.session.role,
            messageAlert : req.session.messageAlert
        });
    }

    async store(req: Request, res: Response) {
        const { title, image, description, author, category_id } = req.body;

        await prisma.items.create({
            data: {
                title,
                image,
                description,
                category_id
            }
        });
        req.session.messageAlert = 'Сохранено удачно';
        res.redirect('/');
    }
    async storeCategory(req: Request, res: Response) {
        const { title, description } = req.body;

        await prisma.category.create({
            data: {
                title,
                description,
            }
        });
        req.session.messageAlert = 'Категория обновлена удачно';
        res.redirect('/');
    }

    async update(req: Request, res: Response) {
        const { id, title, image, description, category_id } = req.body;

        await prisma.items.update({
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
    }

    async delete(req: Request, res: Response) {
        const { id } = req.body;

        await prisma.items.delete({
            where: {
                id: Number(id),
            }
        });
        req.session.messageAlert = 'Удалено удачно';
        res.redirect('/');
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
    async home(req: Request, res: Response) {
        const items = await prisma.category.findMany();

        res.render('home', {
            'category': items,
            auth: req.session.auth,
            username: req.session.username,
            avatar: req.session.avatar,
            role: req.session.role,
            messageAlert : req.session.messageAlert
        });
    }



        //пойми как работает и сделай нормально
   //async search(req: Request, res: Response) {
   //    const { search } = req.body;
   //    const items = await prisma.items.findMany({
   //        where: {
   //            'title': {
   //                contains: search
   //            }
   //        },
   //        include: {
   //            category: true
   //        }
   //    });

   //    res.render("items",
   //        renderObject(req, { 'items': items , 'search': search})
   //    );
   //};
}





