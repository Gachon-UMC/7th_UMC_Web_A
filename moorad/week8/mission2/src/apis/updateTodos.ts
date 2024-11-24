const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

import { todoInstance } from "../instance/todoInstance";

export const updateTodos = async (id: number, data: any) => {
    try {
        await delay(1000);
        await todoInstance.patch(`/todo/${id}`, data);
    } catch (err) {
        throw new Error("update 실패");
    }
};
