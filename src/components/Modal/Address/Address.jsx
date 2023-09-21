import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import Select from 'react-select'
import {toast} from "react-toastify";
import useClient from "../../../services/Hooks/useClient";
import {getCookie} from "../../../utils/dataHandler";

const Address = (props) => {
    const client = useClient();
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [province, setProvince] = useState(null);
    const [district, setDistrict] = useState(null);
    const [ward, setWard] = useState(null);
    const [address, setAddress] = useState('');

    const {userInfo, setUserInfo} = props;

    const getProvince = async () => {
        const res = await client.get('province');
        if (res.data.data.length) {
            setProvinces(res.data.data);
        }
    }

    const getDistrict = async () => {
        if (province !== null) {
            const res = await client.get(`district/${province?.value}`);
            if (res.data.data.length) {
                setDistricts(res.data.data);
            }
        }

    }

    const getWard = async () => {
        if (district !== null) {
            const res = await client.get(`ward/${district?.value}`);
            if (res.data.data.length) {
                setWards(res.data.data);
            }
        }
    }

    useEffect(() => {
        getProvince();
        getDistrict();
        getWard()
    }, [province?.value, district?.value]);

    const handleStoreAddress = async () => {
        const userToken = getCookie('user_access_token') || getCookie('seller_access_token');
        if (userInfo.address !== '') {
            const formData = {
                name: userInfo.name,
                email: userInfo.email,
                phone: userInfo.phone,
                province: province ? JSON.stringify(province) : userInfo.province,
                district: district ? JSON.stringify(district) : userInfo.district,
                ward: ward ? JSON.stringify(ward) : userInfo.ward,
                address: address,
                note: userInfo.note
            };

            try {
                const response = await fetch('http://buynow.test/api/address', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                if (data.status === 'success') {
                    setUserInfo(data.data);
                    toast('Address stored successfully');
                }

            } catch (error) {
                console.error('Error storing address:', error);
            }
        } else {
            return toast.error('Please provide a user address')
        }
    }

    return (
        <>
            <Modal
                {...props}
                // size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-address"
            >
                <Modal.Header closeButton>
                    <Modal.Title><b>Edit Address</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label><b>Province/City:</b></Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option value="1">Viet Nam</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>

                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label><b>Province/City:</b></Form.Label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                defaultValue={userInfo?.province ? JSON.parse(userInfo.province) : ''}
                                isDisabled={isDisabled}
                                isLoading={isLoading}
                                isClearable={isClearable}
                                isRtl={isRtl}
                                isSearchable={isSearchable}
                                name="provinces"
                                options={provinces}
                                onChange={setProvince}
                            />
                        </Form.Group>
                    </Form>

                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label><b>District:</b></Form.Label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                defaultValue={userInfo?.district ? JSON.parse(userInfo.district) : ''}
                                isDisabled={isDisabled}
                                isLoading={isLoading}
                                isClearable={isClearable}
                                isRtl={isRtl}
                                isSearchable={isSearchable}
                                name="districts"
                                options={districts}
                                onChange={setDistrict}

                            />
                        </Form.Group>
                    </Form>

                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label><b>Warn:</b></Form.Label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                defaultValue={userInfo?.ward ? JSON.parse(userInfo.ward) : ''}
                                isDisabled={isDisabled}
                                isLoading={isLoading}
                                isClearable={isClearable}
                                isRtl={isRtl}
                                isSearchable={isSearchable}
                                name="wards"
                                options={wards}
                                onChange={setWard}
                            />
                        </Form.Group>
                    </Form>

                    <Form>
                        <Form.Label><b>Address:</b></Form.Label>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Control as="textarea" rows={3}
                                          defaultValue={userInfo?.address}
                                          onChange={(e) => setAddress(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="form" onClick={handleStoreAddress}>
                        SAVE ADDRESS
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    );
};

export default Address;