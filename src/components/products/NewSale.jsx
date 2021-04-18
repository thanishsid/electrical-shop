import React from 'react';
import { useCart } from '../../store';

const NewSale = ({ item }) => {
    // const [qty, setQty] = useState(1);

    const changeQuantity = useCart((state) => state.changeQuantity);

    return (
        <div>
            {item && (
                <>
                    <h3 key={item.prdName}>
                        {`Name: ${item.prdName} | Cost: ${item.prdCost} | Wholesale Price: ${item.prdWhPrice} | Retail Price: ${item.prdRePrice} | Qty: ${item.prdQty}`}
                    </h3>
                    <i>
                        <button
                            onClick={() => changeQuantity(item, 'inc')}
                            type="button"
                        >
                            Add
                        </button>
                        <button
                            onClick={() => changeQuantity(item, 'dec')}
                            type="button"
                        >
                            Remove
                        </button>
                    </i>
                </>
            )}
        </div>
    );
};

export default NewSale;
