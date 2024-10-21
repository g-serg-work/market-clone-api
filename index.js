const fs = require("fs");
const jsonServer = require("json-server");
const path = require("path");
const http = require("http");

// custom
const marketDataParse = require("./market/reader.js");
const cfg = require("./market/cfg.json");
const loginPost = require("./handler/login");
const profileGet = require("./handler/profileGet");
const catalogGet = require("./market/handler/catalogGet");
const favoriteCategoryGet = require("./market/handler/favoriteCategoryGet");
const ordersByUserGet = require("./market/handler/ordersByUserGet");
//

const dir = path.resolve(__dirname, "./market/data");
const marketDb = marketDataParse(dir);

const mainDbPath = path.resolve(__dirname, "db.json");
const mainDbGetter = () => JSON.parse(fs.readFileSync(mainDbPath, "UTF-8"));

const handlerCfg = { cfg, mainDbGetter, marketDb };

const server = jsonServer.create();
const jsonDbRouter = jsonServer.router(mainDbPath);

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

const badRequest = (req, res) =>
    res.status(400).json({ message: "Bad Request" });

// routes
server.post("/login", loginPost(handlerCfg));
server.get("/catalog/:catalogId", catalogGet(handlerCfg));

server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: "AUTH ERROR" });
    }

    next();
});

server.get("/favorite-category/:userId", favoriteCategoryGet(handlerCfg));
server.get("/orders/:userId", ordersByUserGet(handlerCfg));
server.get("/profiles/:userId", profileGet(handlerCfg));

server.get("*", badRequest);
server.post("*", badRequest);

server.use(jsonDbRouter);

// run server
const HTTP_PORT = 8000;

const httpServer = http.createServer(server);

httpServer.listen(HTTP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`server is running on ${HTTP_PORT} port`);
});
