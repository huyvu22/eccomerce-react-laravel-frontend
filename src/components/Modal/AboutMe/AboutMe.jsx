import React, {useEffect, useState} from 'react';
import './AboutMe.scss';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {toast} from "react-toastify";
import {getCookie} from "../../../utils/dataHandler";
import useClient from "../../../services/Hooks/useClient";

const AboutMe = (props) => {
    const [description, setDescription] = useState('');
    const {userInfo, setUserInfo} = props;
    const client = useClient();
    const handleStoreNote = async () => {
        const userToken = getCookie('seller_access_token');

        const formData = {
            shop_name: userInfo?.shop_name,
            email: userInfo?.email,
            phone: userInfo?.phone,
            address: userInfo?.address,
            banner: userInfo?.banner,
            description: description ?? userInfo?.description
        };

        try {
            // const response = await fetch('http://buynow.test/api/address', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${userToken}`
            //     },
            //     body: JSON.stringify(formData)
            // });
            //
            // const data = await response.json();
            // if (data.status === 'success') {
            //     setNote(editNote)
            //     toast('Address stored successfully');
            // }

            const res = await client.post('seller/address', formData, '', userToken)
            if (res.response.ok) {
                const data = await res.data;
                if (data.status === 'success') {
                    setDescription(description)
                    setUserInfo(data.data)
                    toast('Address stored successfully');
                }
            }

        } catch (error) {
            console.error('Error storing address:', error);
        }

    }

    return (
        <>
            <Modal
                {...props}
                // size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-about-me"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit About Me</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Control as="textarea" rows={3} type="note" onChange={(e) => setDescription(e.target.value)}
                                          defaultValue={description ? description : userInfo?.description}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="form" onClick={handleStoreNote}>
                        SAVE
                    </Button>
                </Modal.Footer>

            </Modal>

        </>
    );
};

export default AboutMe;