import { sortState } from "../recoil/sortState";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

// 버튼 관련된 컴포넌트 반복적으로 작성하기 싫어서
// Button 정보 담는 객체 생성
// 나중에 버튼 요소 추가할 때 객체만 변경하면 되니까 조금 더 효율적인 코드이지 않을까 생각

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

    // 버튼 클릭시 전역 상태 변수 변경
    return (
        <ButtonContainer>
            {buttonObj.map((el, idx) => {
                return (
                    <Button key={idx} onClick={() => setSortState(el.value)}>
                        {el.name}
                    </Button>
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
    display: flex;
    gap: 20px;
`;
const Button = styled.button`
    width: 100px;
    cursor: pointer;
`;
