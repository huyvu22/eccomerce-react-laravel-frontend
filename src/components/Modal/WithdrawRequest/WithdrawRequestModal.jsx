import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import useClient from "../../../services/Hooks/useClient";
import {getCookie} from "../../../utils/dataHandler";
import {toast} from "react-toastify";

const WithdrawRequestModal = (props) => {
    const client = useClient();
    const [method, setMethod] = useState('Bank');
    const [amount, setAmount] = useState('');
    const [account, setAccount] = useState('')
    const [withdrawMethod, setWithdrawMethod] = useState([])
    const sellerToken = getCookie('seller_access_token');

    const getMethod = async () => {
        const res = await client.get('seller/withdraw/method', '', sellerToken);
        if (res.response.ok) {
            const dataObj = await res.data;
            setWithdrawMethod(dataObj.data)

        }
    }
    useEffect(() => {
        getMethod();
    }, []);

    const sendRequestWithdraw = async () => {
        if (!sellerToken) {
            console.error('User token not found');
            return;
        }

        const formData = {
            'method': method,
            'withdraw_amount': amount,
            'account_info': account,
        }
        const res = await client.post('seller/withdraw/request', formData, '', sellerToken)
        if (res.response.ok) {
            const data = await res.data;
            if (data.status === 'success') {
                props.setModalShow(false)
                props.setSendRequest(true)
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }

        } else {
            const data = await res.data;
            console.log(Object.values(data.message))
            let messages = Object.values(data.message);
            messages.forEach(message => toast.error(message[0]));
        }
    }

    return (
        <>
            <Modal
                {...props}
                // size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Request Withdraw</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Amount:</Form.Label>
                            <Form.Control type="text" autoFocus={true} onChange={(e) => setAmount(e.target.value)}/>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Method:</Form.Label>
                            <Form.Select onChange={(e) => setMethod(e.target.value)} aria-label="Default select example">
                                {
                                    withdrawMethod?.map((item) => (
                                        <option key={item.id} value={item.name} selected={method === item.name}>
                                            {item.name} (fee {item.withdraw_charge}%)
                                        </option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>

                        {
                            method === 'Bank' ?
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Bank A/C Details:</Form.Label>
                                    <Form.Control as="textarea" rows={3} type="text" onChange={(e) => setAccount(e.target.value)} defaultValue={'A/c Number 12345678\n' +
                                        'ABC Bank\n' +
                                        'Nguyen Van A'}/>
                                </Form.Group> :
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>PayPal Address: </Form.Label>
                                    <Form.Control type="text" defaultValue={'paypal@mymail.com'} onChange={(e) => setAccount(e.target.value)}/>
                                </Form.Group>
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="form" onClick={sendRequestWithdraw}>
                        SEND REQUEST
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    );
};

export default WithdrawRequestModal;