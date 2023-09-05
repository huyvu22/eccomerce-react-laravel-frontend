import React, {useEffect, useState} from 'react';
import {HiOutlineViewList} from "react-icons/hi";
import {FaArrowRight} from "react-icons/fa";
import {MdKeyboardArrowRight} from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";

const CategoryItem = () => {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const getCategory = async () => {
        const res = await fetch('http://buynow.test/api/category')
        if (res.ok) {
            const response = await res.json();
            let categoryArr = response.data;
            setCategories(categoryArr.slice(0, 10));
        }
    }

    useEffect(() => {
        getCategory();
    }, []);

    const handleShowProductsByCategory = ($slug) => {
        navigate(`products/category/${$slug}`)
    }
    return (
        <>
            <div className="col-lg-3">
                <div className="banner-category">
                    <div className="banner-category-head">
                        <span><HiOutlineViewList size={"1.3em"}/></span>
                        <span>Top Categories</span>
                    </div>
                    <ul className="banner-category-list">
                        {categories.map(({category, subCategory}) => (
                            // <Link to={`products/category/${category.slug}`}>
                            <li className="banner-category-item" onClick={() => {
                                handleShowProductsByCategory(category.slug)
                            }}>
                                <div className="banner-category-dropdown">
                                    <p>{category.name}</p>
                                    <div className="banner-sub-category">
                                        <ul>
                                            {
                                                subCategory.map((item) => (
                                                    <li><a href=""></a>{item.name}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <span><FaArrowRight size={"1.2em"}/>
                                             </span><a href=""></a>{category.name}
                                <span><MdKeyboardArrowRight size={"1.3em"}/></span>
                            </li>
                            // </Link>

                        ))}

                    </ul>
                </div>
            </div>
        </>

    );
};

export default CategoryItem;