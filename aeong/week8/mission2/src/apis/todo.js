import { axiosInstance } from "./axios-instance";

// ToDo 생성
const postTodo = async ({ title, content, checked = false }) => {
  const { data } = await axiosInstance.post("/todo", {
    title,
    content,
    checked,
  });

  return data;
};

// ToDo 리스트 가져오기 (title)
const getTodoList = async ({ title }) => {
  let url = "/todo";

  if (title) {
    url += `?title=${title}`;
  }

  const { data } = await axiosInstance.get(url);

  return data;
};

// ToDo 단건 가져오기
const getTodo = async ({ id }) => {
  const { data } = await axiosInstance.get(`/todo/${id}`);

  return data;
};

// ToDo 수정하기
const petchTodo = async ({ id, title, content, checked }) => {
  const { data } = await axiosInstance.petch(`/todo/${id}`, {
    title,
    content,
    checked,
  });

  return data;
};

// ToDo 삭제하기
const deleteTodo = async ({ id }) => {
  const { data } = await axiosInstance.delete(`/todo/${id}`);

  return data;
};

export { postTodo, getTodoList, getTodo, petchTodo, deleteTodo };
