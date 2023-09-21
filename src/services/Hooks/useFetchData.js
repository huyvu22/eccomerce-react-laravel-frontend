import {useEffect, useState} from "react";
import useClient from "./useClient";
import {shuffleData} from "../../utils/dataHandler";
import {useSelector} from "react-redux";

const useFetchData = (endpoint, attributes = '', currentPage = 1) => {
    const client = useClient();
    const [data, setData] = useState();
    const [paginate, setPaginate] = useState([]);
    const [loading, setLoading] = useState(true);
    const isResetCart = useSelector(
        (state) => state.productCard.isResetCart
    );

    const getData = async () => {
        let url = '';
        if (attributes.includes('search')) {
            url = `${endpoint}/${attributes}`;
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

    return {data, loading, paginate};
};

export default useFetchData;
