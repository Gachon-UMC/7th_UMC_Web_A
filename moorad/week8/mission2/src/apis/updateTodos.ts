import { todoInstance } from "../instance/todoInstance";

export const updateTodos = async (id: number, data: any) => {
    try {
        await todoInstance.patch(`/todo/${id}`, data);
    } catch (err) {
        throw new Error("update 실패");
    }
};
