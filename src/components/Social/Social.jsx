import React from 'react';
import {SlSocialFacebook} from "react-icons/sl";
import {RxTwitterLogo} from "react-icons/rx";
import {SlSocialYoutube} from "react-icons/sl";
import './Social.scss';

const Social = () => {
    return (
        <div className="social-widgets visible-lg">
            <ul className="items">
                <li className="item facebook"><a href="#"><SlSocialFacebook/></a></li>
                <li className="item twitter"><a href="#"><RxTwitterLogo/></a></li>
                <li className="item youtube"><a href="#"><SlSocialYoutube/></a></li>
            </ul>
        </div>
    );
};

export default Social;