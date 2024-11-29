import React from "react";
import { useParams } from "react-router-dom";
import Credits from "../components/credits";
import { useQuery } from "react-query";
import QueryMovieDetailData from "../components/QueryMovieDetailData";
import { MovieDetail } from "../types/movieTypes";
const MovieDetails = () => {
    const { movieId } = useParams();

    const { data } = useQuery(["QueryData", movieId], () =>
        QueryMovieDetailData(movieId)
    );
    console.log(data);

    // 수정
    // movie 라는 변수의 type을 MovieDetail로 선언
    // 이 코드는 movie.profile_path 값이 존재하는 값들만 filter 해서 각각 하나의 배열로 만들어 주는 코드
    return (
        <div className="test">
            {data &&
                data
                    .filter((movie: MovieDetail) => movie.profile_path)
                    .map((movie: MovieDetail) => (
                        <Credits key={movie.id} movie={movie} />
                    ))}
        </div>
    );
};

export default MovieDetails;
