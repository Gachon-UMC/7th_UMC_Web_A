import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { todoInstance } from "../instance/todoInstance";

type Todo = {
    id: number;
    title: string;
    content: string;
    checked: boolean;
    createdAt: string; // ISO8601 formatted date string
    updatedAt: string; // ISO8601 formatted date string
    version: number;
};

const TodoDetail = () => {
    const { id } = useParams();
    const [todo, setTodo] = useState<Todo[]>();
    useEffect(() => {
        const getTodoById = async () => {
            const res = await todoInstance.get(`/todo/${id}`);
            if (res.status === 200) setTodo(res.data);
        };
        getTodoById();
    }, []);
    console.log(todo);
    return (
        <div className="flex flex-col">
            {todo &&
                Object.keys(todo).map((el) => (
                    <span>
                        {el} : {todo[el]}
                    </span>
                ))}
        </div>
    );
};

export default TodoDetail;
