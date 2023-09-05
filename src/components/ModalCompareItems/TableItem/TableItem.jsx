import React, {useEffect, useRef} from 'react';
import button from "bootstrap/js/src/button";
import {FaShoppingBasket} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import {useSelector, useDispatch} from "react-redux";
import {addItem, removeFromCompare} from "../../ProductCard/ProductCardSlice";
import ProductActions from "../../ProductActions/ProductActions";
import useAddToCart from "../../../services/Hooks/useAddToCart";
import useMyCart from "../../../services/Hooks/useMyCart";

const TableItem = (props) => {
    const productsCompare = useSelector((state) => state.productCard.compareList);
    const [myCart] = useMyCart()
    const dispatch = useDispatch();
    const handleAddItem = (product) => {
        let productWithQuantity = {...product, quantity: 1};
        dispatch(addItem(productWithQuantity));
    }
    const handleRemoveItem = (product) => {
        dispatch(removeFromCompare(product.id));
        if (productsCompare.length === 1) {
            props.setModalShow(false);
        }

    }
    return (
        <>
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <td colSpan="4">
                        <b>Product Details</b>
                    </td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style={{width: "20%"}}><b>Product</b></td>
                    {productsCompare?.map(product => (
                        <td key={product.id}>{product.name}</td>
                    ))}
                </tr>

                <tr>
                    <td><b>Image</b></td>
                    {productsCompare?.map(product => (
                        <td key={product.id} className="text-center">
                            <img className="img-thumbnail"
                                 alt="img"
                                 src={product.image}/>
                        </td>
                    ))}
                </tr>
                <tr>
                    <td><b>Product Price</b></td>
                    {productsCompare?.map(product => (
                        <td key={product.id}>
                            <span>{product.currentPrice}</span>
                            <del>{product.originalPrice}</del>
                        </td>
                    ))}
                </tr>
                <tr>
                    <td><b>Brand</b></td>
                    {productsCompare?.map(product => (
                        <td key={product.id}>{product.brand}</td>
                    ))}
                </tr>
                <tr>
                    <td><b>Availability</b></td>
                    {productsCompare?.map(product => (
                        <td key={product.id}>{product.availability}</td>
                    ))}
                </tr>
                <tr>
                    <td><b>Rating</b></td>
                    {productsCompare?.map(product => (
                        <td key={product.id}>{product.rating}</td>
                    ))}
                </tr>
                <tr>
                    <td>

                    </td>
                    {productsCompare?.map(product => {
                        const cartItem = myCart.find(item => item.id === product.id);
                        return (
                            <td key={product.id}>
                                {
                                    cartItem ?
                                        <ProductActions quantity={cartItem.quantity} item={cartItem}/>
                                        :
                                        <button className="product-add mb-2" onClick={() => handleAddItem(product)}>
                                            <span><FaShoppingBasket/></span><span>Add</span>
                                        </button>
                                }
                                <button className="product-remove" onClick={() => handleRemoveItem(product)}>
                                    <span><AiFillDelete/></span><span>Remove</span>
                                </button>
                            </td>
                        );
                    })}


                </tr>
                </tbody>
            </table>
        </>
    );
};

export default TableItem;