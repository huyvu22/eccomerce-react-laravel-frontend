import React from 'react';
import button from "bootstrap/js/src/button";
import {FaShoppingBasket} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import {useSelector, useDispatch} from "react-redux";
import {BsFillStarFill} from "react-icons/bs";
import {addItem, removeFromCompare} from "../../../ProductCard/ProductCardSlice";
import ProductActions from "../../../ProductActions/ProductActions";
import useMyCart from "../../../../services/Hooks/useMyCart";
import {asset} from "../../../../services/Helpers/Image/image";

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
            <table className="table table-bordered table-hover text-center">
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
                                 src={asset(product.thumb_image)}
                                 width={50}
                                 height={50}
                            />
                        </td>
                    ))}
                </tr>
                <tr>
                    <td><b>Price</b></td>
                    {productsCompare?.map(product => (
                        <td key={product.id}>
                            <span className="m-2"><b>${product.offer_price}</b></span>
                            <del>${product.price}</del>
                        </td>
                    ))}
                </tr>
                <tr>
                    <td><b>Rating</b></td>
                    {productsCompare?.map(product => (
                        <td key={product.id}>
                            {/*{product.rating}*/}
                            {[...Array(5)].map((star, index) => {
                                index += 1;
                                return (
                                    <span
                                        key={index}
                                        className={(index <= product.rating ? "on" : "off")}
                                    ><BsFillStarFill/>
                                    </span>
                                );
                            })}
                        </td>
                    ))}
                </tr>
                <tr>
                    <td>
                        <b>Action</b>
                    </td>
                    {productsCompare?.map(product => {
                        const cartItem = myCart.find(item => item.id === product.id);
                        return (
                            <td key={product.id} className="action-td">
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