import React, {useEffect} from 'react';
import {RiDeleteBin6Line} from "react-icons/ri";
import ProductActions from "../../ProductActions/ProductActions";
import {formatter} from "../../../services/Helpers/Number/Number";
import useAddToCart from "../../../services/Hooks/useAddToCart";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {deleteItem} from "../../ProductCard/ProductCardSlice";
import {asset} from "../../../services/Helpers/Image/image";
import Swal from "sweetalert2";

const CartItem = ({item}) => {
    const {id, name, slug, thumb_image, offer_price, isLike, quantity} = item;

    const dispatch = useDispatch();
    const {
        addItemToCart,
        removeItemFromCart,
    } = useAddToCart({id, name, slug, thumb_image, offer_price, isLike, quantity});

    const handleDeleteItem = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Remove product from cart !!!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteItem(id))
                Swal.fire(
                    'Deleted!',
                    'Product has been removed.',
                    'success'
                )
            }
        })

    }

    const checkQuantity = () => {
        if (quantity <= 0) {
            dispatch(deleteItem(id))
        }
    }
    useEffect(() => {
        checkQuantity()
    }, [quantity]);

    return (
        <li className="cart-item">
            <div className="cart-media">
                <a href="#"><img
                    src={asset(thumb_image)}
                    alt="img"/></a>
                <button className="cart-delete" onClick={handleDeleteItem}>
                    <span><RiDeleteBin6Line/></span></button>
            </div>
            <div className="cart-info-group">
                <div className="cart-info">
                    <h6><a href="#">{name}</a></h6>
                    <p>Unit Price - ${offer_price}</p>
                </div>
                <div className="cart-action-group">
                    <ProductActions quantity={quantity} handleAddItem={addItemToCart}
                                    handleRemoveItem={removeItemFromCart}/>
                    <h6>{formatter.format(quantity * +offer_price)}</h6>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
