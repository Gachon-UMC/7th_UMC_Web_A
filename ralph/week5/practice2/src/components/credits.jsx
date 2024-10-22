import React from "react";
import { useNavigate } from "react-router-dom";
// import "./movie.css"
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500/";

export default function Credits({ movie }) {
    return (
        <div>
            <img src={`${IMG_BASE_URL}${movie.profile_path}`}></img>
            <div>
                <h1 style={{ color: "red" }}>{movie.name}</h1>
                {/* <h1 style={{ color: "red" }}>{movie.}</h1> */}
            </div>
        </div>
    );
}
