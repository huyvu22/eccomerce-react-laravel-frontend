import './AboutUs.scss';
import React, {useEffect, useState} from 'react';
import SingleBanner from "../../components/SingleBanner/SingleBanner";
import useClient from "../../services/Hooks/useClient";

const AboutUs = () => {
    const client = useClient();
    const [aboutUs, setAboutUs] = useState([])
    const getAboutUs = async () => {
        const res = await client.get('about-us')
        const data = await res.data;
        if (data.status === 'success') {
            setAboutUs(data.data)
        }
    }

    useEffect(() => {
        const element = document.documentElement || document.body;
        element.scrollIntoView({behavior: "smooth", block: "start"});
        getAboutUs();
    }, []);
    return (
        <>
            <SingleBanner name="About Us"/>
            <section className="inner-section contact-part">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="account-card">
                                <div className="account-title">
                                    <h4>About Us</h4>
                                </div>
                                <div className="account-content" dangerouslySetInnerHTML={{__html: aboutUs.content}}></div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </>
    );
};

export default AboutUs;