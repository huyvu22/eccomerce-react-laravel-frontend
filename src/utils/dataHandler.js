import _ from 'lodash'; // Import lodash library
export const handleFavoriteItems = (data, favoriteItems) => {
    favoriteItems.forEach((favoriteItem) => {
        data?.forEach((item) => {
            if (item.id === favoriteItem.id) {
                item.isLike = true;
            }
        });
    });
    return data;
};

export const handleCartItems = (data, myCart) => {
    const dataMap = {}; // Create a hash map to store data items by ID

    // Populate the hash map with data items
    data?.forEach((item) => {
        dataMap[item.id] = item;
    });

    // Update quantities in the hash map based on cart items
    myCart.forEach((cartItem) => {
        const dataItem = dataMap[cartItem.id];
        if (dataItem) {
            dataItem.quantity = cartItem.quantity;
        }
    });

    return data;
};

export const handleCompareItems = (data, listCompare) => {
    listCompare.forEach((compareItem) => {
        data?.forEach((item) => {
            if (item.id === compareItem.id) {
                item.isCompare = true;
            }
        });
    });
    return data;
};


export const processFetchedData = (data, favoriteItems, myCart, compareItems) => {
    let processedData = _.cloneDeep(data);

    if (
        favoriteItems &&
        myCart &&
        compareItems &&
        Object.entries(favoriteItems).length === 0 &&
        Object.entries(myCart).length === 0 &&
        Object.entries(compareItems).length === 0
    ) {
        return processedData;
    }

    if (favoriteItems && Object.entries(favoriteItems).length > 0) {
        processedData = handleFavoriteItems(processedData, favoriteItems);
    }
    if (myCart && Object.entries(myCart).length > 0) {
        processedData = handleCartItems(processedData, myCart);
    }
    if (compareItems && Object.entries(compareItems).length > 0) {
        processedData = handleCompareItems(processedData, compareItems);
    }

    return processedData;
};

export const shuffleData = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};






