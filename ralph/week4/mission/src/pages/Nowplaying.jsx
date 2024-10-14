import Movies from "../components/movies";
import {useEffect, useState} from "react";
import axios from "axios";

import styled from "styled-components";

const Nowplaying  = () => {
    const [movies, setMovies] = useState([])
        // usestate안에 초기 값으로 빈배열을 주었기 때문에 영화 데이터를 담기 위해 빈배열로 둠
        // movies는 현재 상태를 저장하는 변수로 여기서는 영화 목록을 담을 상태 변수
        // setMovies는 새로운 영화 데이터를 받아오면 movies안의 값을 업데이트 시켜줄 함수 , 이 함수가 호출되면 컴포넌트가 다시 렌더링 되어 업데이트 된 영화 목록이 화면에 뜨게 된다.
useEffect(() => {
    const getMovies = async () =>       // const getMovies = async () => {}는 비동기 함수를 정의하는 코드
                                        // async 키워드는 해당 함수가 비동기 함수임을 나타냄
                                        // 이 함수는 비동기 작업을 수행하고, 완료될 때까지 기다리지 않고 다음 코드로 넘어갈 수 있.
        {
        const movies = await axios.get(`${import.meta.env.VITE_MOVIE_API_URL}/now_playing?language=ko&page=1&region=KR`, 
                                                        // HTTP GET 요청을 보내는 함수로 여기서는 TMDb API로부터 데이터를 가져온다.
                                                        // await은 비동기 처리를 의미하며 서버로 부터 응답이 올때 까지 기다린 후 응답을 변수 movies에 넣어준다.
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOßKEN}`
                }                              // "Bearer"는 토큰의 유형을 나타내며, 뒤에 이어지는 긴 문자열은 JWT(JSON Web   Token)
            })                            // 이 토큰은 서버에서 발급받은 것으로, 사용자가 서버에 대한 요청을 보낼 때 이 토큰을 통해 권한을 확인
            setMovies(movies);
        }
        getMovies()
    }, []);

    return (
        <NowplayingDiv>
            {movies.data?.results.map((movie) => (
                <Movies key={movie.id} movie={movie}/>
            ))} 
        </NowplayingDiv>
    )
};
        // movies는 API로부터 받아온 영화 데이터가 저장된 객체
        //그 안의 data 속성은 API 응답 데이터로, results에는 영화 목록이 배열로 들어 있다
        //?. (optional chaining): 이 문법은 안전하게 데이터를 접근하기 위한 방법입니다. 예를 들어, movies.data가 존재하지 않을 경우(즉, undefined나 null일 경우) 에러를 발생시키지 않고 **undefined**를 반환하여 앱이 중단되지 않도록 보호
        // movies.data.results 배열의 각 영화(movie)를 순회하면서 , 각 영화에 대한 JSX요소 생성
        // Movies는 각 영화를 렌더링 하는 내가 미리 만들어 놓은 React 컴포넌트로 여기서 각 영화 데이터를 Movies라는 컴포넌트에 전달하여 화면에 표시
        // movie.id를 고유키로 사용
        // 각각의 영화 객체인 movie 를 Movies 컴포넌트에 props로 전달하고 이걸 Movies 컴포넌트에서 이렇게 매개변수로 받음({key,movie})

export default Nowplaying ;





//css
const NowplayingDiv =styled.div `
background-color:pink;
margin-left:100px;
display: flex;
flex-wrap: wrap;
justify-content: center;
`;

