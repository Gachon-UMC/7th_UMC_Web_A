import { useState, useRef } from "react";
import Category from "../widgets/Category";
import styled from "styled-components";
import useGetMoviesData from "../shared/hooks/useGetMoviesData";
import useIntersectionObserver from "../shared/hooks/useIntersectionObserver";
import { ClipLoader } from "react-spinners";
import Card from "../widgets/Card";

const MainPage = () => {
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const [category, setCategory] = useState<string>("now_playing");
    const {
        data: movies,
        isLoading,
        fetchNextPage,
    } = useGetMoviesData(category);
    useIntersectionObserver(bottomRef, fetchNextPage);

    return (
        <MainContainer>
            <Category setCategory={setCategory}></Category>
            <MovieContainer>
                {movies?.map((movie) => (
                    <Card key={movie.id} movie={movie}></Card>
                ))}
                {isLoading && (
                    <LoaderContainer>
                        <ClipLoader size={80} color={"#ffffff"}></ClipLoader>
                    </LoaderContainer>
                )}
                <div className="bottomRef" ref={bottomRef}></div>
            </MovieContainer>
        </MainContainer>
    );
};

const LoaderContainer = styled.div`
    position: fixed; /* 화면 전체에 고정 */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* 다른 요소 위에 배치 */
    background-color: rgba(0, 0, 0, 0.5); /* 배경 반투명 처리 (선택 사항) */
    width: 100vw;
    height: 100vh;
`;

const MainContainer = styled.main`
    width: 100%;
    height: auto;
`;

const MovieContainer = styled.section`
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    row-gap: 30px;
    column-gap: 5px;
    padding-bottom: 4rem;
    @media (max-width: 768px) {
        grid-template-columns: repeat(5, 1fr);
    }

    position: relative;
    & > .bottomRef {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: 30px;
    }
`;
export default MainPage;
