// 영화 포스터 이미지, 타이틀, 개봉일 정의 페이지

import React from 'react';
import styled from 'styled-components';

const StyledImgCarddiv = styled.div`
    width: 140px; /* 카드의 너비를 고정 */
    margin-bottom: 20px; /* 카드 사이에 간격을 추가 */
    margin-left: 15px;
`
// 영화포스터 styled-component (image)
const StyledImgCard = styled.img`
    width: 140px;
    margin: 5px;
    border-radius: 15px;

    &:hover {
        width: 140px;
        margin: 5px;
        border-radius: 15px;
        filter: brightness(30%);
    }
`
// 영화 타이틀 styled-component (text)
const ImgCardTitleText = styled.h6`
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 5px;
    color: white;
    font-size: 15px;
`
// 영화 개봉일 styled-component (text)
const ImgCardRleaseText = styled.h6`
    margin-top: 0;
    margin-bottom: 5px;
    margin-left: 5px;
    color: white;
    font-size: 10px;
`

const ImgCard = ({movie}) => {
    const { poster_path, title, release_date } = movie; // movie 객체에서 필요한 속성 추출
    return (
        <>
            <StyledImgCarddiv>
                {/* 이미지 카드 생성 */}
                <StyledImgCard 
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`} 
                    alt={title} 
                />

                {/* title(제목) 생성 */}
                <ImgCardTitleText>{title}</ImgCardTitleText>
                
                {/* release date(개봉일) 생성 */}
                <ImgCardRleaseText>{release_date}</ImgCardRleaseText>
            </StyledImgCarddiv>
        </>
    );
}

export default ImgCard;