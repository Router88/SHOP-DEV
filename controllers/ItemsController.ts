import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import multer from 'multer';
const upload = multer({ dest: "public/img/" });
import { addLog } from '../logs/addLog';

const prisma: PrismaClient = new PrismaClient();

export class ItemsController {
    async index(req: Request, res: Response) {
        const items = await prisma.items.findMany();
        const message = req.session.messageAlert;

        req.session.messageAlert=undefined;
        res.render('items/index', {
            'items': items,
            auth: req.session.auth,
            username: req.session.username,
            avatar: req.session.avatar,
            role: req.session.role,
            messageAlert : message
        });
    }

    async show(req: Request, res: Response) {
        const item = await prisma.items.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        const category = await prisma.category.findMany();
        const comments=await prisma.comments.findMany({
            where: {
                item_id: Number(req.params.id)
            }
        });
        const message = req.session.messageAlert;

        req.session.messageAlert=undefined;
        res.render('items/show', {
            'item': item,
            'comments':comments,
            'category':category,
            auth: req.session.auth,
            username: req.session.username,
            avatar: req.session.avatar,
            role: req.session.role,
            messageAlert : message
        });
    }

async create(req: Request, res: Response) {
        const message = req.session.messageAlert;
        const category = await prisma.category.findMany();
        req.session.messageAlert=undefined;
        res.render('items/create', {
            'category':category,
            auth: req.session.auth,
            username: req.session.username,
            avatar: req.session.avatar,
            role: req.session.role,
            messageAlert : message
        });
    }

    async store(req: Request, res: Response) {
        const { title, image, description,price, category_id } = req.body;

        await prisma.items.create({
            data: {
                title,
                image,
                description,
                price,
                category_id
            }
        });
        addLog(
            `пользователь ${req.session.username} создал item: title=${req.body.title}`
        );
        req.session.messageAlert = 'Сохранено удачно';
        res.redirect('/');
    }
   

    async update(req: Request, res: Response) {
        const { id, title, image, price , description, category_id } = req.body;

        await prisma.items.update({
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
        addLog(
            `пользователь ${req.session.username} обновил item: id=${req.body.id}`
        );
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
        addLog(
            `пользователь ${req.session.username} удалил item с id=${req.body.id}, так же удалены комментарии с  item_id=${req.body.id}`
        )
        req.session.messageAlert = 'Удалено удачно';
        res.redirect('/');
    }
//category
async storeCategory(req: Request, res: Response) {
    const { title, description } = req.body;

    await prisma.category.create({
        data: {
            title,
            description,
        }
    });
    addLog(
        `пользователь ${req.session.username} обновил category: title=${req.body.title}`
    );
    req.session.messageAlert = 'Категория обновлена удачно';
    res.redirect('/');
}
     async showCat(req: Request, res: Response) {
      const items = await prisma.items.findMany({
          where: {
              category_id: Number(req.params.id)
          }
      });
      const message = req.session.messageAlert;

      req.session.messageAlert=undefined;
      res.render('items/categoryShow', {
          'items': items,
          auth: req.session.auth,
          username: req.session.username,
          avatar: req.session.avatar,
          role: req.session.role,
          messageAlert : message
      });
     
  }
  async deleteCat(req: Request, res: Response) {
    const { id } = req.body;

    await prisma.category.delete({
        where: {
            id: Number(id),
        }
    });
    addLog(
        `пользователь ${req.session.username} удалил категорию с id=${req.body.id}`
    )
    req.session.messageAlert = 'Удалено удачно';
    res.redirect('/');
}
//category
    async home(req: Request, res: Response) {
        const items = await prisma.category.findMany();
        const message = req.session.messageAlert;
        req.session.messageAlert=undefined;
        res.render('home', {
            'category': items,
            auth: req.session.auth,
            username: req.session.username,
            avatar: req.session.avatar,
            role: req.session.role,
            messageAlert : message
        });
        
    }

    async find(req: Request, res: Response) {
        const message = req.session.messageAlert;

        req.session.messageAlert=undefined;
        const { search } = req.body;
        const items = await prisma.items.findMany({
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
            messageAlert : message
        });
    };







}





