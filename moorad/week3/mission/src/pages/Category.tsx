import { sortState } from "../recoil/sortState";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

const buttonObj = [
    {
        name: "현재 상영중인",
        value: "nowPlaying",
    },
    {
        name: "높은 평점",
        value: "topRated",
    },
    {
        name: "개봉 예정",
        value: "upComing",
    },
    {
        name: "인기 ",
        value: "popular",
    },
];

const Category = () => {
    const setSortState = useSetRecoilState(sortState);
    // todo 전역 변수 상태 바꾼 후 메인 페이지 렌더링

    return (
        <ButtonContainer>
            {buttonObj.map((el, idx) => {
                return (
                    <button key={idx} onClick={() => setSortState(el.value)}>
                        {el.name}
                    </button>
                );
            })}
        </ButtonContainer>
    );
};

export default Category;

const ButtonContainer = styled.div`
    margin-left: 150px;
    padding-top: 100px;
    width: 100%;
    height: 50%;
    border: 1px solid red;
`;
const Button = styled.button`
    width: 400px;
`;
