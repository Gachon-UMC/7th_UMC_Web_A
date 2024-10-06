import styled from "styled-components";

const CustomButton = () => {
  return (
    <>
      <FirstStyledSweetPotato color={"purple"}>고구마</FirstStyledSweetPotato>
      <FirstStyledSweetPotato>고구마</FirstStyledSweetPotato>
    </>
  );
};

export default CustomButton;

//or 연산자 ||를 통해서 color props가 전달되지 않은 경우에는 purple 색상을 기본적으로
const FirstStyledSweetPotato = styled.button`
  background-color: ${(props) => props.color || "purple"};
  border: none;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  color: white;
`;
