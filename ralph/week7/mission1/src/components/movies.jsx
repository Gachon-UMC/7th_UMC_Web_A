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
    // {state:movie} 를 통해 `/movies/${movie.id}`이 경로로 이동하면서 정보도 같이 보낼 수 있게 만든다
    // 이렇게 이동하면서 정보도 같이 보내려면 nagivate 로 이동할 때 같이 보내야한다. 안그러면 다른 방법 써야함
    // 이 정보를 MovieDetails 컴포넌트에서
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
    margin-top: 10px;
    display: flex;
    gap: 20px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const Moviemain = styled.div`
    width: 100%;
    height:100%
    height: 210px;
    border-radius: 20px;
`;

const Textrapper = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 5px;
    align-items: center;
`;

const TitleBox = styled.div`
    border-radius: 10px;
    width: 140px;
    height: 100%;
    color: white;
    align-items: center;
`;

const DescriptionBox = styled.div`
    border-radius: 10px;
    width: 140px;
    height: 100%;
    color: white;
    margin-top: 3px;
    align-items: center;
`;
