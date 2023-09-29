import React, {useEffect, useState} from 'react';
import './ChangePassword.scss';
import {toast} from "react-toastify";
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {getCookie} from "../../../utils/dataHandler";
import useClient from "../../../services/Hooks/useClient";

const ChangePassword = (props) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const client = useClient();

    const handleStorePassword = async () => {
        const userToken = getCookie('user_access_token') || getCookie('seller_access_token');
        let formData = {
            'current_password': currentPassword,
            'password': newPassword,
            'password_confirmation': passwordConfirmation
        };

        try {
            // const response = await fetch('http://buynow.com/api/change-password', {
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
            //     toast('Update password successful')
            // } else {
            //     if (data.message) {
            //         const errorMessages = data.message;
            //
            //         Object.keys(errorMessages).forEach(field => {
            //             const errorList = errorMessages[field];
            //             const errorMessage = errorList.join(', ');
            //
            //             toast.error(`${errorMessage}`);
            //         });
            //     }
            // }

            const res = await client.post('change-password', formData, '', userToken);
            const data = await res.data;

            if (data.status === 'success') {
                toast('Update password successful')
            } else {
                if (data.message) {
                    const errorMessages = data.message;
                    Object.keys(errorMessages).forEach(field => {
                        const errorList = errorMessages[field];
                        const errorMessage = errorList.join(', ');
                        toast.error(`${errorMessage}`);
                    });
                }
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
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Current Password:</Form.Label>
                            <Form.Control
                                type="password"
                                autoFocus
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Form>

                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>New Password:</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Form>

                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="form" onClick={handleStorePassword}>
                        UPDATE PASSWORD
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    );
};

export default ChangePassword;