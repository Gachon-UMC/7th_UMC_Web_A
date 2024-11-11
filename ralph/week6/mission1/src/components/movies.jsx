import React from "react";
import { useNavigate } from "react-router-dom";
// import "./movie.css"
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500/";
import styled from "styled-components";
export default function Movies({ movie }) {
    const navigate = useNavigate();
    const onClickMovieitem = () => {
        navigate(`/movies/${movie.id}`, { state: movie });
    };

    // 구조분해할당 :
    // console.log(`${IMG_BASE_URL}${movie.poster_path}`);

    return (
        <MovieContainer>
            <Container className="movie-container" onClick={onClickMovieitem}>
                <Moviemain className="a">
                    <img src={`${IMG_BASE_URL}${movie.poster_path}`}></img>
                </Moviemain>

                <Textrapper className="movie-info">
                    <TitleBox>{movie.title}</TitleBox>
                    <DescriptionBox>{movie.release_date}</DescriptionBox>
                </Textrapper>
            </Container>
        </MovieContainer>
    );
}
// IMG_BASE_URL에는 이미지들의 공통 URL을 가져왔고 movie.poster_path에는 이미지의 개별 URL을 가져옴
// Nowplaying, Popular, Upcomming , Toprated에서 각각 props로 가져온 movie객체(여기 안에는 영화 데이터가 리스트 형태로 저장되어 있음 )안에 있는 title, release_date 값을 가져옴
// 영화 데이터 다운 받아 보면 각 영화 별로 title, poster_path,release_data가 다 있음

//css
const MovieContainer = styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 20px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const Moviemain = styled.div`
    width: 140px;
    height: 210px;
    border-radius: 10px;
    overflow: hidden;
`;

const Textrapper = styled.div`
    width: 140px;
    height: 30px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 5px;
`;

const TitleBox = styled.div`
    background-color: gray;
    border-radius: 10px;
    width: 140px;
    height: 100%;
`;

const DescriptionBox = styled.div`
    background-color: gray;
    border-radius: 10px;
    width: 140px;
    height: 100%;
`;
