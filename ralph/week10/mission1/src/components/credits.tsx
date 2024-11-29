import React from "react";

// 영화의 인물 정보를 나타내는 페이지
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500/";
import styled from "styled-components";
import { MovieDetail } from "../types/movieTypes";

// 수정
// movie의 type을 MovieDetail 로 지정

export default function Credits({ movie }: { movie: MovieDetail }) {
    return (
        <CreditMainDiv>
            <CreditDiv>
                <CreditImageImg
                    src={`${IMG_BASE_URL}${movie.profile_path}`}
                    alt="사진이 없습니다."
                ></CreditImageImg>
                <CreditNameDiv>{movie.name}</CreditNameDiv>
            </CreditDiv>
        </CreditMainDiv>
    );
}

const CreditMainDiv = styled.div`
    background-color: pink;
    margin-left: 100px;
`;
const CreditDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;
const CreditImageImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 100%;
`;
const CreditNameDiv = styled.div``;
