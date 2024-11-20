import axios from "axios";

const API_URL = "http://localhost:3000"; // API URL

// 첫 번째 Todo만 반환하는 함수
export const fetchTodosAPI = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/todo`);
    return data[0]; // 첫 번째 Todo 항목 반환
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw new Error("Failed to fetch todos");
  }
};

// 새로운 Todo를 생성하는 함수
export const createTodoAPI = async (todo) => {
  try {
    const { data } = await axios.post(`${API_URL}/todo`, todo);
    return data; // 생성된 Todo 반환
  } catch (error) {
    console.error("Error creating todo:", error);
    throw new Error("Failed to create todo");
  }
};

// 기존 Todo를 업데이트하는 함수
export const updateTodoAPI = async ({ id, ...todo }) => {
  try {
    const { data } = await axios.patch(`${API_URL}/todo/${id}`, todo);
    return data; // 업데이트된 Todo 반환
  } catch (error) {
    console.error("Error updating todo:", error);
    throw new Error("Failed to update todo");
  }
};

// Todo를 삭제하는 함수
export const deleteTodoAPI = async (id) => {
  try {
    await axios.delete(`${API_URL}/todo/${id}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw new Error("Failed to delete todo");
  }
};
