const loginPost = (handlerCfg) => (req, res) => {
    try {
        const { mainDbGetter } = handlerCfg;

        const { userName } = req.body;

        const { users, profiles } = mainDbGetter();

        const user = users.find((user) => user.userName === userName);

        if (user) {
            const profile = profiles.find(
                (profile) => profile.userId === user.userId,
            );
            if (profile) {
                const { userId, ...rest } = profile;
                return res.json({ token: user.token, ...rest });
            }
        }

        return res.status(403).json({ message: 'User not found' });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
};

module.exports = loginPost;
