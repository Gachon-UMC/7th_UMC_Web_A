import { deleteTodo } from "./todoApi";
import { useState } from "react";
import React from "react";

const DeleteTodo = () => {
    const [todolist, setTodoList] = useState([]);
    const deleteData = async (id) => {
        try {
            await deleteTodo({ id }); // 특정 Todo 삭제
            setTodoList((a) => a.filter((todo) => todo.id !== id)); // 삭제된 항목 제외
        } catch (error) {
            console.error("Error deleting todo:", error.message);
        }
    };
    return { deleteData, todolist };
};

export default DeleteTodo;
