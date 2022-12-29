"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const ItemsController_1 = require("./controllers/ItemsController");
const usersController_1 = require("./controllers/usersController");
const express_session_1 = __importDefault(require("express-session"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + '../.env' });
const app = (0, express_1.default)();
const itemsController = new ItemsController_1.ItemsController();
const usersController = new usersController_1.UsersController();
//
const AccessControl = require("express-ip-access-control");
let options = {
    mode: 'deny',
    denys: [''],
    allows: [],
    forceConnectionAddress: false,
    log: function (clientIp, access) {
        console.log(clientIp + (access ? ' accessed.' : ' denied.'));
    },
    statusCode: 401,
    redirectTo: '',
    message: 'Sorry, but YOU HAVE BEEN BLOCKED'
};
let middleware = AccessControl(options); //не ошибка
app.use(AccessControl(options)); // не ошибка
;
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('trust proxy', true);
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
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
app.get("/", (req, res) => {
    itemsController.home(req, res);
});
app.get("/items", (req, res) => {
    itemsController.index(req, res);
});
// items
app.get("/items/show/:id", (req, res) => {
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
app.post("/items/find", (req, res) => {
    itemsController.find(req, res);
});
app.get("/category/:id", (req, res) => {
    itemsController.showCat(req, res);
});
app.post("/category/deleteCat", isAdmin, (req, res) => {
    itemsController.deleteCat(req, res);
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
app.get("/accountUpdade", (req, res) => {
    //usersController.account(req, res);
    res.redirect('/');
});
//post
app.post("/comments/store", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    usersController.store(req, res);
}));
app.post("/comments/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    usersController.delete(req, res);
}));
