import './PrivacyPolicy.scss';
import React, {useEffect, useState} from 'react';
import SingleBanner from "../../components/SingleBanner/SingleBanner";
import useClient from "../../services/Hooks/useClient";

const PrivacyPolicy = () => {
    const client = useClient();
    const [privacyPolicy, setPrivacyPolicy] = useState([])
    const getPrivacyPolicy = async () => {
        const res = await client.get('privacy-policy')
        const data = await res.data;
        if (data.status === 'success') {
            setPrivacyPolicy(data.data)
        }
    }

    useEffect(() => {
        getPrivacyPolicy();
    }, []);

    return (
        <>
            <SingleBanner name="Privacy Policy"/>
            <section className="inner-section contact-part">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="account-card">
                                <div className="account-title">
                                    <h4>Privacy Policy</h4>
                                </div>
                                <div className="account-content" dangerouslySetInnerHTML={{__html: privacyPolicy.content}}></div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </>
    );
};

export default PrivacyPolicy;