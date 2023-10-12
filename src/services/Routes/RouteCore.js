import React from "react";
import {Route, Routes} from "react-router-dom";
import {publicRoutes} from "../../routes/publicRoutes";
import {protectRoutes} from "../../routes/protectRoutes";
import PageNotFound from "../../pages/404/PageNotFound";

export default function RouteCore() {

    return (
        <Routes>
            {protectRoutes}
            {publicRoutes}
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    );
}