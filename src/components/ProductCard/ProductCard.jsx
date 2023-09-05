import React from 'react';
import './ProductCard.scss'
import {BsFillSuitHeartFill} from "react-icons/bs";
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {FaShoppingBasket} from "react-icons/fa";
import {FaExchangeAlt} from "react-icons/fa";
import clsx from "clsx";
import button from "bootstrap/js/src/button";
import ProductActions from "../ProductActions/ProductActions";
import useAddToCart from "../../services/Hooks/useAddToCart";
import {Link} from "react-router-dom";
import Tippy from '@tippyjs/react';
import useUrl from "../../services/Hooks/useUrl";
import {useDispatch} from "react-redux";
import {showDetail} from "./ProductCardSlice";
import {asset} from "../../services/Helpers/Image/image";

const ProductCard = ({item, setModalShow}) => {

    const {id, product_type, name, slug, thumb_image, isLike, isCompare, price, offer_price, quantity, availability, vendor, rating, updated_at} = item;

    const {addItemToCart, removeItemFromCart, toggleWishlistItem, toggleCompare, likeRef, compareRef} = useAddToCart({
        id,
        name,
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
    const url = useUrl();
    const dispatch = useDispatch();
    const handleClickItem = (item) => {
        dispatch(showDetail(item))
    }


    return (
        <>
            <div className="col">
                <div className="product-card">
                    <div className="product-media">
                        <div className="grid-image">
                             <span className="product-label">
                                <label className="label-sale off">{product_type}</label>
                             </span>
                            <Tippy content={<span style={{fontSize: '10px'}}>Add to Wish List</span>}>
                                <span className={clsx("product-like ", isLike === true && 'active-like')} ref={likeRef}
                                      onClick={toggleWishlistItem}>
                                    <span><BsFillSuitHeartFill/></span>
                                </span>
                            </Tippy>
                            <Tippy content={<span style={{fontSize: '10px'}}>Compare</span>}>
                                <span className={clsx("compare", isCompare === true && 'active-compare')}
                                      ref={compareRef}
                                      onClick={toggleCompare}>
                                    <span><FaExchangeAlt/></span>
                                </span>
                            </Tippy>
                            <Link to={`/item/item_details/${id}/${slug}`} className="product-image"><img src={asset(thumb_image)} alt="img" onClick={() => handleClickItem(item)}/></Link>

                            {/*<Link to="/" className="quick-preview" onClick={() => setModalShow(true)}>*/}
                            {/*    <span>Preview</span>*/}
                            {/*</Link>*/}
                        </div>
                    </div>
                    <div className="product-content">

                        <div className="product-rating">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <span key={index}>
                                    {index <= rating ? <AiFillStar/> : <AiOutlineStar/>}
                                </span>
                            ))}
                            <span>({rating || 0})</span>
                        </div>
                        <div className="product-name">
                            <h6>{name}</h6>
                        </div>
                        <div className="product-price">
                            <del>{price}</del>
                            <span>{offer_price}</span>
                        </div>
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
        </>
    );
};

export default ProductCard;