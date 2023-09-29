import React from 'react';
import './FeatureCard.scss';
import {BsFillSuitHeartFill} from "react-icons/bs";
import {AiFillStar} from "react-icons/ai";
import {FaShoppingBasket} from "react-icons/fa";
import clsx from "clsx";
import useAddToCart from "../../services/Hooks/useAddToCart";
import ProductActions from "../ProductActions/ProductActions";
import button from "bootstrap/js/src/button";
import {asset} from "../../services/Helpers/Image/image";
import {Link} from "react-router-dom";
import Tippy from "@tippyjs/react";

const FeatureCard = ({item}) => {
    const {id, product_type, name, slug, thumb_image, isLike, isCompare, price, offer_price, quantity, availability, vendor, rating, updated_at} = item;
    const {
        addItemToCart,
        removeItemFromCart,
        toggleWishlistItem,
        likeRef
    } = useAddToCart({id, name, slug, thumb_image, offer_price, isLike, quantity});
    return (
        <div className="col">
            <div className="feature-card">
                <div className="feature-media">
                    <div className="grid-image">
                                    <span className="feature-label">
                                        <label>{product_type}</label>
                                    </span>
                        <Tippy content={<span style={{fontSize: '10px'}}>Add to Wish List</span>}>
                                <span className={clsx("feature-like ", isLike === true && 'active-like')} ref={likeRef}
                                      onClick={toggleWishlistItem}>
                                    <span><BsFillSuitHeartFill/></span>
                                </span>
                        </Tippy>
                        <Link to={`/item/item_details/${id}/${slug}`}>
                            <img
                                src={asset(thumb_image)}
                                alt="img"/>
                        </Link>
                    </div>
                </div>
                <div className="feature-content">
                    <h6 className="feature-name">
                        {name}
                    </h6>
                    <div className="feature-rating">
                        <span><AiFillStar/></span>
                        <span><AiFillStar/></span>
                        <span><AiFillStar/></span>
                        <span><AiFillStar/></span>
                        <span><AiFillStar/></span>
                        <span>(0)</span>
                    </div>
                    <div className="product-price">
                        <del>{price}</del>
                        <span>{offer_price}</span>
                    </div>
                    <p>Lorem ipsum dolor sit amet. In nobis Quis 33 iste consequatur ut pariatur
                        fugiat...</p>
                    {
                        (quantity >= 1)
                            ?
                            <ProductActions quantity={quantity}
                                            handleRemoveItem={removeItemFromCart}
                                            handleAddItem={addItemToCart}
                            />
                            :
                            <button className="product-add"
                                    onClick={() => addItemToCart()}>
                                <span><FaShoppingBasket/></span><span>Add</span>
                            </button>
                    }
                </div>

            </div>
        </div>
    );
};

export default FeatureCard;