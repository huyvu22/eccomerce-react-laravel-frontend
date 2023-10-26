import React from 'react';
import Modal from "react-bootstrap/Modal";
import './ModalLogin.scss';
import {Link} from "react-router-dom";


const ModalLogin = (props) => {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName="modal-login"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Login required</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mx-auto action">
                <Link to="/buyer/login" className="btn btn-inline me-3">Login</Link>
                <Link to="/buyer/register" className="btn btn-inline">Register</Link>
            </Modal.Body>
        </Modal>

    );
};

export default ModalLogin;