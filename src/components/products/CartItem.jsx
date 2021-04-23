import React from 'react';
import Repeatable from 'react-repeatable';
import { useCart } from '../../store';
import PriceSelector from '../common/PriceSelector';
import { roundToTwo } from '../../functions/generalFunctions';

const CartItem = ({ item }) => {
    const changeQuantity = useCart((state) => state.changeQuantity);

    const changeSalePrice = useCart((state) => state.changeSalePrice);

    const removeItem = useCart((state) => state.removeItem);

    return (
        <tr className="cartTableRow">
            {item && (
                <>
                    <td className="cartTableCell">{item.prdName}</td>
                    <td className="cartTableCell">
                        <div className="priceGrp">
                            <Repeatable
                                tag="button"
                                type="button"
                                onHold={() => changeQuantity(item, 'dec')}
                                onPress={() => changeQuantity(item, 'dec')}
                            >
                                -
                            </Repeatable>
                            <p className="qty">{item.prdQty}</p>
                            <Repeatable
                                tag="button"
                                type="button"
                                onHold={() => changeQuantity(item, 'inc')}
                                onPress={() => changeQuantity(item, 'inc')}
                            >
                                +
                            </Repeatable>
                        </div>
                    </td>

                    <td className="cartTableCell">
                        <PriceSelector
                            item={item}
                            custPriceChange={changeSalePrice}
                        />
                    </td>
                    <td className="cartTableCell">{`${item.prdQty} x ${item.salePrice}`}</td>
                    <td className="cartTableCell">
                        {roundToTwo(item.prdQty * item.salePrice)}
                    </td>
                    <td className="cartTableCell">
                        <button
                            className="removeItem"
                            onClick={() => removeItem(item)}
                            type="button"
                        >
                            X
                        </button>
                    </td>
                </>
            )}
        </tr>
    );
};

export default CartItem;
