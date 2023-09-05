const slugify = require('slugify');

const useUrl = () => {
    return {
        profile: "/ca-nhan",
        account: "/ca-nhan/tai-khoan",

        getItem: function (id, name) {
            const slug = slugify(name);
            return `/item/item_details/${id}/${slug}`;
        },
        getSearch: function (keyword) {
            keyword = slugify(keyword);
            return `item/products/search/${keyword}`;
        },

    };
};

export default useUrl;