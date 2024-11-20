import { todoInstance } from "../instance/todoInstance";
export const getTodos = async (id: number) => {
    try {
        await todoInstance.get(`/todo/${id}`);
    } catch (err) {
        throw new Error("내부 서버 오류");
    }
};
