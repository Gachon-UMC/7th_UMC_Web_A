import React from "react";
import { useLocation } from "react-router-dom";

const MovieDetail = () => {
    //https://reactrouter.com/en/main/hooks/use-location
    const location = useLocation();
    const data = location.state;
    return (
        <div>
            <header>{data.title}</header>
        </div>
    );
};

export default MovieDetail;
