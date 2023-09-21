import React, {useEffect, useRef, useState} from "react";
import "./CheckOut.scss";
import SingleBanner from "../../components/SingleBanner/SingleBanner";
import {FiEdit} from "react-icons/fi";
import {BiEdit} from "react-icons/bi";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {RiDeleteBin6Line} from "react-icons/ri";
import useMyCart from "../../services/Hooks/useMyCart";
import ProductActions from "../../components/ProductActions/ProductActions";
import {deleteItem} from "../../components/ProductCard/ProductCardSlice";
import {useDispatch} from "react-redux";
import button from "bootstrap/js/src/button";
import {asset} from "../../services/Helpers/Image/image";
import {toast} from "react-toastify";
import useClient from "../../services/Hooks/useClient";
import Phone from "../../components/Modal/Phone/Phone";
import Address from "../../components/Modal/Address/Address";
import Note from "../../components/Modal/Note/Note";
import {formatter} from "../../services/Helpers/Number/Number";
import {useRawSubTotalPrice, useSubTotalPrice} from "../../services/Hooks/useTotalPrice";
import {Link, useNavigate} from "react-router-dom";
import {getCookie} from "../../utils/dataHandler";

const CheckOut = () => {
    const userToken = getCookie('user_access_token') || getCookie('seller_access_token');
    const [myCart] = useMyCart();
    const client = useClient();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const total = useSubTotalPrice();
    const rawSubTotal = useRawSubTotalPrice();
    const [idItem, setIdItem] = useState();
    const [modalPhoneShow, setModalPhoneShow] = useState(false);
    const [modalAddressShow, setModalAddressShow] = useState(false);
    const [modalNoteShow, setModalNoteShow] = useState(false);
    const [showCoupon, setShowCoupon] = useState(false);
    const valueCoupon = sessionStorage.getItem('couponCode') || '';
    const discount = sessionStorage.getItem('discountValue') || '';
    const [couponCode, setCouponCode] = useState(valueCoupon);
    const [discountValue, setDiscountValue] = useState(discount);
    const [activeIndex, setActiveIndex] = useState(null);
    const [userInfo, setUserInfo] = useState([]);
    const [fee, setFee] = useState('');
    const [phone, setPhone] = useState('');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);


    const getShippingFee = async () => {

        if (!userToken) {
            console.error('User token not found');
            return;
        }
        const formData = {
            'sub_total': rawSubTotal
        }
        const res = await fetch('http://buynow.test/api/shipping-fee', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        let data = await res.json();
        if (data.status === 'success') {
            setFee(data.data)
            sessionStorage.setItem('shipping_method', data.message)
        }
    }


    useEffect(() => {
        getShippingFee();
    }, [rawSubTotal]);

    const getUserInfo = async () => {
        if (!userToken) {
            console.error('User token not found');
            return;
        }
        const res = await fetch('http://buynow.test/api/address', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            }
        });

        let data = await res.json();
        if (data.length) {
            setUserInfo(data[0])
            setPhone(data[0].phone)
            setNote(data[0].note)
        }
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    const handleSubmitCoupon = async () => {
        if (myCart.length) {
            if (couponCode === '') {
                sessionStorage.removeItem('couponCode');
                sessionStorage.removeItem('discountValue');
                setCouponCode('');
            } else {
                try {
                    const res = await client.get(`coupon/${couponCode}`);
                    if (res.data.status === 'success') {
                        setCouponCode(res.data.coupon.code);
                        setDiscountValue(res.data.coupon.discount);
                        toast('Apply coupon successfully!');
                        sessionStorage.setItem('coupon', res.data.coupon);
                        sessionStorage.setItem('couponCode', res.data.coupon.code);
                        sessionStorage.setItem('discountValue', res.data.coupon.discount);
                    } else {
                        toast(res.data.message);
                    }

                } catch (error) {
                    console.error('Error fetching coupon:', error);
                }
            }
        }
    }

    const handleDivClick = (index) => {
        setActiveIndex(index);
    };

    const paymentMethodRef = useRef();
    const [termsChecked, setTermsChecked] = useState(true);

    const handleProceedToCheckout = async () => {

        if (termsChecked && userInfo.phone && userInfo.address) {
            const selectedPaymentMethod = paymentMethodRef.current;

            let paymentUrl = '';
            if (selectedPaymentMethod === 'paypal') {
                paymentUrl = `http://buynow.test/api/paypal/payment?total=${rawSubTotal + fee - discount}`;
            } else if (selectedPaymentMethod === 'cod') {
                paymentUrl = 'http://buynow.test/api/cod/payment';
            } else if (selectedPaymentMethod === 'vnpay') {
                paymentUrl = `http://buynow.test/api/vnpay/payment?total=${(rawSubTotal + fee - discount) * 24231}`;
            }

            if (paymentUrl) {
                try {
                    setLoading(true);
                    const response = await fetch(paymentUrl, {
                        method: selectedPaymentMethod === 'vnpay' ? 'POST' : 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'accept': 'application/json',
                            'Authorization': `Bearer ${userToken}`
                        },
                    });
                    const data = await response.json();

                    if (data.status === 'success' || data.code === '00') {
                        setLoading(false);
                        sessionStorage.setItem('payment_method', selectedPaymentMethod);
                        sessionStorage.setItem('order_address', JSON.stringify(userInfo));
                        sessionStorage.setItem('order_method', JSON.stringify(selectedPaymentMethod));
                        sessionStorage.setItem('sub_total', JSON.stringify(rawSubTotal));
                        sessionStorage.setItem('amount', JSON.stringify(rawSubTotal + fee - discount));
                        sessionStorage.setItem('my_cart', JSON.stringify(myCart));

                        if (selectedPaymentMethod === 'paypal') {
                            window.location.href = data.data.paypal_checkout_url;
                        } else if (selectedPaymentMethod === 'vnpay') {
                            window.location.href = data.data;
                        } else {
                            navigate('/payment/cod/success')
                        }
                    } else {
                        console.log('Payment error:', data.message);
                        toast.error(data.message);
                    }
                } catch (error) {
                    console.error('Fetch error:', error);
                    toast.error('An error occurred during payment processing.');
                } finally {
                    setLoading(false);
                }
            }
        } else {
            toast('Please accept terms of service or fill all fields address above.');
        }
    };

    return (
        <>
            <SingleBanner name="Check Out"/>
            <section className="checkout-part">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="account-card">
                                <div className="account-title">
                                    <h3>Your Order</h3>
                                </div>
                                <div className="account-content">
                                    <div className="table-wrapper">
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Amount</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                myCart?.length ?
                                                    myCart.map((item) => (
                                                        <tr key={item.id}>
                                                            <td width="30%"><img
                                                                src={asset(item.thumb_image)}
                                                                alt="img"/></td>
                                                            <td><Link to={`/item/item_details/${item.id}/${item.slug}`}>{item.name}</Link></td>
                                                            <td>{item.offer_price}</td>
                                                            {
                                                                idItem === item.id ?
                                                                    <td width="15%">
                                                                        <div className="cart-action-group">
                                                                            <ProductActions quantity={item.quantity} item={item}/>
                                                                        </div>
                                                                    </td>
                                                                    :
                                                                    <td width="10%">{item.quantity}</td>
                                                            }
                                                            <td>{Number((item.offer_price * item.quantity).toFixed(1))}</td>
                                                            <td>
                                                                <span onClick={() => setIdItem(item.id)}><FiEdit/></span>
                                                                <span onClick={() => dispatch(deleteItem(item.id))}><RiDeleteBin6Line/></span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                    :
                                                    ''
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="checkout-coupon">
                                        {
                                            !showCoupon ?
                                                <h3 style={{cursor: "pointer"}} onClick={() => setShowCoupon(!showCoupon)}>Do you have a coupon code?</h3>
                                                :
                                                <>
                                                    <form className="coupon-form">
                                                        <input type="text" name="coupon"
                                                               value={couponCode}
                                                               onChange={(e) => setCouponCode(e.target.value)}
                                                               placeholder="Enter your coupon code"/>
                                                        <button type="button" onClick={handleSubmitCoupon}>
                                                            <span>APPLY</span>
                                                        </button>
                                                    </form>

                                                </>
                                        }
                                    </div>
                                    <div className="checkout-detail">
                                        <ul>
                                            <li><span>Sub Total</span><span>{total}</span></li>
                                            <li><span>Delivery Fee</span><span>${rawSubTotal === 0 ? 0 : fee}</span></li>
                                            <li><span>Discount</span><span>${discountValue || 0}</span></li>
                                            <li><span>Grand Total</span><span>{rawSubTotal === 0 ? '$0' : formatter.format(rawSubTotal + fee - discount)}</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-12">
                            <div className="account-card">
                                <div className="account-title">
                                    <h3>Contact Information's</h3>
                                </div>
                                <div className="account-content">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-4">
                                            <div className={`profile-card contact ${activeIndex === 0 ? 'active' : ''}`} onClick={() => handleDivClick(0)}>
                                                <h3>Phone</h3>
                                                <p>{phone ? phone : '-'}</p>
                                                <ul>
                                                    <li onClick={() => setModalPhoneShow(true)}>
                                                        <button className="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#phone-edit">
                                                            <span><BiEdit/></span></button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4">
                                            <div className={`profile-card contact ${activeIndex === 1 ? 'active' : ''}`} onClick={() => handleDivClick(1)}>
                                                <h3>Address</h3>
                                                {
                                                    userInfo?.address
                                                        ?
                                                        <p>
                                                            {userInfo?.address},
                                                            {userInfo?.ward && ` ${JSON.parse(userInfo?.ward)?.label}`},
                                                            {userInfo?.district && ` ${JSON.parse(userInfo?.district)?.label}`},
                                                            {userInfo?.province && ` ${JSON.parse(userInfo?.province)?.label}`}
                                                        </p>
                                                        :
                                                        '-'
                                                }

                                                <ul>
                                                    <li onClick={() => setModalAddressShow(true)}>
                                                        <button className="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#phone-edit">
                                                            <span><BiEdit/></span></button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4">
                                            <div className={`profile-card contact ${activeIndex === 2 ? 'active' : ''}`} onClick={() => handleDivClick(2)}>
                                                <h3>Note</h3>
                                                <p>{note ? note : '-'}</p>
                                                <ul>
                                                    <li onClick={() => setModalNoteShow(true)}>
                                                        <button className="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#phone-edit">
                                                            <span><BiEdit/></span></button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="account-card mb-0">
                                <div className="account-title">
                                    <h3>Payment Option</h3>
                                </div>
                                <div className="account-content">
                                    <div className="row">
                                        <div className="details-list-group">
                                            <ul className="details-tag-list">
                                                <li>
                                                    <div className="form-check">
                                                        <input type="radio"
                                                               name="paymentMethod"
                                                               id='paypal'
                                                               ref={paymentMethodRef}
                                                               onChange={() => (paymentMethodRef.current = 'paypal')}/>
                                                        <label htmlFor="paypal">PayPal</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-check">
                                                        <input type="radio"
                                                               name="paymentMethod"
                                                               id='vnpay'
                                                               ref={paymentMethodRef}
                                                               onChange={() => (paymentMethodRef.current = 'vnpay')}/>
                                                        <label htmlFor="vnpay">VnPay</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-check">
                                                        <input type="radio"
                                                               name="paymentMethod"
                                                               id='cod'
                                                               ref={paymentMethodRef}
                                                               onChange={() => (paymentMethodRef.current = 'cod')}/>
                                                        <label htmlFor="cod">COD</label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="checkout-check">
                                            <input type="checkbox"
                                                   id="terms"
                                                   checked={termsChecked}
                                                   onChange={() => setTermsChecked(!termsChecked)}
                                            />
                                            <label htmlFor="terms">By making this purchase you agree to our <a href="#">Terms and Conditions.</a></label>
                                        </div>
                                        {
                                            myCart.length ?
                                                <div className="checkout-proceed">
                                                    <button onClick={handleProceedToCheckout} disabled={loading === true}>{loading === true &&
                                                        <span><AiOutlineLoading3Quarters size={"1.25rem"}/></span>} proceed to
                                                        checkout
                                                    </button>
                                                </div>
                                                :
                                                ''
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Phone show={modalPhoneShow}
                           onHide={() => setModalPhoneShow(false)} userInfo={userInfo} setPhone={setPhone}/>
                    <Address show={modalAddressShow}
                             onHide={() => setModalAddressShow(false)} userInfo={userInfo} setUserInfo={setUserInfo}/>
                    <Note show={modalNoteShow}
                          onHide={() => setModalNoteShow(false)} userInfo={userInfo} setNote={setNote}/>
                </div>
            </section>
        </>
    );
};

export default CheckOut;
