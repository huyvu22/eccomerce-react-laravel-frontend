import useMyCart from "./useMyCart";
import {formatter} from "../Helpers/Number/Number";
import {useEffect, useState} from "react";

export const useSubTotalPrice = () => {
    const [myCart] = useMyCart();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let newTotal = 0;
        myCart.forEach((item) => {
            const amount = item.offer_price;
            newTotal += amount * item.quantity;
        });
        setTotal(newTotal);
    }, [myCart]);


    return formatter.format(total);
}

export const useRawSubTotalPrice = () => {
    const [myCart] = useMyCart();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let newTotal = 0;
        myCart.forEach((item) => {
            const amount = item.offer_price;
            newTotal += amount * item.quantity;
        });
        setTotal(newTotal);
    }, [myCart]);


    return total;
}

