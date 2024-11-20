import React from "react";
import TodoItem from "./TodoItem";

// todo item 받아서 list로
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
