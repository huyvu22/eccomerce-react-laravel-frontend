import './ProductDetail.scss';
import React, {useEffect, useRef, useState} from 'react';
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {FaEye, FaFacebookF, FaShoppingBasket} from "react-icons/fa";
import {FiInstagram} from "react-icons/fi";
import {BsFillDropletFill, BsTwitter} from "react-icons/bs";
import {AiFillHeart} from "react-icons/ai";
import {FaLink} from "react-icons/fa";
import {BsFillStarFill} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {addItem, wishItem} from "../../../components/ProductCard/ProductCardSlice";
import {Link, useNavigate, useParams} from "react-router-dom";
import {asset} from "../../../services/Helpers/Image/image";
import {showToast} from "../../../components/Toast/Toast";
import {getCookie, processFetchedData} from "../../../utils/dataHandler";
import {toast} from "react-toastify";
import {MdNavigateBefore, MdNavigateNext} from "react-icons/md";
import SingleBanner from "../../../components/SingleBanner/SingleBanner";
import ProductActions from "../../../components/ProductActions/ProductActions";
import button from "bootstrap/js/src/button";
import useMyCart from "../../../services/Hooks/useMyCart";
import useClient from "../../../services/Hooks/useClient";
import ProductCard from "../../../components/ProductCard/ProductCard";
import moment from "moment";
import ModalPreviewItem from "../../../components/ModalPreviewItem/ModalPreviewItem";
import clsx from "clsx";

const ProductDetail = () => {
    const {id, slug} = useParams();
    const [myCart] = useMyCart()
    const [itemArr, setItemArr] = useState([]);
    const [wishList, setWishList] = useState([])
    const [productRelated, setProductRelated] = useState([])
    const [loading, setLoading] = useState(true)
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('')
    const [hover, setHover] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [selectedImage, setSelectedImage] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [reviewImage, setReviewImage] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [paginate, setPaginate] = useState([]);
    const navigate = useNavigate();
    const userToken = getCookie('user_access_token') || getCookie('seller_access_token');
    const favoriteItems = useSelector((state) => state.productCard.wishList);
    const compareItems = useSelector((state) => state.productCard.compareList);
    const userLogin = useSelector(state => state.loginUser.isUserAuthenticated);
    const dispatch = useDispatch();
    const item = useSelector(state => state.productCard.itemDetails);
    let product = myCart?.find(product => product.slug === slug)
    const client = useClient();


    const scrollToTop = () => {
        const element = document.documentElement || document.body;
        element.scrollIntoView({behavior: "smooth", block: "start"});
    };

    const getProduct = async () => {
        const res = await client.get(`products/${id}/${slug}`);
        if (res.response.ok === true) {
            const data = await res.data.data;
            setItemArr(data[0]);
            setLoading(false);
        }
    }

    const getWishList = async () => {
        const res = await client.get('wishlist', '', userToken);
        if (res.response.ok === true) {
            const dataObj = await res.data;
            setWishList(dataObj.data)
        }

    }
    useEffect(() => {
        if (userToken) {
            getWishList();
        }
    }, []);


    useEffect(() => {
        getProduct();
        scrollToTop();
    }, [id]);

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
        if (itemArr?.category?.slug !== undefined) {
            getRelatedProducts();
        }
    }, [itemArr]);

    const handleAddItem = (item) => {
        let productWithQuantity = {...item, quantity: 1};
        dispatch(addItem(productWithQuantity));
    }

    const handleAddToWishlist = async (item) => {
        if (userToken) {
            const res = await client.post('wishlist', {'product_id': id}, '', userToken)
            if (res.response.ok === true) {
                const data = await res.data;
                if (data.status === 'success') {
                    dispatch(wishItem(item));
                    showToast(thumb_image, `${name} added to Wishlist!`);
                }
            } else {
                toast.error('Product has already been added to wishlist');
            }

        } else {
            navigate('/buyer/login');
        }
    };

    const getReViewProduct = async () => {
        if (userToken) {
            const res = await client.get(`product-review/${id}?page=${currentPage}`, '', userToken);
            if (res.response.ok === true) {
                const objectData = await res.data;
                const reviews = objectData.data;
                setPaginate(objectData.meta)
                setReviews(reviews)
            }
        }
    }

    useEffect(() => {
        getReViewProduct()
    }, [])


    const handleSubmitReview = async () => {
        let data = {
            'product_id': id,
            'rating': rating,
            'review': comment,
            'images': selectedImage
        }

        const formData = new FormData();
        for (let key in data) {
            if (key === 'images') {
                for (let i = 0; i < selectedImage.length; i++) {
                    formData.append('images[]', selectedImage[i]);
                }
            } else {
                formData.append(key, data[key]);
            }
        }

        if (comment !== '') {
            // let res = await fetch(`http://buynow.test/api/product-review`, {
            //     method: "POST",
            //     headers: {
            //         'Authorization': `Bearer ${userToken}`,
            //     },
            //     body: formData,
            // })
            //
            // const response = await res.json();
            // if (response.status === 'success') {
            //     setComment('')
            //     setSelectedImage([])
            //     toast.success(response.message)
            // }

            const res = await client.post(`product-review`, formData, '', userToken);
            if (res.response.ok === true) {
                const review = await res.data;
                setComment('')
                setSelectedImage([])
                toast.success(review.message)
            }

        } else {
            toast.error('Please! Drop your review')
        }

    }

    const handlePreviewImage = (image) => {
        setModalShow(true);
        setReviewImage(image);
    }
    const handlePage = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 1500);
    }


    const showData = processFetchedData(productRelated, favoriteItems, myCart, compareItems);

    const {name, thumb_image, price, rating: productRating, offer_price, availability, vendor, sku, product_type} = itemArr;

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
                                                 <span className={clsx("product-label", product_type === 'sale' ? 'red' : (product_type === 'new' ? 'green' : 'purple'))}>
                                <                   label className="label-sale off">{product_type}</label>
                                                 </span>
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
                                                <h4>{name}</h4>
                                            </div>
                                            <div className="details-meta">
                                                <p>SKU: {sku}</p>
                                                <p>Stock Left: {availability}</p>
                                                <p>Seller: {vendor?.name}</p>
                                            </div>
                                            <div className="details-meta">
                                                <p><Link to={`/item/products/seller/${vendor.id}/${vendor.slug}`}>Other products posted by {vendor?.name} <span><FaLink
                                                    size="0.8rem"/></span></Link></p>
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
                                                        <span><FaShoppingBasket/></span><span>Add to Cart</span>
                                                    </button>
                                            }
                                            <button className="product-add wishlist mt-2" onClick={() => handleAddToWishlist(item)}>
                                                <span><AiFillHeart size="1.1rem"/></span><span>Add To WishList</span>
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
                                                    <textarea name="comment" onChange={(e) => setComment(e.target.value)} id="" value={comment} className="form-control p-3"
                                                              rows={6}
                                                              placeholder="Description">
                                                    </textarea>
                                                        <br/>
                                                        <label>Upload Images:</label>
                                                        <input type="file" className="form form-control"
                                                               onChange={(e) => setSelectedImage([...e.target.files])} multiple/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 form-btn">
                                                    <button onClick={handleSubmitReview}><span><BsFillDropletFill size={"0.7em"}/></span>Drop Your Review</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        reviews.length ?
                                            <>
                                                <div className="product-details-rating">
                                                    <h4 className="mb-3"><b>All Review</b></h4>
                                                    <div className="rating-wrapper">
                                                        {
                                                            reviews.length && reviews.map((review) => (
                                                                <>
                                                                    <div className="product-rating" key={review.id}>
                                                                        <div className="row">
                                                                            <div className="col-1">
                                                                                <div className="user-avatar">
                                                                                    <img
                                                                                        src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png"
                                                                                        alt="img"/>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-11">
                                                                                <div className="product-rating-main">
                                                                                    <span className="product-rating-name">{review.user_name}</span>
                                                                                    <br/>
                                                                                    <span className="product-rating-time">{moment(review.created_at).format('MM/DD/YYYY')}</span>
                                                                                    <div className="product-rating-star">
                                                                                        {[...Array(5)].map((star, index) => {
                                                                                            index += 1;
                                                                                            return (
                                                                                                <span
                                                                                                    key={index}
                                                                                                    className={index <= review.rating ? "on" : "off"}
                                                                                                ><BsFillStarFill/>
                                                                                                </span>
                                                                                            );
                                                                                        })}
                                                                                    </div>

                                                                                    <span className="product-comment">{review.comment}</span>
                                                                                </div>
                                                                                <div className="product-rating-image">
                                                                                    {
                                                                                        review.images.length
                                                                                            ?
                                                                                            review.images.map(item => (
                                                                                                <span onClick={() => handlePreviewImage(item.image)}><img src={asset(item.image)}
                                                                                                                                                          alt="img"/></span>
                                                                                            ))
                                                                                            :
                                                                                            ''
                                                                                    }

                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <hr/>
                                                                </>
                                                            ))
                                                        }

                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="bottom-paginate">
                                                                {
                                                                    reviews?.length ?
                                                                        <ul>
                                                                            {currentPage > 1 && (
                                                                                <li className="page-item" onClick={() => handlePage(currentPage - 1)}>
                                                                                    <span><MdNavigateBefore/></span>
                                                                                </li>
                                                                            )}
                                                                            {paginate?.links.map((page) => {
                                                                                if (page.label === "&laquo; Previous" || page.label === "Next &raquo;") {
                                                                                    return null;
                                                                                }
                                                                                return (
                                                                                    <li
                                                                                        key={page.label}
                                                                                        className={page?.active ? 'active' : ''}
                                                                                        onClick={() => handlePage(page.label)}
                                                                                    >
                                                                                        {page.label}
                                                                                    </li>
                                                                                );
                                                                            })}
                                                                            {currentPage < paginate?.last_page && (
                                                                                <li className="page-item" onClick={() => handlePage(currentPage + 1)}>
                                                                                    <span><MdNavigateNext/></span>
                                                                                </li>
                                                                            )}
                                                                        </ul>

                                                                        :
                                                                        null
                                                                }
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </> : ''
                                    }

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
                        <ModalPreviewItem
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            reviewImage={reviewImage}
                        />
                    </>

            }

        </>
    );
};

export default ProductDetail;