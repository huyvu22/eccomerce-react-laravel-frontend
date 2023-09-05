import React from "react";
import {Routes} from "react-router-dom";
import {publicRoutes} from "../../routes/publicRoutes";
import {protectRoutes} from "../../routes/protectRoutes";

export default function RouteCore() {

    return (
        <Routes>
            {protectRoutes}
            {publicRoutes}
        </Routes>
    );
}