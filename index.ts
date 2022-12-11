import express, { Express, Request, Response } from 'express';
import path from 'path';
import { ItemsController } from './controllers/ItemsController';
import { UsersController } from './controllers/usersController';
import session from 'express-session';
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
      role: string;
      description:string;
      avatar : string;
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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get("/",(req: Request, res: Response) => {
  res.render('home',{
    auth: req.session.auth,
     username: req.session.username,
     avatar: req.session.avatar
  });
 
});

app.get("/items", (req: Request, res: Response) => {
  itemsController.index(req, res);
});

app.get("/items/:id", (req: Request, res: Response) => {
  itemsController.show(req, res);
});

app.get("/items/action/create",isAuth, (req: Request, res: Response) => {
  itemsController.create(req, res);
});

app.post("/store", (req: Request, res: Response) => {
  itemsController.store(req, res);
});

app.post("/update", (req: Request, res: Response) => {
  itemsController.update(req, res);
});

app.post("/delete", (req: Request, res: Response) => {
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

app.get("/account",isAuth, (req: Request, res: Response) => {
  usersController.account(req, res);
});








