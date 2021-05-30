import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

const DeleteItems = ({ btnLabel, items, deleteFunction, updateFunction }) => {
    const handleDelete = () => {
        deleteFunction();
        updateFunction();
    };

    return (
        <div className="h-full flex flex-col px-4 pt-4">
            {items.length > 0 ? (
                <>
                    <div className="mb-4 rounded-lg h-full overflow-y-auto">
                        {items.map((row) => {
                            return (
                                // eslint-disable-next-line no-underscore-dangle
                                <h4 key={row._id}>{`${row._id} ${
                                    row.prdName || row.custName || row.time
                                }`}</h4>
                            );
                        })}
                    </div>
                    <button
                        type="button"
                        className="btn-delete"
                        onClick={handleDelete}
                    >
                        <AiOutlineDelete size="1.3rem" />
                        <span className="ml-2">{`${btnLabel}`}</span>
                    </button>
                </>
            ) : (
                <div className="h-full flex flex-col justify-center items-center">
                    <p className="font-bold text-gray-700 select-none">
                        No Items Selected
                    </p>
                </div>
            )}
        </div>
    );
};

export default DeleteItems;
