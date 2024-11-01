const parseProduct = (cfg, product) => {
    const { id, images } = product;
    const { avatarsBaseUrl } = cfg;

    return {
        ...product,
        images: images.map((img) => `${avatarsBaseUrl}/get-mpic/${img}`),
        // img: `${avatarsBaseUrl}/get-mpic${img}`,
        href: `/product/${id}`,
    };
};

module.exports = parseProduct;
