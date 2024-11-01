Array.from(
    document.querySelectorAll(
        '[data-apiary-widget-name="@marketfront/SerpEntity"]' +
            ' [data-apiary-widget-name="@light/Organic"]',
    ),
).map((el) => {
    // href="/product--kukla-pups-22-sm/42481035?hid=9040...
    let id = el
        .querySelector('div[data-cs-name="navigate"] a')
        .href.replace('https://market.yandex.ru/product--', '')
        .split('/')
        .shift();

    const brandTitle = el
        .querySelector(
            'div[data-cs-name="navigate"] a [data-auto="snippet-brand-title"]',
        )
        ?.textContent.trim();

    const title = el
        .querySelector(
            'div[data-cs-name="navigate"] a [data-auto="snippet-title"]',
        )
        ?.textContent.trim();

    let galleryImageInfo = el.querySelector(
        '[id$="/content/gallery"] noframes',
    );

    if (galleryImageInfo) {
        let data = JSON.parse(galleryImageInfo.innerText).widgets;
        data = data[Object.keys(data)[0]];
        data = data[Object.keys(data)[0]];
        dataImages = data.images;
    } else {
        let img = el.querySelector('[id$="/content/gallery"] img');
        dataImages = [{ src: img.src }];
    }

    // gallery
    let images = dataImages.map((img) =>
        img.src
            .replace('//avatars.mds.yandex.net/get-mpic/', '')
            .replace('https:', '')
            .replace('/orig', ''),
    );

    return { id, ...(brandTitle && { brandTitle }), title, images };
});
