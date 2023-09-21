import React, {useEffect, useState} from 'react';
import './ProfileInfo.scss'
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {toast} from "react-toastify";
import {getCookie} from "../../../utils/dataHandler";

const ProfileInfo = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const {userInfo, setUserInfo} = props;

    const handleStoreProfileInfo = async () => {
        const userToken = getCookie('user_access_token') || getCookie('seller_access_token');
        const formData = {
            name: name !== '' ? name : userInfo.name,
            email: email !== '' ? email : userInfo.email,
            phone: userInfo.phone,
            province: userInfo.province,
            district: userInfo.district,
            ward: userInfo.ward,
            address: userInfo.address,
            note: userInfo.note
        };

        try {
            const response = await fetch('http://buynow.test/api/address', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.status === 'success') {
                setUserInfo(data.data)
                toast('Address updated successfully');
            }

        } catch (error) {
            console.error('Error storing address:');
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
                    <Modal.Title><b>Edit Profile Info</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label><b>Name:</b></Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                defaultValue={props.userInfo?.name}
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
                                onChange={(e) => setEmail(e.target.value)}
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