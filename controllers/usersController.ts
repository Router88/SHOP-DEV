import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
const salt = 10;
const prisma: PrismaClient = new PrismaClient();

export class UsersController {
    async auth (req: Request, res: Response) {
        res.render("items/auth",
            {
                error: "",
                RegError: "",
                auth : req.session.auth,
                username : req.session.username,
                avatar: req.session.avatar
            });
    };
    async accountRecovery (req: Request, res: Response) {
        res.render("items/accountRecovery",
            {
                error: "",
                auth: req.session.auth,
                username: req.session.username,
                avatar: req.session.avatar
            });
    };
    async logout (req: Request, res: Response) {
        req.session.auth = false;
        req.session.username = undefined;
        res.redirect("/");
    };

    async login (req: Request, res: Response) {
        const data = await prisma.users.findFirst({
            where: {
                username: req.body.username
            }
        })
        
        if (data != null) {
            let compare=bcrypt.compareSync(req.body.password, String(data.password));
            if (compare == true) {
                req.session.auth = true;
                req.session.username = [req.body.username][0];
                req.session.avatar = data.avatar;
                res.redirect("/")
            }
        }
        else res.render("login", {
            error: "Такого пользователя не существует",
            auth: req.session.auth,
            username: req.session.username,
        });
    };



    async register (req: Request, res: Response) {
        if (req.body.username == "" || req.body.password == "") {
            res.render('register', {
                RegError: "The field cannot be empty",
                auth: req.session.auth,
                username: req.session.username
            });
        } else {
            const data = await prisma.users.findFirst({
                where: {
                    username: req.body.username
                }
            })
            if (data != null) {
                res.render('register', {
                    error: "Такое имя пользователя уже занято",
                    auth: req.session.auth,
                    username: req.session.username,
                });
            }else {
                await prisma.users.create({
                    data: {
                        username: await req.body.username,
                        password: await bcrypt.hash(String(req.body.password),salt),
                        email: await bcrypt.hash(String(req.body.email),salt),
                        avatar: await String(req.body.avatar)
                    }
                });
                req.session.auth = true;
                req.session.username = [req.body.username][0];
                req.session.avatar = [req.body.avatar][0];
                res.redirect('/');
            }
        }
    };

    async account (req: Request, res: Response) {
        res.render("items/user",
            {
                auth: req.session.auth,
                username: req.session.username,
                avatar: req.session.avatar
            });
    };



}