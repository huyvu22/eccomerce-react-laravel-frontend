import React, {useState} from 'react';
import SingleBanner from "../../components/SingleBanner/SingleBanner";
import {addItem, deleteItem, unWishItem} from "../../components/ProductCard/ProductCardSlice";
import {RiDeleteBin6Line} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import './WishList.scss';
import {asset} from "../../services/Helpers/Image/image";
import ProductActions from "../../components/ProductActions/ProductActions";
import button from "bootstrap/js/src/button";
import useMyCart from "../../services/Hooks/useMyCart";

const WishList = () => {
    const favoriteItems = useSelector((state) => state.productCard.wishList);
    const [myCart] = useMyCart()
    const dispatch = useDispatch();

    const handleAddItem = (product) => {
        let productWithQuantity = {...product, quantity: 1};
        dispatch(addItem(productWithQuantity));
    }

    return (
        <>
            <SingleBanner name="Wishlist"/>
            <section className="wishlist-part">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="account-card">
                                <div className="account-content">
                                    <div className="table-wrapper">
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>Serial</th>
                                                <th>Product</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>stock</th>
                                                <th>shopping</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                favoriteItems?.length ?
                                                    favoriteItems.map((item, index) => {
                                                        const cartItem = myCart.find(product => item.id === product.id);
                                                        return (
                                                            <tr key={item.id}>
                                                                <td>{index + 1}</td>
                                                                <td width="30%"><img
                                                                    src={asset(item.thumb_image)}
                                                                    alt="img"/></td>
                                                                <td><a href="">{item.name}</a></td>
                                                                <td>{item.offer_price}</td>
                                                                <td className="text-danger">{item.availability}</td>
                                                                <td width="17%">
                                                                    {
                                                                        cartItem ?
                                                                            <ProductActions quantity={cartItem.quantity} item={cartItem}/>
                                                                            :
                                                                            <button className="product-add mb-2" onClick={() => handleAddItem(item)}>
                                                                                <span>Add To Cart</span>
                                                                            </button>
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <span className='btn-remove' onClick={() => dispatch(unWishItem(item.id))}><RiDeleteBin6Line/></span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    <span></span>
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WishList;