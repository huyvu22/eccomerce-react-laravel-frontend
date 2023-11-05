import React, {useEffect, useState} from 'react';
import './Phone.scss';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {toast} from "react-toastify";
import {getCookie} from "../../../utils/dataHandler";
import useClient from "../../../services/Hooks/useClient";

const Phone = (props) => {
    const [editPhone, setEditPhone] = useState('');
    const {userInfo, setUserInfo} = props;
    const client = useClient();
    const isBuyer = getCookie('user_access_token');

    const handleStorePhone = async () => {
        const userToken = getCookie('user_access_token') || getCookie('seller_access_token');

        if (isBuyer) {
            const formData = {
                name: userInfo?.name,
                email: userInfo?.email,
                phone: editPhone,
                province: userInfo?.province,
                district: userInfo?.district,
                ward: userInfo?.ward,
                address: userInfo?.address,
                note: userInfo?.note
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
                console.error('Error storing address:', error);
            }
        } else {
            const formData = {
                shop_name: userInfo?.shop_name,
                email: userInfo?.email,
                phone: editPhone ?? userInfo?.phone,
                address: userInfo?.address,
                banner: userInfo?.banner,
                description: userInfo?.description
            };
            try {
                const res = await client.post('seller/address', formData, '', userToken)
                if (res.response.ok) {
                    const data = await res.data;
                    if (data.status === 'success') {
                        toast('Address stored successfully');
                        setUserInfo(data.data)
                    }
                }

            } catch (error) {
                console.error('Error storing address:', error);
            }
        }
    }


    return (
        <>
            <Modal
                {...props}
                // size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-phone-number"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Phone</Modal.Title>
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