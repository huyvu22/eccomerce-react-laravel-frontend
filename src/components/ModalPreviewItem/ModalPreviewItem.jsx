import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './ModalPreviewItem.scss'

const ModalPreviewItem = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2>Title</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium culpa cumque itaque maxime
                    necessitatibus nostrum optio quae, quaerat quis saepe, sapiente ullam! Ab aliquid aspernatur
                    laboriosam mollitia numquam repudiandae voluptatum!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium culpa cumque itaque maxime
                    necessitatibus nostrum optio quae, quaerat quis saepe, sapiente ullam! Ab aliquid aspernatur
                    laboriosam mollitia numquam repudiandae voluptatum!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium culpa cumque itaque maxime
                    necessitatibus nostrum optio quae, quaerat quis saepe, sapiente ullam! Ab aliquid aspernatur
                    laboriosam mollitia numquam repudiandae voluptatum!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium culpa cumque itaque maxime
                    necessitatibus nostrum optio quae, quaerat quis saepe, sapiente ullam! Ab aliquid aspernatur
                    laboriosam mollitia numquam repudiandae voluptatum!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium culpa cumque itaque maxime
                    necessitatibus nostrum optio quae, quaerat quis saepe, sapiente ullam! Ab aliquid aspernatur
                    laboriosam mollitia numquam repudiandae voluptatum!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium culpa cumque itaque maxime
                    necessitatibus nostrum optio quae, quaerat quis saepe, sapiente ullam! Ab aliquid aspernatur
                    laboriosam mollitia numquam repudiandae voluptatum!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium culpa cumque itaque maxime
                    necessitatibus nostrum optio quae, quaerat quis saepe, sapiente ullam! Ab aliquid aspernatur
                    laboriosam mollitia numquam repudiandae voluptatum!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium culpa cumque itaque maxime
                    necessitatibus nostrum optio quae, quaerat quis saepe, sapiente ullam! Ab aliquid aspernatur
                    laboriosam mollitia numquam repudiandae voluptatum!
                </p>
            </Modal.Body>

        </Modal>
    );
};

export default ModalPreviewItem;