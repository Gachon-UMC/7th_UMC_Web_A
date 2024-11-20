import styled from "styled-components";

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

const Category = ({
    setCategory,
}: {
    setCategory: React.Dispatch<React.SetStateAction<string>>;
}) => {
    return (
        <CategoryContainer>
            {categoryObj.map((category) => (
                <button onClick={() => setCategory(category.value)}>
                    {category.name}
                </button>
            ))}
        </CategoryContainer>
    );
};

const CategoryContainer = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-around;
    border: 1px solid red;

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
