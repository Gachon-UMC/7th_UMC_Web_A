import { todoInstance } from "../instance/todoInstance";
export const postTodos = async (data: any) => {
    try {
        await todoInstance.post("/todo", data);
    } catch (err) {
        throw new Error("등록 실패");
    }
};
