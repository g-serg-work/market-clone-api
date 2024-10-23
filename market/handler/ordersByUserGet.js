const parseOrder = require('../../util/parseOrder');

const ordersByUserGet = (handlerCfg) => (req, res) => {
    try {
        const { cfg, mainDbGetter } = handlerCfg;

        const { authorization } = req.headers;

        const { users, orders: dbOrders } = mainDbGetter();

        const { userId } = users.find((user) => user.token === authorization);

        const orders = dbOrders
            .filter((order) => order.userId === userId)
            .map((order) => parseOrder(cfg, order));

        return res.json(orders);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
};

module.exports = ordersByUserGet;
