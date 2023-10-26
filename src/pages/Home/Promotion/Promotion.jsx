import React from 'react';
import {FaShoppingCart} from "react-icons/fa";
import './Promotion.scss'
import {Link} from "react-router-dom";

const Promotion = () => {
    return (
        <section className="promo-part">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="promo-content">
                            <h3>starts with $500</h3>
                            <h2>Office Pantry Set</h2>
                            <Link to="/products/category/office-table" className="btn btn-inline">
                                <span className="me-2 mt-2"><FaShoppingCart/></span>
                                <span>Shop now</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Promotion;