import React from "react";
import { axiosInstance2 } from "../../../../week7/mission2/src/apis/axiosInstance2";

// Todo 생성하기
const createTodo = async ({ title, content, checked = false }) => {
    const { data } = await axiosInstance2.post("/todo", {
        title,
        content,
        checked,
    });
    alert("todo 생성 완료");
    console.log(data);

    return data;
};
// Todo List 가져오기
const getTodoList = async ({ title }) => {
    let url = "/todo";
    if (title) {
        url += `?title=${title}`;
    }
    const { data } = await axiosInstance2.get(url);
    return data;
};

// Todo 단일 특성 가져오기
const getTodoDetail = async ({ id }) => {
    const { data } = await axiosInstance2.get(`/todo/${id}`);
    console.log(data);

    return data;
};

// Todo 수정하기
const patchTodo = async ({ id, title, content, checked = false }) => {
    console.log(id);

    const data = await axiosInstance2.patch(`/todo/${id}`, {
        id: id,
        title: title,
        content: content,
        checked: checked,
    });
    console.log(data);

    return data;
};
// Todo 삭제하기
const deleteTodo = async ({ id }) => {
    console.log(id);

    const { data } = await axiosInstance2.delete(`/todo/${id}`);
    console.log(data);

    return data;
};
export { createTodo, getTodoList, getTodoDetail, patchTodo, deleteTodo };
