import React, {useEffect, useState} from 'react';
import './Footer.scss'
import logo from "../../assets/images/logo.png";
import {MdAlternateEmail} from "react-icons/md";
import {BsPhone} from "react-icons/bs";
import {ImLocation} from "react-icons/im";
import {Link} from "react-router-dom";
import useClient from "../../services/Hooks/useClient";

const Footer = () => {
    const client = useClient();
    const [footerTitles, setFooterTitles] = useState([])
    const [info, setInfo] = useState([])

    const getFooterTitle = async () => {
        const res = await client.get('footer');
        if (res.response.ok) {
            const dataObj = await res.data;
            console.log(dataObj.data)
            setFooterTitles(dataObj.data.columns);
            setInfo(dataObj.data.contact)
        }
    }

    useEffect(() => {
        getFooterTitle()
    }, []);

    return (
        <>
            <div className="footer-part">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-xl-3">
                            <div className="footer-widget">
                                <a className='footer-logo' href="">
                                    <img src={logo} alt=""/>
                                </a>
                                <p className="footer-desc">
                                    Gia dụng tiện ích Minh Ngọc, cung cấp sản phẩm gia dụng nhà bếp chính hãng. Sản phẩm được nhập khẩu....
                                    <Link to="about-us" href="">Read more</Link>
                                </p>
                                <ul className='footer-social'>
                                    <li><a className='icofont-facebook' href=""></a></li>
                                    <li><a className='icofont-facebook' href=""></a></li>
                                    <li><a className='icofont-facebook' href=""></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="footer-widget contact">
                                <h4>Contact</h4>
                                <ul className="footer-contact">
                                    <li>
                                        <p><span className='pe-2' style={{color: "var(--text-primary)"}}><MdAlternateEmail size={"2em"}/></span>{info.email}</p>
                                    </li>
                                    <li>
                                        <i className="icofont-ui-touch-phone"></i>
                                        <p><span className='pe-2' style={{color: "var(--text-primary)"}}><BsPhone size={"2em"}/></span><span>{info.phone}</span></p>
                                    </li>
                                    <li>
                                        <i className="icofont-location-pin"></i>
                                        <p><span className='pe-2' style={{color: "var(--text-primary)"}}><ImLocation size={"2em"}/></span>{info.address}
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {
                            footerTitles?.length &&
                            footerTitles.map((item, index) =>
                                <div className="col-sm-6 col-xl-3" key={index}>
                                    <div className="footer-widget">
                                        <h4>{item.title}</h4>
                                        <div className="footer-links">
                                            <ul className="footer-contact">
                                                {
                                                    item.links.map(el =>
                                                        <li key={el.id}><Link to={'/'}>{el.name}</Link></li>
                                                    )
                                                }

                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;