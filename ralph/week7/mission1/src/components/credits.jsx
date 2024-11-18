import React from "react";
import { useNavigate } from "react-router-dom";
// import "./movie.css"
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500/";

export default function Credits({ movie }) {
    console.log(movie);
    console.log(movie.profile_path);
    console.log(movie.name);

    return (
        <div>
            <img
                src={`${IMG_BASE_URL}${movie.profile_path}`}
                alt="사진이 없습니다."
            ></img>
            <div>
                <h1 style={{ color: "red" }}>{movie.name}</h1>
                {/* <h1 style={{ color: "red" }}>{movie.}</h1> */}
            </div>
        </div>
    );
}
