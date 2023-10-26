import './FaqQuestion.scss';
import React, {useEffect, useState} from 'react';
import SingleBanner from "../../components/SingleBanner/SingleBanner";
import Accordion from 'react-bootstrap/Accordion';
import useClient from "../../services/Hooks/useClient";

const FaqQuestion = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const client = useClient();

    const getFaqs = async () => {
        setLoading(true)
        const res = await client.get('faqs');
        if (res.response.ok === true) {
            const orderData = await res.data.data;
            setFaqs(orderData)
            setLoading(false)
        }
    }

    useEffect(() => {
        const elementToScroll = document.querySelector(".single-banner");
        elementToScroll.scrollIntoView({behavior: "smooth", block: "start"});
        getFaqs();
    }, []);
    return (
        <>
            <SingleBanner name="Faq Question"/>
            {
                loading
                    ?
                    <div className="loading">
                        <h3>Loading...</h3>
                    </div>
                    :
                    <section className="inner-section faq-part">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 mx-auto">
                                    <div className="faq-parent">
                                        <Accordion defaultActiveKey="0">
                                            {faqs.length &&
                                                faqs.map((item, index) => (
                                                    <Accordion.Item eventKey={index.toString()} key={index}>
                                                        <Accordion.Header><b>{index + 1}.{item.title}</b></Accordion.Header>
                                                        <Accordion.Body>
                                                            {item.content}
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                ))}
                                        </Accordion>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
            }
        </>

    );
};

export default FaqQuestion;