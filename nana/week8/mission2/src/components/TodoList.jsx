import React from "react";
import TodoItem from "./TodoItem";

// Todo 목록 렌더링 컴포넌트
const TodoList = ({ todos, onUpdateTodo, onDeleteTodo }) => {
  return (
    <div>
      {todos?.map((todo) => (
        <div key={todo.id}>
          <TodoItem
            todo={todo}
            onUpdateTodo={onUpdateTodo}
            onDeleteTodo={onDeleteTodo}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
