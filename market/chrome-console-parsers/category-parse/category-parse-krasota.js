Array.from(
    document.querySelectorAll(
        '[data-apiary-widget-name="@MarketNode/NewCategorySnippet"] a',
    ),
).map((el) => {
    return {
        //https://market.yandex.ru/catalog--tovary-dlia-shkoly-i-obucheniia/59887/list?hid=10790728'
        id: el.href
            .replace('https://market.yandex.ru/catalog--', '')
            .split('/')[0],

        //https://avatars.mds.yandex.net/get-marketcms/47564…86066e44-f154-47ad-8f6b-9e25cde85784.png/optimize
        img: el
            .querySelector('div[style*="background-image"]')
            .style.backgroundImage.replace(
                'url("//avatars.mds.yandex.net/get-marketcms/',
                '',
            )
            .replace('https:', '')
            .replace('")', ''),
    };
});
