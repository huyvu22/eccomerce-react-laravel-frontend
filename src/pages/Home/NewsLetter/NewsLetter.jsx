import './NewsLetter.scss';
import React, {useEffect, useState} from 'react';
import {MdAlternateEmail} from "react-icons/md";
import {toast} from "react-toastify";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import useClient from "../../../services/Hooks/useClient";

const NewsLetter = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const client = useClient();
    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (email) {
            setLoading(true)
            const res = await client.post('newsletter', {'email': email})
            if (res.response.ok) {
                const data = await res.data;
                console.log(data)
                if (data.status === 'success') {
                    setLoading(false)
                    setEmail('');
                    toast.success(data.message);
                } else if (data.status === 'error') {
                    setLoading(false)
                    toast.error(data.message);
                }
            }
        } else {
            toast.error('Please provide a valid email')
        }
    }

    return (
        <section className='news-part'>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-5 col-lg-6 col-xl-7">
                        <div className="news-text">
                            <h3>Get 20% Discount for Subscriber</h3>
                        </div>
                    </div>

                    <div className="col-md-5 col-lg-6 col-xl-5">
                        <form className="news-form">
                            <input type="text" placeholder="Enter Your Email Address" onChange={(e) => setEmail(e.target.value)}/>
                            <button disabled={loading} onClick={(e) => handleSubscribe(e)}><span>
                                {/*<MdAlternateEmail size={'1.5em'}/> */}
                                <span>Subscribe</span>
                            </span>{loading && <span className="dots-1">....</span>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsLetter;