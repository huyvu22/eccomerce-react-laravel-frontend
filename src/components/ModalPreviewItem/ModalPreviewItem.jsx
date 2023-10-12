import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './ModalPreviewItem.scss'
import {asset} from "../../services/Helpers/Image/image";

const ModalPreviewItem = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/*<Modal.Header closeButton>*/}
            {/*    /!*<Modal.Title id="contained-modal-title-vcenter">*!/*/}
            {/*    /!*    <h2>Title</h2>*!/*/}
            {/*    /!*</Modal.Title>*!/*/}
            {/*</Modal.Header>*/}
            <Modal.Body>
                <img src={asset(props?.reviewImage)} alt="img"/>
            </Modal.Body>

        </Modal>
    );
};

export default ModalPreviewItem;