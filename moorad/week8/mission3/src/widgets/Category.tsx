import styled from "styled-components";
import React from "react";

const categoryObj = [
    {
        name: "현재 상영중인",
        value: "now_playing",
    },
    {
        name: "높은 평점",
        value: "top_rated",
    },
    {
        name: "개봉 예정",
        value: "upcoming",
    },
    {
        name: "인기 ",
        value: "popular",
    },
];

// 카테고리 컴포넌트 최적화
const Category = React.memo(
    ({
        setCategory,
    }: {
        setCategory: React.Dispatch<React.SetStateAction<string>>;
    }) => {
        return (
            <CategoryContainer>
                {categoryObj.map((category, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCategory(category.value)}
                    >
                        {category.name}
                    </button>
                ))}
            </CategoryContainer>
        );
    }
);

const CategoryContainer = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: space-around;
    padding: 0.5rem 0rem;

    & > button {
        width: 15%;
        border-radius: 5px;
        height: 100%;
        background-color: gray;
        border: none;
        color: black;
        cursor: pointer;
        &:hover {
            background-color: black;
            color: white;
        }
    }
`;

export default Category;
