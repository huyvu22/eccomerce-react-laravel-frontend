import React, {useState} from 'react';
import './ModalCompareItems.scss'
import Modal from "react-bootstrap/Modal";
import button from "bootstrap/js/src/button";
import TableItem from "./TableItem/TableItem";
import {useDispatch} from "react-redux";
import {deleteCompareList} from "../ProductCard/ProductCardSlice";

const ModalCompareItems = (props) => {

    const dispatch = useDispatch();
    const handleDeleteAllItem = () => {
        dispatch(deleteCompareList());
        props.setModalShow(false);
    }
    return (
        <div className="content col-sm-12">
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h3>Product Comparison</h3>
                        <button className="btn btn-danger" style={{fontSize: "100%"}}
                                onClick={() => handleDeleteAllItem()}>Remove All
                        </button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="table-responsive">
                        <TableItem {...props}/>
                    </div>
                </Modal.Body>
            </Modal>
        </div>

    );
};

export default ModalCompareItems;