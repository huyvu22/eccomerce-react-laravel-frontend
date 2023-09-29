import React from 'react';
import {Link} from "react-router-dom";

const NavbarItemAbout = () => {
    return (
        <ul className="dropdown-position-list">
            <li><Link to={'about-us'}>About Us</Link></li>
            <li><Link to={'terms-and-condition'}>Terms & Condition</Link></li>
            <li><Link to={'privacy-policy'}>Privacy Policy</Link></li>
        </ul>
    );
};

export default NavbarItemAbout;