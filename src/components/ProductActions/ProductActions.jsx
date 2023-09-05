import React, {useState} from 'react';
import {CgMathMinus} from 'react-icons/cg';
import {TbPlus} from 'react-icons/tb';
import './ProductActions.scss';
import {useDispatch} from 'react-redux';
import {addItem, removeItem} from '../ProductCard/ProductCardSlice';

const ProductActions = ({quantity, handleRemoveItem, handleAddItem, item = []}) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handlePlus = async () => {
        setIsLoading(true);

        if (Object.keys(item).length !== 0) {
            dispatch(addItem(item)); // Dispatch the addItem Redux action
        } else {
            await handleAddItem();
        }

        setIsLoading(false);
    };

    const handleMinus = async () => {
        setIsLoading(true);

        if (Object.keys(item).length !== 0) {
            dispatch(removeItem(item.id)); // Dispatch the removeItem Redux action
        } else {
            await handleRemoveItem();
        }

        setIsLoading(false);
    };

    return (
        <div className="product-action mb-2">
            <button className="action-minus" disabled={quantity === 1 || isLoading} onClick={handleMinus}>
        <span>
          <CgMathMinus/>
        </span>
            </button>
            <input className="action-input" type="text" value={quantity} readOnly/>
            <button className="action-plus" disabled={isLoading} onClick={handlePlus}>
        <span>
          <TbPlus/>
        </span>
            </button>
        </div>
    );
};

export default ProductActions;
