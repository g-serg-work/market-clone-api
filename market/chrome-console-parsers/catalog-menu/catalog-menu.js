Array.from(
    document.querySelectorAll(
        '[data-zone-name="catalog-content"]' +
            ' li[data-zone-name="category-link"] a',
    ),
).map((el) => {
    // href = https://market.yandex.ru/special/fashion_dep
    const id = el.href
        .replace('https://market.yandex.ru', '')
        .replace('special', 'catalog')
        .replace('_', '-')
        .replace('/catalog--', '')
        .replace('/catalog/', '')
        .split('/')
        .shift();

    const title = el.querySelector('span')?.textContent.trim();

    // src = https://avatars.mds.yandex.net/get-marketcms/1357599/img-b02c68fb-e35d-487a-a11a-c6e0d0f9e632.svg/svg
    const img = el
        .querySelector('img')
        .src.replace('https://avatars.mds.yandex.net/get-marketcms/', '');

    return { id, title, img };
});
