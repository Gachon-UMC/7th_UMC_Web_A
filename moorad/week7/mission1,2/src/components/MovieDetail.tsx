import { useParams } from "react-router-dom";
import { movieInstance } from "../apis/getMovieAPI";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
// todo : type 다른 파일로 좀 치우기
interface DetailPosterProps {
    backdroppath: string | null;
}

interface MovieDetail {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: any | null; // Collection 객체를 정의하려면 별도 타입을 추가로 정의해야 함
    budget: number;
    genres: { id: number; name: string }[];
    homepage: string;
    id: number;
    imdb_id: string | null;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }[];
    production_countries: { iso_3166_1: string; name: string }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: { iso_639_1: string; name: string }[];
    status: string;
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface CastMember {
    adult: boolean;
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number | null; // 성별이 알려지지 않은 경우 null이 될 수 있음
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string | null; // 프로필 이미지가 없을 경우 null이 될 수 있음
}

// 하나로 합칠 수는 없나 ?
const getMovieData = async (movieID: string) => {
    const [detailRes, creditRes] = await Promise.all([
        movieInstance.get(`${movieID}?language=ko-KR`),
        movieInstance.get(`${movieID}/credits?language=ko-KR`),
    ]);

    return {
        detailData: detailRes.data,
        creditData: creditRes.data.cast,
    };
};
const MovieDetail = () => {
    const { movieID } = useParams();
    // const [detailData, setDetailData] = useState<MovieDetail>();

    const { isLoading, data, error } = useQuery<{
        detailData: MovieDetail;
        creditData: CastMember[];
    }>({
        queryKey: ["movieData", movieID],
        queryFn: () =>
            movieID
                ? getMovieData(movieID)
                : Promise.reject("No movie ID provided"),
        enabled: !!movieID,
    });

    if (isLoading) {
        return <h1>LOADING..</h1>;
    }

    if (error) {
        return <h1>해당 영화에 대한 데이터가 없거나 접근 불가능합니다.</h1>;
    }

    const detailData = data?.detailData;
    const creditData = data?.creditData;
    return (
        <DetailMain>
            {detailData && (
                <DetailPoster backdroppath={detailData.backdrop_path}>
                    <div className="intro">
                        <div className="title">{detailData.original_title}</div>
                        <div className="release_date">
                            {detailData.release_date}
                        </div>
                        <div className="vote_average">
                            {detailData.vote_average}
                        </div>
                        <div className="overview">{detailData.overview}</div>
                        <div className="genres">
                            {detailData.genres.map((genre) => {
                                return <span>{genre.name},</span>;
                            })}
                        </div>
                    </div>
                </DetailPoster>
            )}
            {creditData && (
                <DetailCasting>
                    {creditData.map((cast) => {
                        return (
                            <div key={cast.id}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${cast.profile_path})`}
                                    alt={cast.name}
                                />
                                <div>
                                    <span>{cast.name} /</span>
                                    <span> {cast.original_name}</span>
                                </div>
                            </div>
                        );
                    })}
                </DetailCasting>
            )}
        </DetailMain>
    );
};

const DetailMain = styled.main`
    padding: 10px;
    width: 98%;
    height: calc(100vh - 5rem);
    border: 1px solid white;
    display: flex;
    flex-direction: column;
`;

const DetailPoster = styled.section<DetailPosterProps>`
    padding: 10px;

    border: 4px soild red;
    width: 98%;
    height: 50%;

    background-image: ${({ backdroppath }) =>
        `url(https://image.tmdb.org/t/p/w500${backdroppath})`};
    background-size: cover;
    background-position: center;
`;

const DetailCasting = styled.section`
    width: 100%;
    height: 50%;
    padding: 10px;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
    grid-column: 1/9;

    overflow: scroll;
    & > div > img {
        width: 80px;
        height: 80px;
        border-radius: 100%;
    }
`;
export default MovieDetail;
