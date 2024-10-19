import { Route, Routes } from "react-router-dom";
import React from "react";
import App from "./App";
import MovieDetail from "./components/MovieDetail";

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/detail/:id" element={<MovieDetail />}></Route>
        </Routes>
    );
};

export default Routing;
