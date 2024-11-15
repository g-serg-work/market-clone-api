const parseProduct = (cfg, product, productCfg = {}) => {
    // cfg
    const { avatarsBaseUrl } = cfg;
    const { costCfg = {} } = productCfg;
    const { skipSale, skipDiscountForYou } = costCfg;
    // data
    const { id, images, cost = {}, ...productRest } = product;
    const { sale, discount = {}, ...costRest } = cost;
    const { forYou, ...discountRest } = discount;

    const costRow = {
        ...costRest,
        ...(skipSale ? {} : { sale }),
        ...(discountRest.percent
            ? {
                  discount: {
                      ...discountRest,
                      ...(skipDiscountForYou ? {} : { forYou }),
                  },
              }
            : {}),
    };

    return {
        id,
        ...productRest,
        images: images.map((img) => `${avatarsBaseUrl}/get-mpic/${img}`),
        href: `/product/${id}`,
        cost: costRow,
    };
};

module.exports = parseProduct;
