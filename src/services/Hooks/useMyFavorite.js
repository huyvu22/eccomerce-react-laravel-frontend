import {useState, useEffect} from "react";
import {useSelector} from "react-redux";

const useMyFavorite = () => {
    const [myFavorite, setMyFavorite] = useState([]);
    const isClickBtn = useSelector((state) => state.productCard.isClick);

    useEffect(() => {
        const storedData = localStorage.getItem("myList");
        if (storedData !== null) {
            let wishList = JSON.parse(storedData).wishList
            const uniqueCartList = wishList.filter((item, index, self) => index === self.findIndex((t) => t.name === item.name));
            setMyFavorite(uniqueCartList);
        }
    }, [isClickBtn]);

    return [myFavorite, setMyFavorite];
};
export default useMyFavorite;