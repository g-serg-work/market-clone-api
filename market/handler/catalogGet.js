const parseCatalogBanner = require('../../util/market/parseCatalogBanner');
const parseCategory = require('../../util/market/parseCategory');

const catalogGet = (handlerCfg) => (req, res) => {
    try {
        const { cfg, marketDb } = handlerCfg;

        const { catalogId } = req.params;

        const { page: pages, products } = marketDb;

        const catalog = pages.find(
            (catalog) => catalog.catalogId === catalogId,
        );

        if (!catalog)
            return res.status(404).json({ message: 'Catalog not found' });

        const apply = {
            banners: (catalog.banners || []).map((banner) =>
                parseCatalogBanner(cfg, banner, products),
            ),
            categories: catalog.categories
                .map((category) => parseCategory(cfg, category))
                .map(({ catalogId, ...rest }) => rest),
        };

        return res.json({ ...catalog, ...apply });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
};

module.exports = catalogGet;
