import React from "react";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import CountryDetail from "./CountryDetail";


const AppRouter = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/countryDetail" element={<CountryDetail/>}/>
            </Routes>

        </BrowserRouter>
    )
}

export default AppRouter;