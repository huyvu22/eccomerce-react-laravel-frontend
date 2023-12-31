import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {toast} from "react-toastify";
import {getCookie} from "../../../utils/dataHandler";
import useClient from "../../../services/Hooks/useClient";

const Note = (props) => {
    const [editNote, setEditNote] = useState('');
    const {userInfo, setUserInfo} = props;
    const client = useClient();
    const handleStoreNote = async () => {
        const userToken = getCookie('user_access_token') || getCookie('seller_access_token');

        const formData = {
            name: userInfo.name,
            email: userInfo.email,
            phone: userInfo.phone,
            province: userInfo.province,
            district: userInfo.district,
            ward: userInfo.ward,
            address: userInfo.address,
            note: editNote
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
                    <Modal.Title>Edit Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Control as="textarea" rows={3} type="note" onChange={(e) => setEditNote(e.target.value)} defaultValue={editNote ? editNote : userInfo?.note}/>
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