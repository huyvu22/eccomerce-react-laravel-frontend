import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {toast} from "react-toastify";

const Note = (props) => {
    const [note, setNote] = useState('');
    const {userAddress} = props;
    const handleStoreNote = async () => {
        const userToken = JSON.parse(localStorage.getItem('userToken'));

        const formData = {
            name: userAddress.name,
            email: userAddress.email,
            phone: userAddress.phone,
            province: userAddress.province,
            district: userAddress.district,
            ward: userAddress.ward,
            address: userAddress.address,
            note: note
        };

        try {
            const response = await fetch('http://buynow.test/api/address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken?.token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            toast('Address stored successfully');
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
                dialogClassName="modal-note"
            >
                <Modal.Header closeButton>
                    <Modal.Title><b>Note</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Control as="textarea" rows={3} type="note" onChange={(e) => setNote(e.target.value)} defaultValue={userAddress.note}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="form" onClick={handleStoreNote}>
                        SAVE NOTE
                    </Button>
                </Modal.Footer>

            </Modal>

        </>
    );
};

export default Note;