import { useState, useEffect } from "react";
import Category from "../widgets/Category";
import styled from "styled-components";

const MainPage = () => {
    // string 타입이 아닌 categoryObj 타입으로 변환
    const [category, setCategory] = useState<string>("now_playing");
    const [movieDatas, setMovieDatas] = useState([]);
    useEffect(() => {
        console.log("현재 category : ", category);
    }, [category]);
    return (
        <MainContainer>
            <Category setCategory={setCategory}></Category>
            MainPage
        </MainContainer>
    );
};

const MainContainer = styled.main`
    width: 100%;
    border: 1px solid red;
`;
export default MainPage;
