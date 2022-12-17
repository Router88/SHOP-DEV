import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import multer from 'multer';

const upload = multer({ dest: "public/img/" });

const prisma: PrismaClient = new PrismaClient();

export class ItemsController {
    async index(req: Request, res: Response) {
        const items = await prisma.items.findMany();

        res.render('items/index', {
            'items': items,
            auth: req.session.auth,
            username: req.session.username,
            avatar: req.session.avatar
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
            role: req.session.role
        });
    }

    create(req: Request, res: Response) {
        res.render('items/create', {
            auth: req.session.auth,
            username: req.session.username,
            avatar: req.session.avatar,
            role: req.session.role
        });
    }

    async store(req: Request, res: Response) {
        const { title, image, description, author, category_id } = req.body;

        await prisma.items.create({
            data: {
                title,
                image,
                description,
                author,
                category_id
            }
        });

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

        res.redirect('/');
    }

    async delete(req: Request, res: Response) {
        const { id } = req.body;

        await prisma.items.delete({
            where: {
                id: Number(id),
            }
        });
        res.redirect('/');
    }
}
