import './TermsAndCondition.scss';
import React, {useEffect, useState} from 'react';
import SingleBanner from "../../components/SingleBanner/SingleBanner";
import useClient from "../../services/Hooks/useClient";

const TermsAndCondition = () => {
    const client = useClient();
    const [termsAndCondition, setTermsAndCondition] = useState([])
    const getTermsAndCondition = async () => {
        const res = await client.get('terms-and-condition')
        const data = await res.data;
        if (data.status === 'success') {
            setTermsAndCondition(data.data)
        }
    }

    useEffect(() => {
        getTermsAndCondition();
    }, []);
    return (
        <>
            <SingleBanner name="Terms And Codition"/>
            <section className="inner-section contact-part">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="account-card">
                                <div className="account-title">
                                    <h4>Terms And Codition</h4>
                                </div>
                                <div className="account-content" dangerouslySetInnerHTML={{__html: termsAndCondition.content}}>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </>
    );
};

export default TermsAndCondition;