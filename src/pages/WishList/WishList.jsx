import './WishList.scss';
import React, {useEffect, useState} from 'react';
import SingleBanner from "../../components/SingleBanner/SingleBanner";
import {addItem, unWishItem} from "../../components/ProductCard/ProductCardSlice";
import {RiDeleteBin6Line} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import {asset} from "../../services/Helpers/Image/image";
import ProductActions from "../../components/ProductActions/ProductActions";
import button from "bootstrap/js/src/button";
import useMyCart from "../../services/Hooks/useMyCart";
import useClient from "../../services/Hooks/useClient";
import {getCookie} from "../../utils/dataHandler";
import {showToast} from "../../components/Toast/Toast";
import {Link, useNavigate} from "react-router-dom";
import {formatter} from "../../services/Helpers/Number/Number";
import EditQuantity from "../../components/Modal/EditQuantity/EditQuantity";

const WishList = () => {
    const client = useClient();
    const userToken = getCookie('user_access_token') || getCookie('seller_access_token');
    const favoriteItems = useSelector((state) => state.productCard.wishList);
    const [wishList, setWishList] = useState(favoriteItems);
    const [loading, setLoading] = useState(false)
    const [modalEditQuantity, setModalEditQuantity] = useState(false);
    const [itemEditQty, setItemEditQty] = useState(false);
    const [myCart] = useMyCart()
    const dispatch = useDispatch();

    useEffect(() => {
        const elementToScroll = document.querySelector(".single-banner");
        elementToScroll.scrollIntoView({behavior: "smooth", block: "start"});
    }, []);

    const handleAddItem = (product) => {
        let productWithQuantity = {...product, quantity: 1};
        dispatch(addItem(productWithQuantity));
    }
    const getWishList = async () => {
        setLoading(true)
        const res = await client.get('wishlist', '', userToken);
        if (res.response.ok === true) {
            const dataObj = await res.data;
            setWishList(dataObj.data)
            setLoading(false)
        }
    }

    useEffect(() => {
        getWishList()
    }, [favoriteItems]);

    const handleRemoveItem = async (item) => {
        dispatch(unWishItem(item.id))
        const res = await client.delete(`wishlist/${item.product_id}`, '', userToken)
        if (res.response.ok === true) {
            const data = await res.data;
            if (data.status === 'success') {
                getWishList()
                showToast(item.thumb_image, `${item.name} removed from Wishlist!`, false);
            }
        }
    }

    return (
        <>
            <SingleBanner name="Wishlist"/>
            <section className="wishlist-part">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {loading ? (
                                <div className="loading">
                                    <h3>Loading...</h3>
                                </div>
                            ) : (
                                <div className="account-card">
                                    <div className="account-content">
                                        <div className="table-wrapper">
                                            <table>
                                                <thead>
                                                <tr>
                                                    <th>No.</th>
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
                                                    wishList?.length ?
                                                        wishList.map((item, index) => {
                                                            const cartItem = myCart?.find(product => item.name === product.name);
                                                            return (
                                                                <tr key={item.id}>
                                                                    <td>{index + 1}</td>
                                                                    <td width="15%"><img
                                                                        src={asset(item.thumb_image)}
                                                                        alt="img"/></td>
                                                                    <td><Link to={`/item/item_details/${item.id}/${item.slug}`}>{item.name}</Link></td>
                                                                    <td>{formatter.format(item.offer_price)}</td>
                                                                    <td>{item.stock}</td>
                                                                    <td width="17%">
                                                                        {
                                                                            cartItem
                                                                                ?
                                                                                <ProductActions quantity={cartItem.quantity} item={cartItem}/>
                                                                                :
                                                                                <button className="product-add-wishlist" onClick={() => handleAddItem(item)}>
                                                                                    <span>Add to cart</span>
                                                                                </button>
                                                                        }

                                                                        <button className="product-add mobile-product-add" onClick={() => {
                                                                            setModalEditQuantity(true);
                                                                            setItemEditQty(item)
                                                                        }}>
                                                                            <span>Add</span>
                                                                        </button>
                                                                    </td>
                                                                    <td>
                                                                        <span className='btn-remove' onClick={() => handleRemoveItem(item)}><RiDeleteBin6Line/></span>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        :
                                                        <>
                                                            <tr>
                                                                <td colSpan={7}>
                                                                    <h3 className="empty-wishlist">Your WishList is empty</h3>
                                                                </td>
                                                            </tr>
                                                        </>
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <EditQuantity show={modalEditQuantity} onHide={() => setModalEditQuantity(false)} itemEditQty={itemEditQty} setItemEditQty={setItemEditQty}/>
            </section>
        </>
    );
};

export default WishList;