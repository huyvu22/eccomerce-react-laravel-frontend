import React, {useEffect, useState} from 'react';
import "./SinglePagePart.scss";
import {BiSearch} from "react-icons/bi";
import {AiFillStar} from "react-icons/ai";
import {RiDeleteBinLine} from "react-icons/ri";
import {MdNavigateNext} from "react-icons/md";
import {MdNavigateBefore} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {clearFilterPrice, clearFilterRating, filterPrice, filterRating, updateKeywords} from "../../layouts/Header/HeaderSlice";
import {useLocation, useNavigate} from "react-router-dom";
import {processFetchedData} from "../../utils/dataHandler";
import useFetchData from "../../services/Hooks/useFetchData";
import ProductCard from "../ProductCard/ProductCard";
import useMyCart from "../../services/Hooks/useMyCart";

const SinglePagePart = ({attributes}) => {
    const favoriteItems = useSelector((state) => state.productCard.wishList);
    const compareItems = useSelector((state) => state.productCard.compareList);
    const [myCart] = useMyCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const {data, loading, paginate} = useFetchData("products", attributes, currentPage);
    const keywordSearch = useSelector((state) => state.searchProducts.keywords);
    const [keywords, setKeywords] = useState(keywordSearch);
    const [minValue, setMinValue] = useState(10);
    const [maxValue, setMaxValue] = useState(500)
    const [selectedRating, setSelectedRating] = useState(null);
    let totalPageArr = Array.from({length: paginate?.last_page}, (_, i) => i + 1);
    const isSearch = location.pathname.includes('/products/search/')

    const showData = processFetchedData(data, favoriteItems, myCart, compareItems);
    console.log(attributes)

    const handlePage = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 400);
    }

    const handleInputChange = (e) => {
        const keywords = e.target.value;
        setKeywords(keywords);
    };

    const handleSubmitSearchForm = () => {
        const trimmedKeywords = keywords.trim();
        dispatch(updateKeywords(trimmedKeywords));
        if (isSearch) {
            navigate(`/products/search/${trimmedKeywords}`)
        }

    };

    const handlePriceSearch = (e) => {
        e.preventDefault()
        if (!isNaN(minValue) && !isNaN(maxValue)) {
            dispatch(filterPrice([minValue, maxValue]))
        } else {
            dispatch(clearFilterPrice())
        }
    }

    const handleFilterByRating = (e, rating) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedRating(rating);
            dispatch(filterRating(rating))
        } else {
            setSelectedRating(null);
            dispatch(clearFilterRating(''))
        }
    }
    const handleClearFilter = () => {
        setSelectedRating(null);
        dispatch(clearFilterRating(''))
    }
    useEffect(() => {
        window.scrollTo(0, 400);
    }, []);

    return (
        <section className="shop-part">
            <div className="container">
                <div className="row content-reverse">
                    <div className="col-lg-3">
                        <div className="shop-widget">
                            <h6 className="shop-widget-title">Keyword</h6>
                            <div className="shop-widget-group">
                                <input type="text" placeholder="Keyword" value={keywords} className="form-control"
                                       onChange={(e) => handleInputChange(e)}/>
                            </div>
                            <button className="shop-widget-btn" onClick={handleSubmitSearchForm}><span><BiSearch size={"1.2em"}/></span>Search</button>
                        </div>
                        <div className="shop-widget">
                            <h6 className="shop-widget-title">Filter by Price</h6>
                            <div className="shop-widget-group">
                                <input type="number" value={minValue} placeholder="Min - 00"
                                       onChange={(e) => setMinValue(parseInt(e.target.value))}/>
                                <input type="number" value={maxValue} placeholder="Max - 1000"
                                       onChange={(e) => setMaxValue(parseInt(e.target.value))}/>
                            </div>
                            <button className="shop-widget-btn" onClick={handlePriceSearch}><span><BiSearch
                                size={"1.2em"}/></span>Search
                            </button>
                        </div>
                        <div className="shop-widget">
                            <h6 className="shop-widget-title">FILTER BY RATING</h6>
                            <div className="shop-widget-group">
                                <ul className="shop-widget-list">
                                    <li>
                                        <div className="shop-widget-content">
                                            <input type="checkbox" id="rating5"
                                                   checked={selectedRating === 5}
                                                   onChange={(event) => handleFilterByRating(event, 5)}
                                            />
                                            <label htmlFor="rating5">
                                                <span className="active"><AiFillStar/></span>
                                                <span className="active"><AiFillStar/></span>
                                                <span className="active"><AiFillStar/></span>
                                                <span className="active"><AiFillStar/></span>
                                                <span className="active"><AiFillStar/></span>
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="shop-widget-content">
                                            <input type="checkbox" id="rating4"
                                                   checked={selectedRating === 4}
                                                   onChange={(event) => handleFilterByRating(event, 4)}
                                            />
                                            <label htmlFor="rating4">
                                                <span className="active"><AiFillStar/></span>
                                                <span className="active"><AiFillStar/></span>
                                                <span className="active"><AiFillStar/></span>
                                                <span className="active"><AiFillStar/></span>
                                                <span><AiFillStar/></span>
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="shop-widget-content">
                                            <input type="checkbox" id="rating3"
                                                   checked={selectedRating === 3}
                                                   onChange={(event) => handleFilterByRating(event, 3)}
                                            />
                                            <label htmlFor="rating3">
                                                <span className="active"><AiFillStar/></span>
                                                <span className="active"><AiFillStar/></span>
                                                <span className="active"><AiFillStar/></span>
                                                <span><AiFillStar/></span>
                                                <span><AiFillStar/></span>
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="shop-widget-content">
                                            <input type="checkbox" id="rating2"
                                                   checked={selectedRating === 2}
                                                   onChange={(event) => handleFilterByRating(event, 2)}
                                            />
                                            <label htmlFor="rating2">
                                                <span className="active"><AiFillStar/></span>
                                                <span className="active"><AiFillStar/></span>
                                                <span><AiFillStar/></span>
                                                <span><AiFillStar/></span>
                                                <span><AiFillStar/></span>
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="shop-widget-content">
                                            <input type="checkbox" id="rating1"
                                                   checked={selectedRating === 1}
                                                   onChange={(event) => handleFilterByRating(event, 1)}
                                            />
                                            <label htmlFor="rating1">
                                                <span className="active"><AiFillStar/></span>
                                                <span><AiFillStar/></span>
                                                <span><AiFillStar/></span>
                                                <span><AiFillStar/></span>
                                                <span><AiFillStar/></span>
                                            </label>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="shop-widget-content">
                                            <input type="checkbox" id="rating0"
                                                   checked={selectedRating === 0}
                                                   onChange={(event) => handleFilterByRating(event, 0)}
                                            />
                                            <label htmlFor="rating0">
                                                <span><AiFillStar/></span>
                                                <span><AiFillStar/></span>
                                                <span><AiFillStar/></span>
                                                <span><AiFillStar/></span>
                                                <span><AiFillStar/></span>

                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <button className="shop-widget-btn"
                                    onClick={() => handleClearFilter()}><span><RiDeleteBinLine
                                size={"1.2em"}/></span>Clear
                                Filter
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        {
                            loading === true
                                ?
                                <div className="loading">
                                    <h3>Loading...</h3>
                                </div>
                                :
                                <>
                                    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3">
                                        {data?.length ?
                                            showData?.map((item) => <ProductCard key={item.id} item={item}/>)
                                            :
                                            <h4 style={{margin: '0 auto'}}>PRODUCT NOT FOUND</h4>
                                        }
                                    </div>
                                    <hr/>
                                </>
                        }
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bottom-paginate">
                                    <p>Showing {paginate?.from ? paginate?.from : 0} to {paginate?.to ? paginate?.to : 0} of {paginate?.total} Results</p>
                                    {
                                        data?.length ?
                                            <ul>
                                                {
                                                    currentPage >= 2 &&
                                                    <li className="page-item" onClick={() => handlePage(currentPage - 1)}>
                                                        <span><MdNavigateBefore/></span></li>
                                                }
                                                {
                                                    totalPageArr?.map((page) =>
                                                        <li key={page}
                                                            className={`page-item ${currentPage === page ? 'active' : ''}`}
                                                            onClick={() => handlePage(page)}
                                                        >{page}</li>
                                                    )
                                                }
                                                {
                                                    currentPage < paginate?.last_page &&
                                                    <li className="page-item" onClick={() => handlePage(currentPage + 1)}>
                                                        <span><MdNavigateNext/></span>
                                                    </li>
                                                }

                                            </ul>
                                            :
                                            null
                                    }
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SinglePagePart;