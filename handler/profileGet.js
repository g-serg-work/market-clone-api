const profileGet = (handlerCfg) => (req, res) => {
    try {
        const { mainDbGetter } = handlerCfg;

        const { userId } = req.params;

        const { profiles } = mainDbGetter();

        const profileRow = profiles.find((profile) => profile.id === userId);

        if (profileRow) return res.json(profileRow);

        return res.status(403).json({ message: "User not found" });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
};

module.exports = profileGet;
