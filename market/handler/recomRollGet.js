const cssRandomColor = require('../../util/cssRandomColor');
const parseCategory = require('../../util/market/parseCategory');
const parseProduct = require('../../util/market/parseProduct');
const randomVector = require('../../util/randomVector');

const recomRollGet = (handlerCfg) => (req, res) => {
    try {
        const {
            cfg,
            marketDb: { categories, products },
            mainDbGetter,
        } = handlerCfg;

        const { type, offset = 0 } = req.query;
        const { authorization } = req.headers;

        if (type === 'for_you') {
            const isAuthorized =
                authorization &&
                mainDbGetter().users.find(
                    (user) => user.token === authorization,
                );

            if (!isAuthorized)
                return res
                    .status(401)
                    .json({ message: 'Empty authorization token' });
        }

        const isSale = type === 'sale';

        const parseProductCfg = {
            costCfg: {
                skipSale: !isSale,
                skipDiscountForYou: type !== 'for_you',
            },
        };

        const snippetBlocks = parseSnippetBlocks(
            isSale,
            categories,
            products,
            cfg,
            parseProductCfg,
        );

        return res.json({
            hasNext: offset < 5,
            products: randomVector(16, products.length)
                .map((idx) => products[idx])
                .map((product) => parseProduct(cfg, product, parseProductCfg))
                .map(({ catalogId, categoryId, ...rest }) => rest),
            snippetBlocks,
        });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
};

// functions
function parseSnippetBlocks(
    isSale,
    categories,
    products,
    cfg,
    parseProductCfg,
) {
    const makeColor = () => (isSale ? '#F4F4F4' : cssRandomColor('ABCDEF'));
    const header = isSale ? 'По будничным ценам' : 'Рекомендуем вам';

    const categoriesWithProducts = new Set();
    products.forEach(({ categoryId }) => {
        categoriesWithProducts.add(categoryId);
    });

    const categoryIds = Array.from(categoriesWithProducts);

    return randomVector(2, categoryIds.length)
        .map((idx) => categoryIds[idx])
        .map((categoryId) =>
            categories.find((category) => category.id === categoryId),
        )
        .map((category) => {
            const { title, href } = parseCategory(cfg, category);

            const categoryProducts = products.filter(
                (product) => product.categoryId === category.id,
            );

            return {
                header,
                title,
                href,
                bgColor: makeColor(),
                products: randomVector(4, categoryProducts.length)
                    .map((idx) => categoryProducts[idx])
                    .map((product) =>
                        parseProduct(cfg, product, parseProductCfg),
                    )
                    .map(({ catalogId, categoryId, ...rest }) => rest),
            };
        });
}

module.exports = recomRollGet;
