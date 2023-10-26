import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import useClient from "../../../services/Hooks/useClient";

const ConfirmSubscribe = () => {
    const {token} = useLocation();
    const client = useClient();
    const getTokenConfirmation = async () => {
        const res = client.get(`newsletter-verify/${token}`)
        if (res.response.ok) {
            const data = await res.data.data;
            console.log(data);
        }
    }
    useEffect(() => {
        getTokenConfirmation();
    }, []);
    return (
        <div>

        </div>
    );
};

export default ConfirmSubscribe;