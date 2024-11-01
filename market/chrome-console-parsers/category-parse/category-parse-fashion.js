Array.from(
    document.querySelectorAll(
        '[data-apiary-widget-id$="RootCustomFormulas/content/content"]' +
            ' [data-apiary-widget-name="@promo/FormulaSnippet"]' +
            ' a[href*="catalog"]',
    ),
).map((el) => {
    return {
        //https://market.yandex.ru/catalog--tovary-dlia-shkoly-i-obucheniia/59887/list?hid=10790728'
        id: el.href
            .replace('https://market.yandex.ru/catalog/', '')
            .split('/')[0],

        //https://avatars.mds.yandex.net/get-marketcms/47564…86066e44-f154-47ad-8f6b-9e25cde85784.png/optimize
        img: el
            .querySelector('img')
            .src.replace('//avatars.mds.yandex.net/get-marketcms/', '')
            .replace('https:', ''),
    };
});
