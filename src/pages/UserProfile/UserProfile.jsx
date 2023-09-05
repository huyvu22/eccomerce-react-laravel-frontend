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

const UserProfile = () => {
    const [userAddress, setUserAddress] = useState([]);
    const [modalPhoneShow, setModalPhoneShow] = useState(false);
    const [modalAddressShow, setModalAddressShow] = useState(false);
    const [modalNoteShow, setModalNoteShow] = useState(false);
    const [modalChangePasswordShow, setModalChangePasswordShow] = useState(false);
    const [modalEditProfileShow, setModalEditProfileShow] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [loading, setLoading] = useState(false)

    const getUserAddress = async () => {
        const userToken = JSON.parse(localStorage.getItem('userToken'));
        if (!userToken) {
            console.error('User token not found');
            return;
        }
        setLoading(true)
        const res = await fetch('http://buynow.test/api/address', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken.token}`,
            }
        });

        let data = await res.json();
        if (data.length) {
            setUserAddress(data[0])
            setLoading(false)
        }

    }

    useEffect(() => {
        getUserAddress();
    }, []);

    const handleDivClick = (index) => {
        setActiveIndex(index);
    };

    console.log(userAddress)

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
                                                        <input type="text" className="form-control" value={userAddress.name} placeholder="Update your name..."/>
                                                    </div>

                                                </div>
                                                <div className="col-md-6 col-lg-5">
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <input type="text" className="form-control" value={userAddress.email} placeholder="Update your email..."/>
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
                                                        <p>{userAddress?.phone ? userAddress?.phone : '-'}</p>
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
                                                        {userAddress?.address
                                                            ?

                                                            <p>
                                                                {userAddress?.address},
                                                                {userAddress?.ward && ` ${JSON.parse(userAddress?.ward)?.label}`},
                                                                {userAddress?.district && ` ${JSON.parse(userAddress?.district)?.label}`},
                                                                {userAddress?.province && ` ${JSON.parse(userAddress?.province)?.label}`}
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
                                                        <p>{userAddress?.note ? userAddress?.note : '-'}</p>
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
                                   onHide={() => setModalPhoneShow(false)} userAddress={userAddress}/>
                            <Address show={modalAddressShow}
                                     onHide={() => setModalAddressShow(false)} userAddress={userAddress}/>
                            <Note show={modalNoteShow}
                                  onHide={() => setModalNoteShow(false)} userAddress={userAddress}/>
                            <ProfileInfo show={modalEditProfileShow}
                                         onHide={() => setModalEditProfileShow(false)} userAddress={userAddress}/>
                            <ChangePassword show={modalChangePasswordShow}
                                            onHide={() => setModalChangePasswordShow(false)} userAddress={userAddress}/>
                        </div>

                    </section>
            }

        </>

    );
};

export default UserProfile;