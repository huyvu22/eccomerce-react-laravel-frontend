import './CategorySideBar.scss';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {hideCategory, showCategory} from "../../layouts/Header/HeaderSlice";
import clsx from "clsx";
import {IoMdClose} from "react-icons/io";
import useClient from "../../services/Hooks/useClient";
import {FaArrowRight} from "react-icons/fa";
import {MdKeyboardArrowRight} from "react-icons/md";
import {BiMinus} from "react-icons/bi";
import {IoMdList} from "react-icons/io";
import {Link} from "react-router-dom";
import {textLimit} from "../../services/Helpers/string/String";

const CategorySideBar = () => {
    const isShowCate = useSelector((state) => state.cartItems.isShowCate);
    const [show, setShow] = useState(false);
    const [showSubCategory, setShowSubCategory] = useState(null)
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const client = useClient();

    const getCategory = async () => {
        const res = await client.get('category');
        if (res.response.ok) {
            const categoryArr = await res.data.data;
            setCategories(categoryArr);
        }
    }

    useEffect(() => {
        getCategory()
    }, []);

    useEffect(() => {
        setShow(isShowCate);
    }, [isShowCate]);
    const handleClose = () => {
        setShow(false);
        dispatch(hideCategory(false));
        document.body.style.overflow = "unset";
    };
    return (
        <aside className={clsx("category-sidebar", show && "active")}>
            <div className="category-header">
                <h4 className="category-title"><span><IoMdList size={"1.2em"}/></span><span>Categories</span></h4>
                <button className="cate-close" onClick={handleClose}>
                    <span><IoMdClose/></span>
                </button>
            </div>
            <ul className="category-list">
                {categories.length &&
                    categories.map(({category, subCategory}) => (
                        <li className="category-item" key={category.id}>
                            <a
                                className={clsx('category-link dropdown-link', showSubCategory === category.id && 'active-cate')}
                                title="Top"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setShowSubCategory(category.id === showSubCategory ? null : category.id)
                                }}
                            >
                                <span><FaArrowRight/></span>
                                {textLimit(category.name, 16)}
                                <span className={clsx('', showSubCategory === category.id && 'active-arrow')}><MdKeyboardArrowRight/></span>
                            </a>
                            <ul
                                className={clsx('dropdown-list', showSubCategory === category.id && 'show-subCategory')}
                            >
                                {subCategory.length &&
                                    subCategory.map((item) => (
                                        <li key={item.id} onClick={handleClose}>
                                            <Link to={`products/sub-category/${item.slug}`} title={item.name}> <span><BiMinus/></span>{item.name}</Link>
                                        </li>
                                    ))}
                            </ul>
                        </li>
                    ))}
            </ul>
        </aside>
    );
};

export default CategorySideBar;