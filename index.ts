import express, { Express, Request, Response } from 'express';
import path from 'path';
import { ItemsController } from './controllers/ItemsController';
import { UsersController } from './controllers/usersController';
import session from 'express-session';
import internal from 'stream';
const app: Express = express();
const itemsController = new ItemsController();
const usersController = new UsersController();
//import './controllers/declareController'

// чтобы работало нормально
declare module "express-session" {
  interface SessionData {
      auth: boolean,
      username: string,
      email : string;
      role: number;
      description:string;
      avatar : string;
      author : string;
      category_id : number;
  }
};
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({secret: "Secret", resave: false, saveUninitialized: true}));

function isAuth(req: Request, res: Response, next : any) {
  if (req.session.auth) {
    next();
  } else {
    res.redirect('/');
  }
}

function isAdmin(req: Request, res: Response, next : any) {
  if (req.session.auth && req.session.role==1) {
    next();
  } else {
    res.redirect('/');
    console.log('not admin')
  }
}

function border(req: Request, res: Response, next : any) {
  //dont access
    res.redirect('/');
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get("/",(req: Request, res: Response) => {
  res.render('home',{
    auth: req.session.auth,
     username: req.session.username,
     avatar: req.session.avatar,
     role: req.session.role
  });
 
});

app.get("/items", (req: Request, res: Response) => {
  itemsController.index(req, res);
});

// items
app.get("/items/:id", (req: Request, res: Response) => {
  itemsController.show(req, res);
});

app.get("/items/create", isAdmin, (req: Request, res: Response) => {
  itemsController.create(req, res);
});

app.post("/items/store", isAdmin,  (req: Request, res: Response) => {
  itemsController.store(req, res);
});

app.post("/items/update", isAdmin,  (req: Request, res: Response) => {
  itemsController.update(req, res);
});

app.post("/items/delete", isAdmin,  (req: Request, res: Response) => {
  itemsController.delete(req, res);
});

//users
app.get("/auth", (req: Request, res: Response) => {
  usersController.auth(req, res);
});

app.post("/login", (req: Request, res: Response) => {
  usersController.login(req, res);
});

app.get("/logout", (req: Request, res: Response) => {
  usersController.logout(req, res);
});

app.post("/register", (req: Request, res: Response) => {
  usersController.register(req, res);
});

app.get("/accountRecovery", (req: Request, res: Response) => {
  usersController.accountRecovery(req, res);
});

app.get("/account", (req: Request, res: Response) => {
  usersController.account(req, res);
});






