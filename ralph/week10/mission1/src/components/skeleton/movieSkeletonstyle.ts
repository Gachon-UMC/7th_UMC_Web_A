import styled, { keyframes } from "styled-components";

const skeleton = keyframes`
  0% {
    opacity: 1;
  }
  30% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.4;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
`;

const Edward = styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 20px;
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;
const Moviemain = styled.div`
    width: 140px;
    height: 210px;
    background-color: gray;
    border-radius: 10px;
    overflow: hidden;
    animation: ${skeleton} 2s infinite;
`;
const Textrapper = styled.div`
    width: 140px;
    height: 30px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 5px;
`;
const TitleBox = styled.div`
    background-color: gray;
    border-radius: 10px;
    width: 140px;
    height: 100%;
    animation: ${skeleton} 2s infinite;
`;
const DescriptionBox = styled.div`
    background-color: gray;
    border-radius: 10px;
    width: 140px;
    height: 100%;
    animation: ${skeleton} 2s infinite;
`;
export { Edward, Container, Moviemain, Textrapper, TitleBox, DescriptionBox };
