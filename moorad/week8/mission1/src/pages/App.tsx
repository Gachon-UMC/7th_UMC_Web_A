import { useEffect, useState } from "react";
import InputContainer from "../components/InputContainer";
import TodoLists from "../components/TodoLists";
import { todoInstance } from "../instance/todoInstance";
import { BeatLoader } from "react-spinners";
type Todo = {
    id: number;
    title: string;
    content: string;
    checked: boolean;
    createdAt: string; // ISO8601 formatted date string
    updatedAt: string; // ISO8601 formatted date string
    version: number;
};

const App = () => {
    const [todoLists, setTodoLists] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const delay = (ms: number) =>
            new Promise((resolve) => setTimeout(resolve, ms));

        const getTodoLists = async () => {
            try {
                setIsLoading(true);
                const res = await todoInstance.get("/todo");
                await delay(300);
                setTodoLists(res.data[0]);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
            }
        };
        getTodoLists();
    }, []);
    return (
        <div className="w-[100vw]  flex flex-col justify-center items-center ">
            <h1 className="text-[3rem]">Moorad ToDo List</h1>
            {isLoading ? (
                <BeatLoader loading={isLoading} size={40} color={"#99ff33"} />
            ) : (
                <>
                    <InputContainer></InputContainer>
                    <TodoLists todoLists={todoLists}></TodoLists>
                </>
            )}
        </div>
    );
};

export default App;
