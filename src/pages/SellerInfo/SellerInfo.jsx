import React, {useEffect, useState} from 'react';
import SingleBanner from "../../components/SingleBanner/SingleBanner";
import button from "bootstrap/js/src/button";
import {asset} from "../../services/Helpers/Image/image";
import {BiEdit} from "react-icons/bi";
import ModalPreviewItem from "../../components/ModalPreviewItem/ModalPreviewItem";
import {useLocation, useParams} from "react-router-dom";
import {getCookie} from "../../utils/dataHandler";
import useClient from "../../services/Hooks/useClient";

const SellerInfo = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [reviewImage, setReviewImage] = useState('');
    const {id} = useParams();
    const client = useClient();

    const getSellerInfo = async () => {
        setLoading(true);
        const res = await client.get(`seller/profile/${id}`);
        if (res.response.ok) {
            const dataObj = await res.data;
            setUserInfo(dataObj.data)
            setLoading(false)
        }
    }

    useEffect(() => {
        getSellerInfo();
    }, []);

    const handlePreviewImage = (image) => {
        setModalShow(true);
        setReviewImage(image);
    }
    return (
        <>
            <SingleBanner name={userInfo.shop_name}/>
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
                                                <h4>{userInfo.shop_name} Profile</h4>
                                            </div>
                                            <div className="account-content">
                                                <div className="row">
                                                    <div className="col-lg-2">
                                                        <div className="profile-image"><a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#show_photo"><img
                                                            src={asset(userInfo?.banner)} alt='img' onClick={() => handlePreviewImage(userInfo?.banner)}/></a></div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-5">
                                                        <div className="form-group profile-card">
                                                            <label>Name:</label>
                                                            <p>{userInfo.shop_name}</p>
                                                        </div>

                                                    </div>
                                                    <div className="col-md-6 col-lg-5">
                                                        <div className="form-group profile-card">
                                                            <label>Email:</label>
                                                            <p>{userInfo.email}</p>
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
                                                        <div className="profile-card contact">
                                                            <h3>Phone</h3>
                                                            <p>{userInfo.phone ?? '-'}</p>
                                                            <ul>
                                                                <li>
                                                                    <button className="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#phone-edit">
                                                                        <span><BiEdit/></span></button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-6">
                                                        <div className="profile-card contact">
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
                                                                <li>
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
                                                        <div className="profile-card contact">
                                                            <p>{userInfo.description}</p>
                                                            <ul>
                                                                <li>
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

export default SellerInfo;