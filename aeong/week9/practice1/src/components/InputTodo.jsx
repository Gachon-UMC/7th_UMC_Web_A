import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../redux/todoSlice";
import styled from "styled-components";

export default function InputTodo() {
  const dispatch = useDispatch();

  const [todolist, setTodolist] = useState({
    id: 0,
    text: "",
  });

  function handleText(e) {
    setTodolist({ text: e.target.value });
  }

  function onReset() {
    setTodolist({ text: "" });
  }

  return (
    <InputTodoContainer>
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          if (todolist.text !== "") {
            dispatch(add(todolist.text));
          } else alert("할 일을 입력해주세요!");
          onReset();
        }}
      >
        <InputContainer>
          <TextInput
            type="text"
            value={todolist.text}
            onChange={handleText}
          ></TextInput>
          <SubmitButton type="submit" value="+"></SubmitButton>
        </InputContainer>
      </StyledForm>
    </InputTodoContainer>
  );
}

const InputTodoContainer = styled.div`
  margin: 20px auto;
  width: 400px;
  display: flex;
  justify-content: center;
`;

const StyledForm = styled.form`
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SubmitButton = styled.input`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #003f7f;
  }
`;
