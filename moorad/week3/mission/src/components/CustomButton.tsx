import styled from "styled-components";

const CustomButton = ({ color }: { color: string }) => {
    return <FisrtStyledButton color={color}>CustomButton</FisrtStyledButton>;
};

export default CustomButton;

const FisrtStyledButton = styled.button`
    background-color: ${(props) => props.color || "purple"};
    border: none;
    border-radius: 10px;
    padding: 20px;
    cursor: pointer;
    color: white;
`;
