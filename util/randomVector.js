const randomVector = (needNumber, rangeTo, rangeFrom = 0) => {
    if (rangeTo === rangeFrom)
        throw new Error(`Not valid range: [${rangeFrom}, ${rangeTo}]`);

    if (needNumber > rangeTo - rangeFrom)
        throw new Error(
            `Not valid range: ${needNumber} more that [${rangeFrom}, ${rangeTo}]`,
        );

    return Array(rangeTo - rangeFrom)
        .fill()
        .map((_, index) => index)
        .toSorted(() => Math.random() - 0.5)
        .slice(0, needNumber);
};

module.exports = randomVector;
