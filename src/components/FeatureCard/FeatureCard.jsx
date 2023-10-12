import React from 'react';
import './FeatureCard.scss';
import {BsFillSuitHeartFill} from "react-icons/bs";
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {FaShoppingBasket} from "react-icons/fa";
import clsx from "clsx";
import useAddToCart from "../../services/Hooks/useAddToCart";
import ProductActions from "../ProductActions/ProductActions";
import button from "bootstrap/js/src/button";
import {asset} from "../../services/Helpers/Image/image";
import {Link} from "react-router-dom";
import Tippy from "@tippyjs/react";
import {formatter, roundedNumber} from "../../services/Helpers/Number/Number";
import {showDetail} from "../ProductCard/ProductCardSlice";
import {useDispatch} from "react-redux";

const FeatureCard = ({item}) => {
    const {id, product_type, name, slug, thumb_image, isCompare, isLike, short_description, price, offer_price, quantity, availability, vendor, rating, updated_at} = item;
    const {
        addItemToCart,
        removeItemFromCart,
        toggleWishlistItem,
        likeRef
    } = useAddToCart({
        id,
        name,
        slug,
        thumb_image,
        price,
        offer_price,
        isLike,
        isCompare,
        quantity,
        vendor,
        availability,
        rating,
        updated_at
    });
    const dispatch = useDispatch();
    const handleClickItem = (item) => {
        dispatch(showDetail(item))
    }
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
                        <Link to={`/item/item_details/${id}/${slug}`} onClick={() => handleClickItem(item)}>
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
                        {[1, 2, 3, 4, 5].map((index) => (
                            <span key={index}>
                                    {index <= rating ? <AiFillStar/> : <AiOutlineStar/>}
                                </span>
                        ))}
                        <span>({roundedNumber(+rating) || 0})</span>
                    </div>
                    <div className="product-price">
                        <del>{formatter.format(price)}</del>
                        <span>{formatter.format(offer_price)}</span>
                    </div>
                    <p>{short_description}</p>
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