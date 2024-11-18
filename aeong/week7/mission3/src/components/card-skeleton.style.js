import styled, { keyframes } from "styled-components";

const MovieContainer = styled.div`
  margin: 10px;
  text-align: center;
  width: 200px;
  transition: all 0.2s ease;
`;

const Poster = styled.div`
  width: 160px;
  height: 240px;
  margin: 10px;
  border-radius: 10px;
  background: gray;
`;

const Title = styled.div`
  width: 160px;
  height: 40px;
  margin: 10px;
  border-radius: 5px;
  background: gray;
`;

const Date = styled.div`
  width: 160px;
  height: 20px;
  margin: 10px;
  border-radius: 5px;
  background: gray;
`;

export { MovieContainer, Poster, Title, Date };
