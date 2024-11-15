Array.from(
    document.querySelectorAll(
        '[data-auto="category"]', // + ' li[data-zone-name="category-link"] a',
    ),
).map((el) => {
    const headingEl = el.querySelector('[role="heading"] a');

    // href = https://market.yandex.ru/catalog--advent-kalendari/28512310
    const id = headingEl.href
        .replace('https://market.yandex.ru/catalog--', '')
        .split('/')
        .shift();

    const title = headingEl.textContent;

    const subItems = Array.from(
        el.querySelectorAll('[data-auto="category"] ul li a'),
    ).map((el) => {
        // href = https://market.yandex.ru/catalog--sanki-i-aksessuary/40159730/list?hid=13488213
        return {
            id: el.href
                .replace('https://market.yandex.ru/catalog--', '')
                .split('/')
                .shift(),
            title: el.textContent,
        };
    });

    return { id, title, subItems };
});
