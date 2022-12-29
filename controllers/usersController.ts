import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const salt = 10;
const prisma: PrismaClient = new PrismaClient();
import { addLog } from '../logs/addLog';
import { getUserIp } from './functions';
export class UsersController {
    async auth(req: Request, res: Response) {
        res.render("items/auth",
            {
                error: "",
                RegError: "",
                auth: req.session.auth,
                username: req.session.username,
                avatar: req.session.avatar
            });
    };
    async accountRecovery(req: Request, res: Response) {
        res.render("items/accountRecovery",
            {
                error: "",
                auth: req.session.auth,
                username: req.session.username,
                avatar: req.session.avatar
            });

    };
    async logout(req: Request, res: Response) {
        let username = req.session.username;
        req.session.auth = false;
        req.session.username = undefined;
        req.session.avatar = undefined;
        req.session.role = undefined;
        addLog(
            `${getUserIp(req.ip)} вышел из аккаунта ${username}`
        );
        res.redirect("/");
    };

    async login(req: Request, res: Response) {
        const data = await prisma.users.findFirst({
            where: {
                username: req.body.username
            }
        })

        if (data != null) {
            let compare = bcrypt.compareSync(req.body.password, String(data.password));
            if (compare == true) {
                req.session.auth = true;
                req.session.username = [req.body.username][0];
                req.session.avatar = data.avatar; //не трогать, всё работает правильно
                req.session.role = data.role;
                addLog(
                    `${getUserIp(req.ip)} авторизовался в аккаунте ${req.session.username}`
                );
                req.session.messageAlert = 'Авторизация прошла удачно';
                res.redirect("/")
            }
        }
        else {
            addLog(
                `${getUserIp(req.ip)} получил ошибку при авторизации в аккаунте ${req.session.username}. ошибка : неверные данные ввода`
            );
            res.render("items/auth", {
                error: "Вы допустили ошибку или такого пользователя не существует",
                RegError: '',
                auth: req.session.auth,
                username: req.session.username,

            });
        }
    };



    async register(req: Request, res: Response) {
        if (req.body.username == "" || req.body.password == "" || req.body.avatar == "" || req.body.email == "") {
            addLog(
                `${getUserIp(req.ip)} получил ошибку при регистрации ${req.session.username}. ошибка : поля регистрации должны быть заполнены`
            );
            res.render('items/auth', {
                RegError: "Заполните форму",
                error: '',
                auth: req.session.auth,
                username: req.session.username,
                avatar: req.session.avatar
            });

        } else {
            const data = await prisma.users.findFirst({
                where: {
                    username: req.body.username
                }
            })
            const data2 = await prisma.users.findFirst({
                where: {
                    email: req.body.email
                }
            })

            if (data != null) {
                addLog(
                    `${getUserIp(req.ip)} получил ошибку при регистрации аккаунта ${req.session.username}. ошибка : такой пользователь уже существует`
                );
                res.render('items/auth', {
                    RegError: "Такое имя пользователя уже занято, повторите попытку",
                    error: "",
                    auth: req.session.auth,
                    username: req.session.username,
                    avatar: req.session.avatar
                });
            } else if (data2 != null) {
                addLog(
                    `${getUserIp(req.ip)} получил ошибку при регистрации аккаунта ${req.session.username}. ошибка : такая почта уже указана при регистрации другого аккаунта`
                );
                res.render('items/auth', {
                    RegError: "Такая  почта пользователя уже занята, повторите попытку",
                    error: "",
                    auth: req.session.auth,
                    username: req.session.username,
                    avatar: req.session.avatar
                });
            } else {
                await prisma.users.create({
                    data: {
                        username: await req.body.username,
                        password: await bcrypt.hash(String(req.body.password), salt),
                        email: await bcrypt.hash(String(req.body.email), salt),
                        avatar: await String(req.body.avatar)
                    }
                });
                req.session.auth = true;
                req.session.username = [req.body.username][0];
                req.session.avatar = [req.body.avatar][0];
                req.session.role = [req.body.role][0]
                req.session.messageAlert = 'Регистрация прошла удачно';
                addLog(
                    `${getUserIp(req.ip)} зарегистрировал аккаунт  ${req.session.username}`
                );
                res.redirect('/');
            }
        }

    };

    async account(req: Request, res: Response) {
        const message = req.session.messageAlert;

        req.session.messageAlert = undefined;
        res.render("items/user",
            {
                auth: req.session.auth,
                username: req.session.username,
                avatar: req.session.avatar,
                messageAlert: message
            });

    };
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

    async store(req: Request, res: Response) {
        if (req.session.username != undefined) {
            if (req.body.commentary != "") {
                //const date = String(new Date().getTime());
                await prisma.comments.create({
                    data: {
                        author: String(req.session.username),
                        commentary: String(req.body.commentary),
                        //date_creating: stringData(date), добавится позже
                        item_id: Number(req.body.id)
                    }
                })
                addLog(
                    `пользователь ${req.session.username} оставил комментарий на item по id=${req.body.id}`
                );
                req.session.messageAlert = 'комментарий создан успешно'
            }
        }
        res.redirect("/items/" + String([req.body.id]));
    };

    async delete(req: Request, res: Response) {
        await prisma.comments.delete({
            where: {
                id: Number(req.body.idComment)
            }
        })
        addLog(
            `пользователь ${req.session.username} удалил комментарий с id=${req.body.idComment}`
        );
        req.session.messageAlert = 'комментарий удалён успешно';
        res.redirect("/items/" + String([req.body.id]));
    };

    async show(req: Request, res: Response) {
        const { id, skip } = req.params;
        const data = await prisma.comments.findMany({
            take: 20,
            skip: Number(skip),
            where: {
                item_id: Number(id)
            }
        });
        res.header('Access-Control-Allow-Origin', '*');
        res.send(data);
    }


}
