import { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { sortState } from "../recoil/sortState";
import { RecoilState, useRecoilValue } from "recoil";
import useGetAPI from "../hooks/useGetAPI";
import Category from "./Category";

interface URLObjType {
    [key: string]: { url: string };
}
// API 호출에 사용할 언어 설정
const lang = "ko-KR";
// url을 담은 객체 생성
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
    // 전역 변수를 이용하여 Main Component에 렌더링 할 API 종류 구분
    const standard = useRecoilValue(sortState);

    /**
     * Custom Hook을 이용한 렌더링
     * @param {string} URL  : urlObj에서 전역 상태 변수를 key 값으로 url value를 넘겨줌
     * @param {RecoilState} dependencies : useEffect 함수 의존성 배열에 넘겨줄 값 -> standard라는 전역 상태 변수 넣어줌 , 즉 Category Component에서 버튼 클릭으로 전역 상태 변수가 변경되면 새로운 API 호출
     * @return {Array}
     */

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
