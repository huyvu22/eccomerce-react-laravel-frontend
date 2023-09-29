import React, {useEffect, useState} from 'react';
import './ProfileInfo.scss'
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {toast} from "react-toastify";
import {getCookie} from "../../../utils/dataHandler";
import useClient from "../../../services/Hooks/useClient";
import {useLocation} from "react-router-dom";
import config from "../../../configs/Config.json";

const ProfileInfo = (props) => {
    const [name, setName] = useState('');
    const [banner, setBanner] = useState(null);
    const {userInfo, setUserInfo} = props;
    const {SERVER_API} = config;
    const client = useClient();
    const location = useLocation();
    const isBuyer = location.pathname.includes('/buyer/my-profile')

    const handleStoreProfileInfo = async () => {
        const userToken = getCookie('user_access_token') || getCookie('seller_access_token');

        if (isBuyer) {
            const formData = {
                name: name ?? userInfo.name,
                email: userInfo.email,
                phone: userInfo.phone,
                province: userInfo.province,
                district: userInfo.district,
                ward: userInfo.ward,
                address: userInfo.address,
                note: userInfo.note
            };

            try {
                const res = await client.post('address', formData, '', userToken)
                if (res.response.ok) {
                    const data = await res.data;
                    if (data.status === 'success') {
                        setUserInfo(data.data)
                        toast('Address stored successfully');
                    }
                }

            } catch (error) {
                console.error('Error storing address:');
            }
        } else {

            const formData = new FormData();
            formData.append("shop_name", name ?? userInfo?.shop_name);
            formData.append("email", userInfo?.email);
            formData.append("phone", userInfo?.phone);
            formData.append("address", userInfo?.address);
            formData.append("banner", banner ?? (userInfo?.banner));
            formData.append("description", userInfo?.description);

            try {
                // const res = await client.post('seller/address', formData, '', userToken)
                // if (res.response.ok) {
                //     const data = await res.data;
                //     if (data.status === 'success') {
                //         setUserInfo(data.data)
                //         toast('Address stored successfully');
                //     }
                // }

                let res = await fetch(`${SERVER_API}seller/address`, {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    },
                    body: formData,
                })
                const response = await res.json();
                console.log(response)

                if (response.status === 'success') {
                    toast('Address stored successfully');
                    setUserInfo(response.data)
                } else {
                    toast.error(response.data.shop_name[0])
                }


            } catch (error) {
                console.error('Error storing address:');
            }
        }


    }

    return (
        <>
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-profile-info"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        !isBuyer &&
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label><b>Banner:</b></Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={(e) => setBanner(e.target.files[0])}
                                />
                            </Form.Group>
                        </Form>
                    }

                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label><b>Name:</b></Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                defaultValue={props.userInfo?.name ?? props.userInfo?.shop_name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>

                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label><b>Email:</b></Form.Label>
                            <Form.Control
                                type="email"
                                defaultValue={props.userInfo?.email}
                                disabled={true}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="form" onClick={handleStoreProfileInfo}>
                        SAVE PROFILE INFO
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    );
};

export default ProfileInfo;