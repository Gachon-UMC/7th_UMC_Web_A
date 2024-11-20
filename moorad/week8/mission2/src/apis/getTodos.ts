import { todoInstance } from "../instance/todoInstance";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type Todo = {
    id: number;
    title: string;
    content: string;
    checked: boolean;
    createdAt: string; // ISO8601 formatted date string
    updatedAt: string; // ISO8601 formatted date string
    version: number;
};
export const getTodos = async (): Promise<Todo[]> => {
    try {
        const res = await todoInstance.get("/todo");
        // await delay(2000);
        return res.data[0];
    } catch (err) {
        throw new Error("내부 서버 오류");
    }
};
