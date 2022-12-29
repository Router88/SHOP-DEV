import express, { Express, Request, Response } from 'express';
import path from 'path';
import { ItemsController } from './controllers/ItemsController';
import { UsersController } from './controllers/usersController';
import session from 'express-session';

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '../.env' });
const app: Express = express();
const itemsController = new ItemsController();
const usersController = new UsersController();
import { addLog } from './logs/addLog';
import { getUserIp } from './controllers/functions';
import { get } from 'https';
//
import AccessControl = require("express-ip-access-control");
let options = {
  mode: 'deny',
  denys: [''], //сюда прописывать ip устройств, у которых не должно быть доступа
  allows: [],
  forceConnectionAddress: false,
  log: function (clientIp: any, access: any) {
    console.log(clientIp + (access ? ' accessed.' : ' denied.'));
  },

  statusCode: 401,
  redirectTo: '',
  message: 'Sorry, but YOU HAVE BEEN BLOCKED'
};
let middleware = AccessControl(options); //не ошибка
app.use(AccessControl(options));// не ошибка

//
// чтобы работало нормально
declare module "express-session" {
  interface SessionData {
    auth: boolean,
    username: string,
    email: string;
    role: number;
    description: string;
    avatar: string;
    author: string;
    category_id: number;
    messageAlert: string;
  }
};
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', true)
app.use(session({ secret: "Secret", resave: false, saveUninitialized: true }));

function isAuth(req: Request, res: Response, next: any) {
  if (req.session.auth) {
    next();
  } else {
    res.redirect('/');
  }
}




function isAdmin(req: Request, res: Response, next: any) {
  if (req.session.auth && req.session.role == 1) {
    next();
  } else {
    res.redirect('/');
    console.log('not admin')
  }
}

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});


app.get("/", (req: Request, res: Response) => {
  itemsController.home(req, res);
});


app.get("/items", (req: Request, res: Response) => {
  itemsController.index(req, res);
});

// items
app.get("/items/show/:id", (req: Request, res: Response) => {
  itemsController.show(req, res);
});

app.get("/items/create", isAdmin, (req: Request, res: Response) => {
  itemsController.create(req, res);
});

app.post("/items/store", isAdmin, (req: Request, res: Response) => {
  itemsController.store(req, res);
});

app.post("/items/update", isAdmin, (req: Request, res: Response) => {
  itemsController.update(req, res);
});

app.post("/items/delete", isAdmin, (req: Request, res: Response) => {
  itemsController.delete(req, res);
});
app.post("/items/find", (req: Request, res: Response) => {
  itemsController.find(req, res);
});


app.get("/category/:id", (req: Request, res: Response) => {
  itemsController.showCat(req, res);
});
app.post("/category/deleteCat", isAdmin, (req: Request, res: Response) => {
  itemsController.deleteCat(req, res);
});
//users
app.get("/auth", (req: Request, res: Response) => {
  usersController.auth(req, res);
});

app.post("/login", (req: Request, res: Response) => {
  usersController.login(req, res);
});

app.get("/logout", isAuth, (req: Request, res: Response) => {
  usersController.logout(req, res);
});

app.post("/register", (req: Request, res: Response) => {
  usersController.register(req, res);
});

app.get("/accountRecovery", (req: Request, res: Response) => {
  usersController.accountRecovery(req, res);
});

app.get("/account", isAuth, (req: Request, res: Response) => {
  usersController.account(req, res);
});
app.get("/accountUpdade", (req: Request, res: Response) => {
  //usersController.account(req, res);
  res.redirect('/');
});




//post
app.post("/comments/store", async (req: Request, res: Response) => {
  usersController.store(req, res);
});

app.post("/comments/delete", async (req: Request, res: Response) => {
  usersController.delete(req, res);
});



