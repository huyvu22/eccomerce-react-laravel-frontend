import config from "../../../configs/Config.json";

export const asset = (path) => {
    const {SERVER} = config;
    return SERVER + path;
};
