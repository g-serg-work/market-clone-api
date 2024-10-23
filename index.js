const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const http = require('http');

// custom
const marketDataParse = require('./market/reader.js');
const cfg = require('./market/cfg.json');
const loginPost = require('./handler/login');
const profileGet = require('./handler/profileGet');
const catalogGet = require('./market/handler/catalogGet');
const favoriteCategoryGet = require('./market/handler/favoriteCategoryByUserGet.js');
const ordersByUserGet = require('./market/handler/ordersByUserGet');
const authorizationCheck = require('./handler/authorizationCheck');
//

const dir = path.resolve(__dirname, './market/data');
const marketDb = marketDataParse(dir);

const mainDbPath = path.resolve(__dirname, 'db.json');
const mainDbGetter = () => JSON.parse(fs.readFileSync(mainDbPath, 'UTF-8'));

const handlerCfg = { cfg, mainDbGetter, marketDb };

const server = jsonServer.create();

// disable data update
// const jsonDbRouter = jsonServer.router(mainDbPath);
// server.use(jsonDbRouter);

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

const badRequest = (_, res) => res.status(400).json({ message: 'Bad Request' });

// free
server.get('/catalog/:catalogId', catalogGet(handlerCfg));
// private
server.post('/login', loginPost(handlerCfg));
server.get('/profile', authorizationCheck(handlerCfg), profileGet(handlerCfg));
server.get(
    '/favorite-category',
    authorizationCheck(handlerCfg),
    favoriteCategoryGet(handlerCfg),
);
server.get(
    '/orders',
    authorizationCheck(handlerCfg),
    ordersByUserGet(handlerCfg),
);
//not found
server.use('*', badRequest);

// run server
const HTTP_PORT = 8000;

const httpServer = http.createServer(server);

httpServer.listen(HTTP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`server is running on ${HTTP_PORT} port`);
});
