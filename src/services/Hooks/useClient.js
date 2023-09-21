import config from "../../configs/Config.json";
import endpoint from "../../configs/Enpoint.json";
import {useNavigate} from "react-router-dom";

const {SERVER_API} = config;


export default function useClient(serverApi = null) {
    const navigate = useNavigate();
    serverApi = serverApi ?? SERVER_API;

    const client = {
        ...endpoint,
        callApi: async function (
            url,
            method,
            params = {},
            body = {},
            token = null
        ) {
            if (Object.keys(params).length) {
                const searchQuery = new URLSearchParams(params).toString();
                url = url + "?" + searchQuery;
            }
            url = serverApi + url;

            const headers = {
                "Content-Type": "application/json",
            };
            if (token !== null) {
                headers["Authorization"] = "Bearer " + token;
            }
            const options = {
                method: method,
                headers: headers,
            };
            if (Object.keys(body).length) {
                options.body = JSON.stringify(body);
            }
            const res = await fetch(url, options);
            const data = await res.json();

            if (res.status === 304) {
                navigate('404')
            }
            return {
                response: res,
                data: data,
            };
        },
        get: function (url, params = {}, token = null) {
            // if (Object.keys(params).length) {
            //   const queryString = new URLSearchParams(params).toString();
            //   url = url + '?' + queryString;
            // }
            return this.callApi(url, "GET", params, {}, token);
        },

        post: function (url, body, params = {}, token = null) {
            return this.callApi(url, "POST", params, body, token);
        },

        put: function (url, body, params = {}, token = null) {
            return this.callApi(url, "PUT", params, body, token);
        },

        patch: function (url, body, params, token = null) {
            return this.callApi(url, "PATCH", params, body, token);
        },

        delete: function (url, params, token = null, userToken) {
            return this.callApi(url, "DELETE", params, {}, token);
        },
    };
    return client;
}
