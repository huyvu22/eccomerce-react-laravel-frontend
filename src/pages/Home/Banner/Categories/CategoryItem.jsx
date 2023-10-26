import React, {useEffect, useState} from 'react';
import {HiOutlineViewList} from "react-icons/hi";
import {FaArrowRight} from "react-icons/fa";
import {MdKeyboardArrowRight} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import useClient from "../../../../services/Hooks/useClient";
import {textLimit} from "../../../../services/Helpers/string/String";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

const CategoryItem = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const client = useClient();
    const getCategory = async () => {
        setLoading(true)
        const res = await client.get('category');
        if (res.response.ok) {
            const categoryArr = await res.data.data;
            setCategories(categoryArr?.slice(0, 10));
            setLoading(false);
        }
    }

    useEffect(() => {
        getCategory();
    }, []);

    const handleShowProductsByCategory = ($slug) => {
        navigate(`products/category/${$slug}`)
    }
    const handleShowProductBySubCategory = (e, $slug) => {
        e.stopPropagation();
        navigate(`products/sub-category/${$slug}`)
    }

    return (
        <>
            {
                loading ?
                    <div className="col-lg-3">
                        <div className="banner-category">
                            <Skeleton height={50}/>
                            <ul className="banner-category-list">
                                <Skeleton count={10}/>
                            </ul>
                        </div>
                    </div> :
                    <div className="col-lg-3">
                        <div className="banner-category">
                            <div className="banner-category-head">
                                <span><HiOutlineViewList size={"1.3em"}/></span>
                                <span>Top Categories</span>
                            </div>
                            <ul className="banner-category-list">
                                {categories.map(({category, subCategory}) => (
                                    <li className="banner-category-item" key={category.id} onClick={() => {
                                        handleShowProductsByCategory(category.slug)
                                    }}>
                                        <div className="banner-category-dropdown">
                                            <p>{category.name}</p>
                                            <div className="banner-sub-category">
                                                <ul>
                                                    {
                                                        subCategory.map((item) => (
                                                            <li key={item.id} onClick={(e) => handleShowProductBySubCategory(e, item.slug)}>{item.name}</li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        <span><FaArrowRight size={"1.2em"}/>
                                             </span><a href="#"></a>{textLimit(category.name, 18)}
                                        <span><MdKeyboardArrowRight size={"1.3em"}/></span>
                                    </li>

                                ))}

                            </ul>
                        </div>
                    </div>
            }
        </>
    );
};

export default CategoryItem;