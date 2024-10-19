import { useNavigate } from "react-router-dom";
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
const Category = () => {
    const navigate = useNavigate();
    return (
        <CategoryContainer>
            {categoryObj.map((category) => {
                return (
                    <button
                        onClick={() =>
                            navigate("movies", {
                                state: { value: category.value },
                            })
                        }
                    >
                        {category.name}
                    </button>
                );
            })}
        </CategoryContainer>
    );
};

const CategoryContainer = styled.div`
    width: 100%;
    height: 8rem;
    border: 1px solid white;
    display: flex;
    justify-content: space-around;
    align-items: center;

    & > button {
        width: 20%;
        height: 50%;
        cursor: pointer;
        background-color: transparent;
        color: white;
        border: 1px solid white;
    }
`;
export default Category;
