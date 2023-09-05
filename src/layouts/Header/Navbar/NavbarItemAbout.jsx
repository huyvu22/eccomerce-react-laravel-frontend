import React from 'react';
import {Link} from "react-router-dom";

const NavbarItemAbout = () => {
    return (
        <ul className="dropdown-position-list">
            <li><Link to={'contact-us'}>About Us</Link></li>
            <li><a href="">Terms & Condition</a></li>
            <li><a href="">Privacy Policy</a></li>
        </ul>
    );
};

export default NavbarItemAbout;