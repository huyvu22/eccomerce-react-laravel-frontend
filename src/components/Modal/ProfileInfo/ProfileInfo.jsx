import React, {useEffect, useState} from 'react';
import './ProfileInfo.scss'
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {toast} from "react-toastify";

const ProfileInfo = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const {userAddress} = props;

    const handleStoreProfileInfo = async () => {
        const userToken = JSON.parse(localStorage.getItem('userToken'));
        const formData = {
            name: name !== '' ? name : userAddress.name,
            email: email !== '' ? email : userAddress.email,
            phone: userAddress.phone,
            province: userAddress.province,
            district: userAddress.district,
            ward: userAddress.ward,
            address: userAddress.address,
            note: userAddress.note
        };

        try {
            const response = await fetch('http://buynow.test/api/address', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken?.token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log(data)
            toast('Address stored successfully');
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
                                defaultValue={props.userAddress?.name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>

                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label><b>Email:</b></Form.Label>
                            <Form.Control
                                type="email"
                                defaultValue={props.userAddress?.email}
                                onChange={(e) => setEmail(e.target.value)}
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