import React, {useEffect, useState} from 'react';
import useClient from "../../../services/Hooks/useClient";
import {Link, useNavigate} from "react-router-dom";

const NavbarItemsCategory = (props) => {
    const client = useClient();
    const {hover} = props
    //className={` mega-menu${hover ? 'show-mega-menu' : ''}`}

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const getCategory = async () => {
        const res = await fetch('http://buynow.test/api/category')
        if (res.ok) {
            const response = await res.json();
            let categoryArr = response.data;
            setCategories(categoryArr);
        }
    }

    useEffect(() => {
        getCategory();
    }, []);

    const handleShowProductsByCategory = ($slug) => {
        navigate(`products/sub-category/${$slug}`)
    }

    return (
        <div className={` mega-menu ${hover ? 'show' : ''}`}>
            <div className="container mega-menu-scroll">
                <div className="row row-cols-5">
                    {categories.map(({category, subCategory}) => (
                        <div className="col" key={category.id}>
                            <div className="mega-menu-wrap">
                                <div className="mega-menu-title">
                                    <h5>{category.name}</h5>
                                </div>
                                <ul className="mega-menu-list">
                                    {
                                        subCategory.map((item) => (
                                            <li key={item.id} onClick={() => handleShowProductsByCategory(item.slug)}><Link
                                                to="">{item.name}</Link>
                                            </li>
                                        ))
                                    }

                                </ul>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default NavbarItemsCategory;