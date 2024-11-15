const prepareData = (data) => {
    const { products } = data;

    prepareProducts(products);
};

module.exports = prepareData;

// functions
function prepareProducts(products) {
    for (let i = 0; i < products.length; i++) {
        const rand = Math.random();
        const sale = randomSale();
        const discount = randomDiscount();
        const chefBank = randomChefBank();

        products[i].cost = {
            value: Math.trunc(10000 * rand),
            ...(sale ? { sale } : {}),
            ...(discount ? { discount } : {}),
            ...(chefBank ? { chefBank } : {}),
        };
    }
}

function randomSale() {
    const rand = Math.random();
    return rand > 0.4
        ? {
              percent: Math.trunc(90 * rand),
          }
        : undefined;
}

function randomDiscount() {
    const rand = Math.random();
    return rand > 0.3
        ? {
              percent: Math.trunc(50 * rand),
              forYou: rand > 0.6,
              isSuperPrice: Math.random() > 0.8,
          }
        : undefined;
}

function randomChefBank() {
    const rand = Math.random();
    return rand > 0.1
        ? {
              name: rand > 0.6 ? 'alfa' : 'ya-pay',
              percent: Math.trunc(25 * rand),
          }
        : undefined;
}
