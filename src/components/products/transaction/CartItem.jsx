import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import Repeatable from 'react-repeatable';
import { useCart } from '../../../stores/store';
import PriceSelector from './PriceSelector';
import { roundToTwo } from '../../../functions/generalFunctions';

const CartItem = ({ item, transactionType }) => {
    const [saleType, setSaleType] = React.useState('retail');
    const changeQuantity = useCart((state) => state.changeQuantity);
    const changeSalePrice = useCart((state) => state.changeSalePrice);
    const removeItem = useCart((state) => state.removeItem);

    React.useEffect(() => {
        if (saleType === 'retail') {
            changeSalePrice(item, item.prdRePrice);
        } else if (saleType === 'wholesale') {
            changeSalePrice(item, item.prdWhPrice);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saleType]);

    const handleCustomSalePrice = (event) => {
        const customPrice = event.target.value || 0;
        changeSalePrice(item, customPrice);
    };

    const increaseQty = () => {
        changeQuantity(transactionType, item, 'dec');
    };
    const decreaseQty = () => {
        changeQuantity(transactionType, item, 'inc');
    };

    return (
        <tr className="border-2 border-gray-300">
            {item && (
                <>
                    <td className="bg-gray-100  p-2 text-center">
                        {item.prdName}
                    </td>
                    <td className="p-2 text-center">
                        <div className="flex items-center justify-center">
                            <Repeatable
                                tag="button"
                                type="button"
                                onHold={increaseQty}
                                onPress={increaseQty}
                                className="btn-cart-qty"
                            >
                                -
                            </Repeatable>
                            <p className="cart-qty-count">{item.prdQty}</p>
                            <Repeatable
                                tag="button"
                                type="button"
                                onHold={decreaseQty}
                                onPress={decreaseQty}
                                className="btn-cart-qty"
                            >
                                +
                            </Repeatable>
                        </div>
                    </td>

                    <td className="bg-gray-100 p-2 w-1/5 text-center">
                        <PriceSelector
                            saleType={saleType}
                            setSaleType={setSaleType}
                            handleCustomSalePrice={handleCustomSalePrice}
                        />
                    </td>
                    <td className="p-2 text-center">{`${item.prdQty} x ${item.salePrice}`}</td>
                    <td className="bg-gray-100 p-2 border-gray-300 text-center">
                        {roundToTwo(item.prdQty * item.salePrice)}
                    </td>
                    <td className="p-2 flex h-full justify-center items-center select-none">
                        <AiOutlineDelete
                            className=" transform hover:scale-125 hover:text-red-600 cursor-pointer"
                            size="1.5rem"
                            onClick={() => removeItem(item)}
                            type="button"
                        />
                    </td>
                </>
            )}
        </tr>
    );
};

export default CartItem;
