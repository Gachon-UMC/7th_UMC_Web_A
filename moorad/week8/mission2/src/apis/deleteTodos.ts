import { todoInstance } from "../instance/todoInstance";

export const deleteTodos = async (id: number) => {
    try {
        await todoInstance.delete(`/todo/${id}`);
    } catch (err) {
        throw new Error("오류에 인한 삭제 실패 ");
    }
};
