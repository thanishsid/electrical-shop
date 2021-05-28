export const isActive = (index, value) =>
    value === index ? 'sub-tab-icon-active' : 'sub-tab-icon-inactive';

export const roundToTwo = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
};

const preventMinus = (e) => {
    if (e.code === 'Minus') {
        e.preventDefault();
    }
};

const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData('text'));

    if (pastedData < 0) {
        e.preventDefault();
    }
};

export const preventNegativeProps = {
    onPaste: preventPasteNegative,
    onKeyPress: preventMinus,
};

export class Product {
    constructor(
        productName,
        productQty,
        productCost,
        productWholesalePrice,
        productRetailPrice
    ) {
        this.prdName = productName.trim();
        this.prdQty = productQty;
        this.prdCost = productCost;
        this.prdWhPrice = productWholesalePrice;
        this.prdRePrice = productRetailPrice;
    }
}
