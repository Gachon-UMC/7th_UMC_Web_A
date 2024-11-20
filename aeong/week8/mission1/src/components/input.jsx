// input.jsx
import styled from "styled-components";
import { useState } from "react";

const Input = ({ createTodo }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreateTodo = () => {
    createTodo(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <InputContainer>
      <Titleinput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력해 주세요"
      />
      <Contentinput
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력해 주세요"
      />
      <CreateToDoButton type="button" onClick={handleCreateTodo}>
        ToDo 생성
      </CreateToDoButton>
    </InputContainer>
  );
};

export default Input;

// CSS
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Titleinput = styled.input`
  width: 96%;
  padding: 0.5rem;
  margin: 0.2rem;
`;
const Contentinput = styled.input`
  width: 96%;
  padding: 0.5rem;
  margin: 0.2rem;
`;
const CreateToDoButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  margin: 0.2rem;
  color: gray;
`;
