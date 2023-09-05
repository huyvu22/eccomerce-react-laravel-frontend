import {useDispatch} from "react-redux";
import {useRef, useEffect, useState} from "react";
import {showToast} from "../../components/Toast/Toast";
import {
    addItem,
    removeItem,
    wishItem,
    unWishItem,
    addToCompare,
    removeFromCompare,
} from "../../components/ProductCard/ProductCardSlice";
import {toast} from "react-toastify";

const useAddToCart = ({
                          id, name,
                          thumb_image,
                          price,
                          offer_price,
                          isLike,
                          isCompare,
                          quantity = 0,
                          vendor,
                          availability,
                          rating,
                          updated_at,
                      }) => {
    const dispatch = useDispatch();
    const likeRef = useRef();
    const compareRef = useRef();
    const [count, setCount] = useState(0);

    const addItemToCart = () => {
        const item = {
            id,
            name,
            thumb_image,
            price,
            offer_price,
            vendor,
            isLike,
            quantity: quantity > 0 ? quantity + 1 : 1,
        };
        dispatch(addItem(item));
    };

    const removeItemFromCart = () => {
        dispatch(removeItem(id));
    };

    const toggleWishlistItem = () => {
        likeRef.current.classList.toggle("active-like");
        const item = {
            id: id,
            name,
            thumb_image,
            offer_price,
            availability,
            isLike: !isLike,
            quantity: 1,
        };

        if (isLike) {
            dispatch(unWishItem(id));
            showToast(thumb_image, `${name} removed from Wishlist!`, false);
        } else {
            dispatch(wishItem(item));
            showToast(thumb_image, `${name} added to Wishlist!`);
        }
    };

    const handleActiveCompareChange = () => {
        const activeItems = document.querySelectorAll(".active-compare");
        setCount(activeItems.length);
    };

    useEffect(() => {
        handleActiveCompareChange();
        document.addEventListener("click", handleActiveCompareChange);

        return () => {
            document.removeEventListener("click", handleActiveCompareChange);
        };
    }, []);
    const toggleCompare = () => {
        if (count <= 3) {
            compareRef.current.classList.toggle("active-compare");
            if (compareRef.current.classList.contains("active-compare")) {
                compareRef.current.classList.remove("active-compare");
            }
            const item = {
                id,
                name,
                thumb_image,
                isCompare: !isCompare,
                price,
                offer_price,
                vendor,
                availability,
                quantity,
                rating,
                updated_at,
            };
            if (!isCompare) {
                dispatch(addToCompare(item));
                toast.success('Added product to compare')
            } else {
                dispatch(removeFromCompare(id));
            }
        }
    };

    return {
        likeRef,
        compareRef,
        addItemToCart,
        removeItemFromCart,
        toggleWishlistItem,
        toggleCompare,
    };
};

// useAddToCart.propTypes = {
//     id: PropTypes.string
//     image: PropTypes.string
//     name: PropTypes.z
// };
//
//
// useAddToCart.defaultProps = {
//     id: '',
//     image: '',
//     name: ''
//     addCart: ()=>null
// }

export default useAddToCart;
