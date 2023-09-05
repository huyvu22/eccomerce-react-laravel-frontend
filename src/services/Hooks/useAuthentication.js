import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import login from "../../pages/Login/Login";

const useAuthentication = () => {
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkToken = async (userToken) => {
        try {
            const res = await fetch('http://buynow.test/api/check-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken?.token}`
                }
            });

            const data = await res.json();
            if (data.valid === true) {
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error checking token:', error);
            return false;
        }
    };

    useEffect(() => {
        const userToken = JSON.parse(localStorage.getItem("userToken")); // Assuming you store the user token in localStorage

        const checkLogin = async () => {
            if (userToken) {
                try {
                    const loggedIn = await checkToken(userToken);
                    setIsLoggedIn(loggedIn);
                    dispatch(login())
                } catch (error) {
                    console.error('Error checking token:', error);
                    setIsLoggedIn(false);
                }
            }
            setIsLoading(false);
        };

        checkLogin();
    }, []);

    return {isLoggedIn, isLoading};
};

export default useAuthentication;
