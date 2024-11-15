const cssRandomColor = (letters = '0123456789ABCDEF') => {
    return `#${Array(6)
        .fill(0)
        .map(() => letters[Math.floor(Math.random() * letters.length)])
        .join('')}`;
};

module.exports = cssRandomColor;
