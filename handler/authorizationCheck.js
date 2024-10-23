const authorizationCheck = (handlerCfg) => (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res
                .status(401)
                .json({ message: 'Empty authorization token' });
        }

        const { mainDbGetter } = handlerCfg;

        const { users } = mainDbGetter();

        if (users.find((user) => user.token === authorization)) {
            return next();
        }

        return res.status(403).json({ message: 'User not found' });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
};

module.exports = authorizationCheck;
