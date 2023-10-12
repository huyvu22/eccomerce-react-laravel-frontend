import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import ProductActions from "../../ProductActions/ProductActions";
import useClient from "../../../services/Hooks/useClient";
import useMyCart from "../../../services/Hooks/useMyCart";
import button from "bootstrap/js/src/button";
import {FaShoppingBasket} from "react-icons/fa";
import {addItem} from "../../ProductCard/ProductCardSlice";
import {useDispatch} from "react-redux";

const EditQuantity = (props) => {
    const dispatch = useDispatch();
    const {itemEditQty} = props;
    const [myCart] = useMyCart();
    const product = myCart?.find(product => product.slug === itemEditQty.slug);

    const handleAddItem = (item) => {
        let productWithQuantity = {...item, quantity: 1};
        dispatch(addItem(productWithQuantity));
    }

    return (
        <>
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-phone-number"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{itemEditQty.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Quantity:</Form.Label>
                            {
                                product ?
                                    <ProductActions quantity={product.quantity} item={product}/>
                                    :
                                    <button className="product-add" onClick={() => handleAddItem(itemEditQty)}>
                                        <span><FaShoppingBasket/></span><span>Add to Cart</span>
                                    </button>
                            }
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default EditQuantity;