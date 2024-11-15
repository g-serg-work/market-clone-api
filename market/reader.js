const fs = require('fs');

const _marketDataParse = (dir, idx, names, keys, data, result) => {
    const name = names[idx];
    const key = keys[idx];
    const subItemsName = `${name}SubItems`;

    if (!result[name]) result[name] = [];
    if (!result[subItemsName]) result[subItemsName] = [];

    const path = `${dir}/${name}.json`;

    if (!fs.existsSync(path)) return;

    const jsonPath = fs.readFileSync(path, 'UTF-8');

    JSON.parse(jsonPath).forEach((row) => {
        const { subItems = [], ...rowRest } = row;
        result[name].push({ ...data, ...rowRest });

        for (const subItem of subItems) {
            result[subItemsName].push({ [key]: row.id, ...subItem });
        }

        const subDir = `${dir}/${row.id}`;

        if (fs.existsSync(subDir)) {
            _marketDataParse(
                subDir,
                idx + 1,
                names,
                keys,
                { [key]: row.id, ...data },
                result,
            );
        }
    });
};

const marketDataParse = (dir) => {
    const names = [
        ['catalogs', 'categories', 'products'],
        ['catalogs', 'page'],
    ];
    const keys = [
        ['catalogId', 'categoryId', 'productId'],
        ['catalogId', 'pageId'],
    ];

    // eslint-disable-next-line prefer-const
    let result = {};
    for (const idx of names.keys()) {
        _marketDataParse(dir, 0, names[idx], keys[idx], {}, result);
    }

    return result;
};

module.exports = marketDataParse;
