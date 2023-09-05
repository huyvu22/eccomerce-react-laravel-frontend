import React, {useState} from 'react';
import {TiArrowUpThick} from "react-icons/ti";
import './ScrollButton.scss';

const ScrollButton = () => {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        } else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);
    return (
        <div className="scroll-top" style={{display: visible ? 'inline' : 'none'}}
             onClick={scrollToTop}>
            <span><TiArrowUpThick/></span>
        </div>
    );
};

export default ScrollButton;