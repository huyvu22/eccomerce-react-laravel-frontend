import {useEffect, useState} from 'react';
import useClient from './useClient';
import config from "../../configs/Config.json";
import {useSelector} from "react-redux";

const useTotalPage = (attributes = '') => {
    const client = useClient();
    const {LIMIT_ITEM} = config;
    const [totalPage, setTotalPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const keywords = useSelector((state) => state.searchProducts.keywords)
    const priceSpread = useSelector((state) => state.searchProducts.priceSpread);
    const rating = useSelector((state) => state.searchProducts.rating);

    const fetchTotalPage = async () => {
        let params = '';
        const [minValue, maxValue] = priceSpread;
        if (attributes !== '') {
            if (keywords !== '') {
                params = `&q=${keywords}`;
            } else if (priceSpread.length) {
                params = `&price.current_gte=${minValue}&price.current_lte=${maxValue}`;
            } else if (rating !== '') {
                params = `&rating=${rating}`;
            } else if (keywords !== '' && rating !== '') {
                params = `&q=${keywords}&rating=${rating}`;
            }
            const res = await client.get(`all_items?attributes=${attributes}${params}`);
            if (res.response.ok === true) {
                setTotalItems(res.data.length);
                setTotalPage(Math.ceil(res.data.length / LIMIT_ITEM));
            }
        } else {
            const res = await client.get(`all_items?q=${keywords}`);
            if (res.response.ok === true) {
                setTotalItems(res.data.length);
                setTotalPage(Math.ceil(res.data.length / LIMIT_ITEM));
            }
        }
    };

    useEffect(() => {
        fetchTotalPage();
    }, [client, keywords]);

    return {totalItems, totalPage};
};

export default useTotalPage;