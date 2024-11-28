import React from "react";
import * as S from "../skeleton/movieSkeletonstyle";

function Movieskeleton() {
    return (
        <S.Container>
            <S.Moviemain></S.Moviemain>
            <S.Textrapper>
                <S.TitleBox></S.TitleBox>
                <S.DescriptionBox></S.DescriptionBox>
            </S.Textrapper>
        </S.Container>
    );
}

export default Movieskeleton;
