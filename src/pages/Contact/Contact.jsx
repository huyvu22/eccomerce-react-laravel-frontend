import './Contact.scss';
import React, {useEffect, useRef, useState} from 'react';
import SingleBanner from "../../components/SingleBanner/SingleBanner";
import {GoLocation} from "react-icons/go";
import {FiPhone} from "react-icons/fi";
import {GoMail} from "react-icons/go";
import {BsFillPersonFill} from "react-icons/bs";
import {HiBookmark} from "react-icons/hi";
import {FaParagraph} from "react-icons/fa";
import useClient from "../../services/Hooks/useClient";
import {toast} from "react-toastify";
import {AiOutlineLoading3Quarters} from "react-icons/ai";

const Contact = () => {
    const client = useClient();
    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const subjectInputRef = useRef(null);
    const messageTextareaRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',

    });

    const getContact = async () => {
        setLoading(true)
        const res = await client.get('contact');
        const data = await res.data;
        if (data.status === 'success') {
            setInfo(data.data)
            setLoading(false)
        }
    }

    useEffect(() => {
        const elementToScroll = document.querySelector(".single-banner");
        elementToScroll.scrollIntoView({behavior: "smooth", block: "start"});
        getContact();
    }, []);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const postContactForm = async (e) => {
        setLoading(true)
        e.preventDefault();
        const res = await client.post('send-contact', formData);
        const data = await res.data;
        if (data.status === 'success') {
            toast.success(data.message)
            setLoading(false)
        } else {
            toast.error(data.message)
            setLoading(false)
        }
    }


    const handleFocus = (ref) => {
        ref.current.classList.add('focus');
    };

    const handleBlur = (ref) => {
        ref.current.classList.remove('focus');
    };

    return (
        <>
            <SingleBanner name="Contact Us"/>
            {
                loading === true ?
                    <div className="loading">
                        <h3>Loading...</h3>
                    </div>
                    :
                    <section className="inner-section contact-part">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 col-lg-4">
                                    <div className="contact-card">
                                        <span><GoLocation/></span>
                                        <h4>Office Address</h4>
                                        <p>{info?.address}</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="contact-card">
                                        <span><FiPhone/></span>
                                        <h4>Contact Information</h4>
                                        <p>Hot Line:</p>
                                        <p>{info?.phone}</p>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-4">
                                    <div className="contact-card">
                                        <span> <GoMail/></span>
                                        <h4>E-Mail</h4>
                                        <p>Contact:</p>
                                        <p>{info?.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="contact-map">
                                        <div className="row-container">
                                            <iframe src={info?.map} className="second-row"></iframe>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="contact-form">
                                        <h4>Drop Your Thoughts</h4>
                                        <div className="form-group">
                                            <div className="form-input-group">
                                                <span ref={nameInputRef}><BsFillPersonFill/></span>
                                                <input type="text" className="form-control" name="name" id="name" placeholder="Name"
                                                       onFocus={() => handleFocus(nameInputRef)}
                                                       onBlur={() => handleBlur(nameInputRef)}
                                                       onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-input-group">
                                                <span ref={emailInputRef}><GoMail/></span>
                                                <input type="text" className="form-control" name="email" id="eamil" placeholder="Email"
                                                       onFocus={() => handleFocus(emailInputRef)}
                                                       onBlur={() => handleBlur(emailInputRef)}
                                                       onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-input-group">
                                                <span ref={subjectInputRef}><HiBookmark/></span>
                                                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject:"
                                                       onFocus={() => handleFocus(subjectInputRef)}
                                                       onBlur={() => handleBlur(subjectInputRef)}
                                                       onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-input-group">
                                                <span ref={messageTextareaRef}><FaParagraph/></span>
                                                <textarea name="message" id="" className="form-control" rows={6} placeholder="Message:"
                                                          onFocus={() => handleFocus(messageTextareaRef)}
                                                          onBlur={() => handleBlur(messageTextareaRef)}
                                                          onChange={handleChange}></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" onClick={postContactForm} className="form-btn-group" disabled={loading}><span><GoMail
                                            size={"1.5em"}/></span><span> send message</span> {loading && <span className="dots-1">...</span>}</button>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>
            }
        </>

    );
};

export default Contact;