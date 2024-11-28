import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove, complete } from "../redux/todoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

export default function TodoList() {
  // useSelector를 이용하여 reducer에 있는 state에 접근
  const todolist = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const trash = <FontAwesomeIcon icon={faTrashCan} />;

  console.log(todolist);

  const todolistView = todolist.map((todo, idx) => (
    <TodoItem key={todolist[idx].id}>
      <Checkbox
        type="checkbox"
        onChange={() => dispatch(complete(todolist[idx].id))}
      />
      <Text>
        {todo.complete === false ? <>{todo.text}</> : <del>{todo.text}</del>}
      </Text>
      <DeleteButton
        type="button"
        onClick={() => dispatch(remove(todolist[idx].id))}
      >
        {trash}
      </DeleteButton>
    </TodoItem>
  ));

  return (
    <>
      <ul>{todolistView}</ul>
    </>
  );
}

const TodoItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Text = styled.div`
  flex: 1;
  font-size: 16px;
  ${({ complete }) =>
    complete &&
    `
    text-decoration: line-through;
    color: gray;
  `}
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: red;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
