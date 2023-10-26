import {useEffect, useState} from "react";
import useClient from "./useClient";
import {shuffleData} from "../../utils/dataHandler";
import {useSelector} from "react-redux";

const useFetchData = (endpoint, attributes = '', currentPage = 1) => {
    const client = useClient();
    const [data, setData] = useState();
    const [paginate, setPaginate] = useState([]);
    const [loading, setLoading] = useState(false);
    const isResetCart = useSelector(
        (state) => state.productCard.isResetCart
    );
    const keywords = useSelector((state) => state.searchProducts.keywords) ?? null;

    const getData = async () => {
        setLoading(true);
        let url = '';
        if (attributes.includes('?')) {
            url = `${endpoint}/${attributes}&page=${currentPage}`;
        } else {
            url = `${endpoint}/${attributes}?page=${currentPage}`;
        }

        let res = await client.get(url);

        if (res.response.ok === true) {

            const data = await res.data.data;
            const paginateArr = await res.data.meta
            setPaginate(paginateArr)

            setData(shuffleData(data));
            setLoading(false);

        }
    };


    useEffect(() => {
        getData();
    }, [currentPage, attributes, isResetCart]);

    return {data, loading, setLoading, paginate, keywords};
};

export default useFetchData;
