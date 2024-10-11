import { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { sortState } from "../recoil/sortState";
import { useRecoilValue } from "recoil";
import useGetAPI from "../hooks/useGetAPI";
import Category from "./Category";

interface URLObjType {
    [key: string]: { url: string };
}
const lang = "ko-KR";

const urlObj: URLObjType = {
    nowPlaying: {
        url: `https://api.themoviedb.org/3/movie/now_playing?language=${lang}&page=1`,
    },
    topRated: {
        url: `https://api.themoviedb.org/3/movie/top_rated?language=${lang}&page=1`,
    },
    upComing: {
        url: `https://api.themoviedb.org/3/movie/upcoming?language=${lang}&page=1`,
    },
    popular: {
        url: `https://api.themoviedb.org/3/movie/popular?language=${lang}&page=1`,
    },
};

const Main = () => {
    const standard = useRecoilValue(sortState);
    const movies = useGetAPI(urlObj[standard].url, [standard]);
    return (
        <>
            <Category></Category>
            <MainContents>
                {movies?.map((movie) => {
                    return <Card key={movie.id} movie={movie}></Card>;
                })}
            </MainContents>
        </>
    );
};

const MainContents = styled.main`
    padding-top: 100px;
    padding-left: 150px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    row-gap: 10px;
    column-gap: 5px;
    @media (max-width: 768px) {
        grid-template-columns: repeat(5, 1fr);
    }
`;

export default Main;
