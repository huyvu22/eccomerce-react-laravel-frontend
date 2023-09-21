import React, {useEffect, useState} from 'react';
import './UserProfile.scss';
import button from "bootstrap/js/src/button";
import {BiEdit} from "react-icons/bi";
import {useDispatch} from "react-redux";
import SingleBanner from "../../components/SingleBanner/SingleBanner";
import Phone from "../../components/Modal/Phone/Phone";
import Address from "../../components/Modal/Address/Address";
import Note from "../../components/Modal/Note/Note";
import ProfileInfo from "../../components/Modal/ProfileInfo/ProfileInfo";
import ChangePassword from "../../components/Modal/ChangePassword/ChangePassword";
import {getCookie} from "../../utils/dataHandler";

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [modalPhoneShow, setModalPhoneShow] = useState(false);
    const [modalAddressShow, setModalAddressShow] = useState(false);
    const [modalNoteShow, setModalNoteShow] = useState(false);
    const [modalChangePasswordShow, setModalChangePasswordShow] = useState(false);
    const [modalEditProfileShow, setModalEditProfileShow] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [phone, setPhone] = useState('');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false)

    const getUserAddress = async () => {
        const userToken = getCookie('user_access_token') || getCookie('seller_access_token');
        if (!userToken) {
            console.error('User token not found');
            return;
        }
        setLoading(true)
        const res = await fetch('http://buynow.test/api/address', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            }
        });

        let data = await res.json();
        if (data.length) {
            setUserInfo(data[0])
            setPhone(data[0].phone)
            setNote(data[0].note)
            setLoading(false)
        }
    }

    useEffect(() => {
        getUserAddress();
    }, []);

    const handleDivClick = (index) => {
        setActiveIndex(index);
    };


    return (
        <>
            <SingleBanner name="MY PROFILE"/>
            {
                loading === true
                    ?
                    <div className="loading">
                        <h3>Loading...</h3>
                    </div>
                    :
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
                                                <div className="col-md-6 col-lg-5">
                                                    <div className="form-group">
                                                        <label>Name</label>
                                                        <input type="text" className="form-control" value={userInfo?.name} placeholder="Update your name..."/>
                                                    </div>

                                                </div>
                                                <div className="col-md-6 col-lg-5">
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <input type="text" className="form-control" value={userInfo?.email} placeholder="Update your email..."/>
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
                                                <div className="col-md-6 col-lg-4">
                                                    <div className={`profile-card contact ${activeIndex === 0 ? 'active' : ''}`} onClick={() => handleDivClick(0)}>
                                                        <h3>Phone</h3>
                                                        <p>{phone ? phone : '-'}</p>
                                                        <ul>
                                                            <li onClick={() => setModalPhoneShow(true)}>
                                                                <button className="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#phone-edit">
                                                                    <span><BiEdit/></span></button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4">
                                                    <div className={`profile-card contact ${activeIndex === 1 ? 'active' : ''}`} onClick={() => handleDivClick(1)}>
                                                        <h3>Address</h3>
                                                        {userInfo
                                                            ?
                                                            <p>
                                                                {userInfo?.address},
                                                                {userInfo?.ward && ` ${JSON.parse(userInfo?.ward)?.label}`},
                                                                {userInfo?.district && ` ${JSON.parse(userInfo?.district)?.label}`},
                                                                {userInfo?.province && ` ${JSON.parse(userInfo?.province)?.label}`}
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
                                                <div className="col-md-6 col-lg-4">
                                                    <div className={`profile-card contact ${activeIndex === 2 ? 'active' : ''}`} onClick={() => handleDivClick(2)}>
                                                        <h3>Note</h3>
                                                        <p>{note ? note : '-'}</p>
                                                        <ul>
                                                            <li onClick={() => setModalNoteShow(true)}>
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
                            </div>
                            <Phone show={modalPhoneShow}
                                   onHide={() => setModalPhoneShow(false)} userInfo={userInfo} setPhone={setPhone}/>
                            <Address show={modalAddressShow}
                                     onHide={() => setModalAddressShow(false)} userInfo={userInfo} setUserInfo={setUserInfo}/>
                            <Note show={modalNoteShow}
                                  onHide={() => setModalNoteShow(false)} userInfo={userInfo} setNote={setNote}/>
                            <ProfileInfo show={modalEditProfileShow}
                                         onHide={() => setModalEditProfileShow(false)} userInfo={userInfo} setUserInfo={setUserInfo}/>
                            <ChangePassword show={modalChangePasswordShow}
                                            onHide={() => setModalChangePasswordShow(false)} userInfo={userInfo}/>
                        </div>

                    </section>
            }

        </>

    );
};

export default UserProfile;