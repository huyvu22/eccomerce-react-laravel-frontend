import React, {useState} from 'react';
import NavbarItemsCategory from "./NavbarItemsCategory";
import NavbarItemAbout from "./NavbarItemAbout";
import NavbarItemBuyers from "./NavbarItemBuyers";
import NavbarItemVendor from "./NavbarItemVendor";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
import ModalCompareItems from "../../../components/ModalCompareItems/ModalCompareItems";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const NavbarTitle = (props) => {
    const [hover, setHover] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const isShowCompare = useSelector((state) => state.productCard.compareList);

    return (
        <div className="navbar-part">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="navbar-content">
                            <ul className="navbar-list">
                                <li className="navbar-item">
                                    <Link to="/">Home</Link></li>
                                <li className="navbar-item dropdown-mega-menu">
                                    <Link to="/"
                                          onMouseEnter={() => setHover(true)}
                                          onMouseLeave={() => setHover(false)}> Category</Link>
                                    <NavbarItemsCategory hover={hover}/>
                                    <span><MdOutlineKeyboardArrowDown size={"1.2em"}/></span>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/"> About Us</Link>
                                    <span><MdOutlineKeyboardArrowDown size={"1.2em"}/></span>
                                    <NavbarItemAbout/>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/"> Buyers</Link>
                                    <span><MdOutlineKeyboardArrowDown size={"1.2em"}/></span>
                                    <NavbarItemBuyers/>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/"> Vendor</Link>
                                    <span><MdOutlineKeyboardArrowDown size={"1.2em"}/></span>
                                    <NavbarItemVendor {...props}/>
                                </li>
                                <li className="navbar-item">
                                    <Link to="site/faq"> Need Help</Link></li>
                                <li className="navbar-item">
                                    <Link to="contact-us"> Contact Us</Link></li>
                                {
                                    isShowCompare?.length
                                        ?
                                        <li className="navbar-compare" onClick={() => setModalShow(true)}>
                                            <Link to="/"> Compare Now</Link>
                                        </li>
                                        :
                                        <></>
                                }

                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <ModalCompareItems show={modalShow}
                               setModalShow={setModalShow}
                               onHide={() => setModalShow(false)}/>
        </div>
    );
};

export default NavbarTitle;