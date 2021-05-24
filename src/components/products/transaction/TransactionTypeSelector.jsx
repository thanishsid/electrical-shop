import React from 'react';

export default function TransactionTypeSelector({
    transactionType,
    handleSwitchTransactionType,
}) {
    return (
        <div className="flex mb-4 select-none">
            <label
                htmlFor="option-1"
                className={
                    transactionType === 'sale'
                        ? 'btn-transaction-type-active rounded-l-md'
                        : 'btn-transaction-type-inactive rounded-l-md'
                }
            >
                <input
                    type="radio"
                    name="type"
                    id="option-1"
                    value="sale"
                    checked={transactionType === 'sale'}
                    onChange={handleSwitchTransactionType}
                    className="appearance-none"
                />
                <span className="font-extrabold">Sale</span>
            </label>
            <label
                htmlFor="option-2"
                className={
                    transactionType === 'order'
                        ? 'btn-transaction-type-active rounded-r-md'
                        : 'btn-transaction-type-inactive rounded-r-md'
                }
            >
                <input
                    type="radio"
                    name="type"
                    id="option-2"
                    value="order"
                    checked={transactionType === 'order'}
                    onChange={handleSwitchTransactionType}
                    className="appearance-none"
                />
                <span className="font-extrabold">Order</span>
            </label>
        </div>
    );
}
