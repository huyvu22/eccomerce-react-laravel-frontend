import React, {useEffect, useState} from 'react';
import './Phone.scss';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {toast} from "react-toastify";
import {getCookie} from "../../../utils/dataHandler";

const Phone = (props) => {
    const [editPhone, setEditPhone] = useState('');
    const {userInfo, setPhone} = props;

    const handleStorePhone = async () => {
        const userToken = getCookie('user_access_token') || getCookie('seller_access_token');
        const formData = {
            name: userInfo.name,
            email: userInfo.email,
            phone: editPhone,
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
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.status === 'success') {
                setPhone(editPhone)
                toast('Address stored successfully');
            }

        } catch (error) {
            console.error('Error storing address:', error);
        }

    }
    useEffect(() => {
        handleStorePhone();
    }, [])

    return (
        <>
            <Modal
                {...props}
                // size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-phonenumber"
            >
                <Modal.Header closeButton>
                    <Modal.Title><b>Edit Phone</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label><b>Phone:</b></Form.Label>
                            <Form.Control
                                type="phone"
                                autoFocus
                                defaultValue={editPhone ? editPhone : userInfo?.phone}
                                onChange={(e) => setEditPhone(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="form" onClick={handleStorePhone}>
                        SAVE PHONE NUMBER
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Phone;