const parseCategory = (cfg, category) => {
    const { id, img } = category;
    const { avatarsBaseUrl } = cfg;

    return {
        ...category,
        img: `${avatarsBaseUrl}/get-marketcms/${img}`,
        href: `/category/${id}`,
    };
};

module.exports = parseCategory;
