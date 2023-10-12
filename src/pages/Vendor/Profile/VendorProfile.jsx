import React, {useEffect, useState} from 'react';
import './VendorProfile.scss';
import button from "bootstrap/js/src/button";
import {BiEdit} from "react-icons/bi";
import SingleBanner from "../../../components/SingleBanner/SingleBanner";
import Phone from "../../../components/Modal/Phone/Phone";
import Address from "../../../components/Modal/Address/Address";
import ProfileInfo from "../../../components/Modal/ProfileInfo/ProfileInfo";
import ChangePassword from "../../../components/Modal/ChangePassword/ChangePassword";
import useClient from "../../../services/Hooks/useClient";
import {getCookie} from "../../../utils/dataHandler";
import AboutMe from "../../../components/Modal/AboutMe/AboutMe";
import {asset} from "../../../services/Helpers/Image/image";
import ModalPreviewItem from "../../../components/ModalPreviewItem/ModalPreviewItem";

const VendorProfile = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [modalPhoneShow, setModalPhoneShow] = useState(false);
    const [modalAddressShow, setModalAddressShow] = useState(false);
    const [modalAboutMeShow, setModalAboutMeShow] = useState(false);
    const [modalChangePasswordShow, setModalChangePasswordShow] = useState(false);
    const [modalEditProfileShow, setModalEditProfileShow] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [reviewImage, setReviewImage] = useState('')
    const client = useClient();

    const getSellerInfo = async () => {
        setLoading(true);
        const sellerToken = getCookie('seller_access_token');
        if (!sellerToken) {
            console.error('User token not found');
            return;
        }
        const res = await client.get('seller/address', '', sellerToken);
        if (res.response.ok) {
            const dataObj = await res.data;
            setUserInfo(dataObj.data[0])
            setLoading(false)
        }
    }

    useEffect(() => {
        getSellerInfo();
    }, []);

    const handleDivClick = (index) => {
        setActiveIndex(index);
    };

    const handlePreviewImage = (image) => {
        setModalShow(true);
        setReviewImage(image);
    }

    return (
        <>
            <SingleBanner name="MY PROFILE"/>
            {
                loading ?
                    <div className="loading">
                        <h3>Loading...</h3>
                    </div>
                    :
                    <>
                        <section className='inner-section profile-part'>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="account-card">
                                            <div className="account-title">
                                                <h4>Your Profile</h4>
                                                <button onClick={() => setModalEditProfileShow(true)}>
                                                    edit Profile
                                                </button>
                                            </div>
                                            <div className="account-content">
                                                <div className="row">
                                                    <div className="col-lg-2">
                                                        <div className="profile-image"><a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#show_photo"><img
                                                            src={asset(userInfo?.banner)} alt='img' onClick={() => handlePreviewImage(userInfo?.banner)}/></a></div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-4">
                                                        <div className="form-group">
                                                            <label>Name</label>
                                                            <input type="text" className="form-control" value={userInfo.shop_name} placeholder="Update your name..."/>
                                                        </div>

                                                    </div>
                                                    <div className="col-md-6 col-lg-4">
                                                        <div className="form-group">
                                                            <label>Email</label>
                                                            <input type="text" className="form-control" disabled={true} value={userInfo.email} placeholder="Update your email..."/>
                                                        </div>

                                                    </div>
                                                    <div className="col-lg-2">
                                                        <div className="profile-btn">
                                                            <button onClick={() => setModalChangePasswordShow(true)}> Change Pass.</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="account-card">
                                            <div className="account-title">
                                                <h4>Contact Number</h4>
                                            </div>
                                            <div className="account-content">
                                                <div className="row">
                                                    <div className="col-md-6 col-lg-6">
                                                        <div className={`profile-card contact ${activeIndex === 0 ? 'active' : ''}`} onClick={() => handleDivClick(0)}>
                                                            <h3>Phone</h3>
                                                            <p>{userInfo.phone ?? '-'}</p>
                                                            <ul>
                                                                <li onClick={() => setModalPhoneShow(true)}>
                                                                    <button className="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#phone-edit">
                                                                        <span><BiEdit/></span></button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-6">
                                                        <div className={`profile-card contact ${activeIndex === 1 ? 'active' : ''}`} onClick={() => handleDivClick(1)}>
                                                            <h3>Address</h3>
                                                            {userInfo?.address
                                                                ?
                                                                <p>
                                                                    {userInfo?.address},
                                                                </p>
                                                                :
                                                                '-'
                                                            }
                                                            <ul>
                                                                <li onClick={() => setModalAddressShow(true)}>
                                                                    <button className="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#phone-edit">
                                                                        <span><BiEdit/></span></button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="account-card">
                                            <div className="account-title">
                                                <h4>About Me</h4>
                                            </div>
                                            <div className="account-content">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className={`profile-card contact ${activeIndex === 2 ? 'active' : ''}`} onClick={() => handleDivClick(2)}>
                                                            <p>{userInfo.description}</p>
                                                            <ul>
                                                                <li onClick={() => setModalAboutMeShow(true)}>
                                                                    <button className="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#about-me-edit">
                                                                        <span><BiEdit/></span></button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Phone show={modalPhoneShow}
                                       onHide={() => setModalPhoneShow(false)} userInfo={userInfo} setUserInfo={setUserInfo}/>
                                <Address show={modalAddressShow}
                                         onHide={() => setModalAddressShow(false)} userInfo={userInfo} setUserInfo={setUserInfo}/>
                                <AboutMe show={modalAboutMeShow}
                                         onHide={() => setModalAboutMeShow(false)} userInfo={userInfo} setUserInfo={setUserInfo}/>
                                <ProfileInfo show={modalEditProfileShow}
                                             onHide={() => setModalEditProfileShow(false)} userInfo={userInfo} setUserInfo={setUserInfo}/>
                                <ChangePassword show={modalChangePasswordShow}
                                                onHide={() => setModalChangePasswordShow(false)} userInfo={userInfo}/>
                            </div>
                        </section>
                        <ModalPreviewItem
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            reviewImage={reviewImage}
                        />
                    </>
            }
        </>

    );
};

export default VendorProfile;