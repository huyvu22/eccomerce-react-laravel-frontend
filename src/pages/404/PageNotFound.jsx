import React from 'react';
import './PageNotFound.scss';
import {Link} from "react-router-dom";
import {MdOutlineArrowBackIos} from "react-icons/md";

const PageNotFound = () => {
    return (
        <section className="page_404 section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-not-found mx-auto text-center">
                            <img className="d-block img-fluid" src="//bizweb.dktcdn.net/100/380/404/themes/846913/assets/404.png?1688377529651" alt="404"/>
                            <h1>Page Not Found</h1>
                            <Link to="/" className="btn btn-inline"> <MdOutlineArrowBackIos/> BACK TO HOME</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PageNotFound;