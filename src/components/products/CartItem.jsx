import React from 'react';
import styled from 'styled-components';
import Repeatable from 'react-repeatable';
import { useCart } from '../../stores/store';
import PriceSelector from '../common/PriceSelector';
import { roundToTwo } from '../../functions/generalFunctions';

const TableRow = styled.tr`
    display: table;
    width: 100%;
    table-layout: fixed;
`;

const PriceGroup = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TableCell = styled.td`
    padding: 0.3rem;
    border: solid 1px gray;
    background: rgb(255, 255, 255);
    text-align: center;
`;

const Quantity = styled.p`
    margin-left: 10%;
    margin-right: 10%;
`;

const RemoveButton = styled.button`
    color: rgb(168, 1, 1);
    border: none;
    background: white;
    transform: scale(1.5);
    font-weight: 700;
    &:hover {
        transform: scale(2);
        cursor: pointer;
    }
`;

const CartItem = ({ item }) => {
    const changeQuantity = useCart((state) => state.changeQuantity);
    const changeSalePrice = useCart((state) => state.changeSalePrice);
    const removeItem = useCart((state) => state.removeItem);

    return (
        <TableRow>
            {item && (
                <>
                    <TableCell>{item.prdName}</TableCell>
                    <TableCell>
                        <PriceGroup>
                            <Repeatable
                                tag="button"
                                type="button"
                                onHold={() => changeQuantity(item, 'dec')}
                                onPress={() => changeQuantity(item, 'dec')}
                            >
                                -
                            </Repeatable>
                            <Quantity>{item.prdQty}</Quantity>
                            <Repeatable
                                tag="button"
                                type="button"
                                onHold={() => changeQuantity(item, 'inc')}
                                onPress={() => changeQuantity(item, 'inc')}
                            >
                                +
                            </Repeatable>
                        </PriceGroup>
                    </TableCell>

                    <TableCell>
                        <PriceSelector
                            item={item}
                            custPriceChange={changeSalePrice}
                        />
                    </TableCell>
                    <TableCell>{`${item.prdQty} x ${item.salePrice}`}</TableCell>
                    <TableCell>
                        {roundToTwo(item.prdQty * item.salePrice)}
                    </TableCell>
                    <TableCell>
                        <RemoveButton
                            onClick={() => removeItem(item)}
                            type="button"
                        >
                            X
                        </RemoveButton>
                    </TableCell>
                </>
            )}
        </TableRow>
    );
};

export default CartItem;
