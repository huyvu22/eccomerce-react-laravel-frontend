import React, {useEffect, useRef, useState} from 'react';
import './ProductDetail.scss';
import SingleBanner from "../../../components/SingleBanner/SingleBanner";
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {FaEye, FaFacebookF, FaShoppingBasket} from "react-icons/fa";
import {FiInstagram} from "react-icons/fi";
import {BsFillDropletFill, BsTwitter} from "react-icons/bs";
import {AiFillHeart} from "react-icons/ai";
import {FaLink} from "react-icons/fa";
import {TbStar} from "react-icons/tb";
import {BsFillStarFill} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import ProductActions from "../../../components/ProductActions/ProductActions";
import button from "bootstrap/js/src/button";
import useMyCart from "../../../services/Hooks/useMyCart";
import {addItem, wishItem} from "../../../components/ProductCard/ProductCardSlice";
import {Link, useParams} from "react-router-dom";
import {asset} from "../../../services/Helpers/Image/image";
import useClient from "../../../services/Hooks/useClient";
import ProductCard from "../../../components/ProductCard/ProductCard";
import {showToast} from "../../../components/Toast/Toast";
import {processFetchedData} from "../../../utils/dataHandler";
import {toast} from "react-toastify";

const ProductDetail = () => {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    const client = useClient();
    const [myCart] = useMyCart()
    const dispatch = useDispatch();
    const item = useSelector(state => state.productCard.itemDetails);
    const {id, slug} = useParams();
    let product = myCart?.find(product => product.id === item.id)
    const [itemArr, setItemArr] = useState([]);
    const [productRelated, setProductRelated] = useState([])
    const [loading, setLoading] = useState(true)
    const favoriteItems = useSelector((state) => state.productCard.wishList);
    const compareItems = useSelector((state) => state.productCard.compareList);
    const userLogin = useSelector(state => state.loginUser.isUserAuthenticated)
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState(null)
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState([]);

    const getProduct = async () => {
        const res = await client.get(`products/${id}/${slug}`);
        if (res.response.ok === true) {
            const data = await res.data.data;
            setItemArr(data[0]);
            setLoading(false);
        }
    }

    const getRelatedProducts = async () => {
        if (itemArr?.category?.slug !== undefined) {
            try {
                const res = await client.get(`products/category/${itemArr?.category?.slug}`);
                if (res.response.ok === true) {
                    const data = await res.data.data;
                    setProductRelated(data);
                }
            } catch (error) {
                console.error("Error fetching related products:", error);
            }
        }
    };

    useEffect(() => {
        getProduct();
        const scrollToTop = () => {
            const element = document.documentElement || document.body;
            element.scrollIntoView({behavior: "smooth", block: "start"});
        };

        scrollToTop();
    }, [item]);

    useEffect(() => {
        if (itemArr?.category?.slug !== undefined) {
            getRelatedProducts();
        }
    }, [itemArr]);

    const handleAddItem = (item) => {
        let productWithQuantity = {...item, quantity: 1};
        dispatch(addItem(productWithQuantity));
    }

    const handleAddToWishlist = (item) => {
        dispatch(wishItem(item));
        showToast(thumb_image, `${name} added to Wishlist!`);
    }

    const getReViewProduct = async () => {
        const res = await client.get(`product-review/${id}`, '', userToken.token);
        if (res.response.ok === true) {
            const reviews = await res.data.data;
            setReview(reviews)
        }
    }

    useEffect(() => {
        getReViewProduct()
    }, [])

    const handleSubmitReview = async () => {
        let data = {
            'product_id': id,
            'rating': rating,
            'review': comment
        }
        if (rating || comment) {
            const res = await client.post(`product-review`, data, '', userToken.token);
            if (res.response.ok === true) {
                const review = await res.data;
                toast.success(review.message)
            }
        } else {
            toast.error('Please! Drop your review')
        }

    }


    const showData = processFetchedData(productRelated, favoriteItems, myCart, compareItems);

    const {name, thumb_image, price, rating: productRating, offer_price, availability, vendor, sku} = itemArr;

    return (
        <>
            <SingleBanner name="Product Details"/>
            {
                loading === true
                    ?
                    <div className="loading">
                        <h3>Loading...</h3>
                    </div>

                    :
                    <>
                        <section>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="details-gallery-group">
                                            <div className="details-preview">
                                                <img src={asset(thumb_image)} alt="img"/>
                                            </div>
                                            <div className="details-thumb">
                                                <img src={asset(thumb_image)} alt="img"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="details-product">
                                            <div className="details-name">
                                                <h3>{name}</h3>
                                            </div>
                                            <div className="details-meta">
                                                <p>SKU: {sku}</p>
                                                <p>Stock Left: {availability}</p>
                                                <p>Seller: {vendor}</p>
                                            </div>
                                            <div className="details-meta">
                                                <p><a href="">Other products posted by {vendor} <span><FaLink size="0.8rem"/></span></a></p>
                                            </div>
                                            <div className="details-rating">
                                                {[1, 2, 3, 4, 5].map((index) => (
                                                    <span key={index}>
                                                        {index <= productRating ? <AiFillStar/> : <AiOutlineStar/>}
                                                    </span>
                                                ))}
                                                <span>({productRating || 0})</span>
                                            </div>
                                            <h3 className="details-price">
                                                <del>{price}$</del>
                                                <span>{offer_price}$</span>
                                            </h3>
                                            <p className="details-desc">Lorem ipsum dolor sit amet. In nobis Quis 33 iste
                                                consequatur ut pariatur fugiat nam tempore quisquam est omnis mollitia.</p>
                                            <div className="details-list-group">
                                                <label><b>Tags:</b></label>
                                                <span>{name}</span>
                                            </div>
                                            <div className="details-list-group">
                                                <label><b>Share:</b></label>
                                                <span><FaFacebookF size="1.25rem"/></span>
                                                <span><FiInstagram size="1.25rem"/></span>
                                                <span><BsTwitter size="1.25rem"/></span>
                                            </div>
                                            {
                                                product ?
                                                    <ProductActions quantity={product.quantity} item={product}/>
                                                    :
                                                    <button className="product-add" onClick={() => handleAddItem(item)}>
                                                        <span><FaShoppingBasket/></span><span>Add</span>
                                                    </button>
                                            }
                                            <button className="product-add wishlist mt-2" onClick={() => handleAddToWishlist(item)}>
                                                <span><AiFillHeart size="1.7rem"/></span><span>Add To WishList</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {
                            userLogin &&
                            <section>
                                <div className="container">
                                    <div className="product-details-review">
                                        <h4><b>Add Your Review</b></h4>
                                        <div className="review-wrapper">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="star-rating">
                                                        {[...Array(5)].map((star, index) => {
                                                            index += 1;
                                                            return (
                                                                <span
                                                                    key={index}
                                                                    className={index <= (hover || rating) ? "on" : "off"}
                                                                    onClick={() => setRating(index)}
                                                                    onMouseEnter={() => setHover(index)}
                                                                    onMouseLeave={() => setHover(rating)}
                                                                >
                                                                <BsFillStarFill/>
                                                            </span>
                                                            );
                                                        })}

                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                    <textarea name="comment" onChange={(e) => setComment(e.target.value)} id="" className="form-control p-3" rows={6}
                                                              placeholder="Description"></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 form-btn">
                                                    <button onClick={handleSubmitReview}><span><BsFillDropletFill size={"0.7em"}/></span>Drop Your Review</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>
                        }

                        <section>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="product-details-frame">
                                            <h3>description</h3>
                                            <div className="tab-descrip">
                                                <p>
                                                    Lorem ipsum dolor sit amet. In nobis Quis 33 iste consequatur ut pariatur fugiat nam tempore quisquam est omnis mollitia. Eos
                                                    quasi
                                                    voluptatem aut cumque consequatur et totam exercitationem sed voluptatem porro. Cum minus eaque ea veritatis enim ab
                                                    reprehenderit vitae cum
                                                    vitae pariatur qui voluptatem iste est error velit id minus consequatur.
                                                    Et possimus blanditiis sed quia quia ea consequatur saepe quo et corrupti dolores. Et excepturi nobis eum omnis neque ab nostrum
                                                    repellat a
                                                    explicabo quidem?
                                                    Et culpa aliquam hic autem quae ea quia maiores et quae natus ut voluptatibus accusantium. Ea quaerat quia et rerum aperiam non
                                                    voluptatem
                                                    praesentium aut maxime exercitationem aut assumenda sapiente.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <div className="section-heading">
                                            <h2>related this items</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                                    {showData?.map((item) => (
                                        <ProductCard key={item.id} item={item}/>
                                    ))}
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="view-all d-flex justify-content-center mt-3">
                                            <Link to="/item/products/featured/" className="btn btn-inline">
                                                <span className="me-2"><FaEye/></span>
                                                <span>view all</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>

            }

        </>
    );
};

export default ProductDetail;