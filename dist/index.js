"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const ItemsController_1 = require("./controllers/ItemsController");
const usersController_1 = require("./controllers/usersController");
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
const itemsController = new ItemsController_1.ItemsController();
const usersController = new usersController_1.UsersController();
;
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use((0, express_session_1.default)({ secret: "Secret", resave: false, saveUninitialized: true }));
function isAuth(req, res, next) {
    if (req.session.auth) {
        next();
    }
    else {
        res.redirect('/');
    }
}
function isAdmin(req, res, next) {
    if (req.session.auth && req.session.role == 1) {
        next();
    }
    else {
        res.redirect('/');
        console.log('not admin');
    }
}
function border(req, res, next) {
    //dont access
    res.redirect('/');
}
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.get("/", (req, res) => {
    itemsController.home(req, res);
});
app.get("/items", (req, res) => {
    itemsController.index(req, res);
});
// items
app.get("/items/:id", (req, res) => {
    itemsController.show(req, res);
});
app.get("/items/create", isAdmin, (req, res) => {
    itemsController.create(req, res);
});
app.post("/items/store", isAdmin, (req, res) => {
    itemsController.store(req, res);
});
app.post("/items/update", isAdmin, (req, res) => {
    itemsController.update(req, res);
});
app.post("/items/delete", isAdmin, (req, res) => {
    itemsController.delete(req, res);
});
app.get("/category/:id", (req, res) => {
    itemsController.showCat(req, res);
});
//users
app.get("/auth", (req, res) => {
    usersController.auth(req, res);
});
app.post("/login", (req, res) => {
    usersController.login(req, res);
});
app.get("/logout", isAuth, (req, res) => {
    usersController.logout(req, res);
});
app.post("/register", (req, res) => {
    usersController.register(req, res);
});
app.get("/accountRecovery", (req, res) => {
    usersController.accountRecovery(req, res);
});
app.get("/account", isAuth, (req, res) => {
    usersController.account(req, res);
});
