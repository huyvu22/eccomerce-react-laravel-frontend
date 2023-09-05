import {useState, useEffect} from "react";
import {useSelector} from "react-redux";

const useMyCart = () => {
    const [myCart, setMyCart] = useState([]);
    const [myFavorite, setMyFavorite] = useState([]);
    const isClickBtn = useSelector((state) => state.productCard.isClick);
    const isResetCart = useSelector(
        (state) => state.productCard.isResetCart
    );


    useEffect(() => {
        let storedData = localStorage.getItem("myList");
        if (isResetCart) {
            localStorage.removeItem("myList");
            setMyCart([]);
            storedData = null;
        }
        if (storedData !== null) {
            let cartList = JSON.parse(storedData).cartList;
            let wishList = JSON.parse(storedData).wishList;
            // const uniqueCartList = cartList.filter((item, index, self) => index === self.findIndex((t) => t.name === item.name));
            const uniqueCartList = [];
            for (let i = 0; i < cartList?.length; i++) {
                let obj = cartList[i];
                let found = false;
                for (let j = 0; j < uniqueCartList?.length; j++) {
                    if (uniqueCartList[j].id === obj.id) {
                        uniqueCartList[j].quantity += 1;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    uniqueCartList.push({...obj});
                }
            }

            const uniqueWishList = wishList?.filter(
                (item, index, self) =>
                    index === self.findIndex((t) => t.name === item.name)
            );

            // Loại bỏ các sản phẩm có quantity = 0
            const filteredCartList = uniqueCartList.filter(
                (item) => item.quantity !== 0
            );

            setMyCart(filteredCartList);
            setMyFavorite(uniqueWishList);

            // Lấy dữ liệu từ localStorage
            const storedDataToUpdate = JSON.parse(localStorage.getItem("myList"));
            // Thay đổi giá trị của mảng cartList trong storedDataToUpdate
            storedDataToUpdate.cartList = filteredCartList;
            storedDataToUpdate.wishList = uniqueWishList;
            // Lưu lại dữ liệu vào localStorage
            localStorage.setItem("myList", JSON.stringify(storedDataToUpdate));
        }
    }, [isClickBtn, isResetCart]);

    return [myCart, setMyCart, myFavorite, setMyFavorite];
};
export default useMyCart;
