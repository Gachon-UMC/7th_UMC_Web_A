// import { useState } from "react";
import { MOVIES } from "../mocks/movies";
import { Route, Routes, useNavigate } from "react-router-dom";
import Card from "./components/MovieDetail";

import "./App.css";

function App() {
    const datas = MOVIES.results;
    const navigate = useNavigate();

    return (
        <main className="h-[100vh] flex items-center">
            <div className="grid w-[100vw] sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-2 border-black px-2">
                {datas.map((data) => {
                    return (
                        <div
                            id={data.id}
                            className="relative w-[130px] h-[200px] rounded-lg overflow-hidden cursor-pointer"
                            onClick={() =>
                                navigate(`/detail/${data.id}`, { state: data })
                            }
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                                className="absolute inset-0 w-full h-full transition-opacity duration-300 hover:opacity-50"
                            />
                            <div className="absolute inset-0 bg-slate-600 opacity-0 hover:opacity-50 transition-opacity duration-300"></div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}

export default App;
