import InputContainer from "../components/InputContainer";
import TodoLists from "../components/TodoLists";
import { BeatLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../apis/getTodos";
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
    const {
        data: todoLists,
        isLoading,
        error,
    } = useQuery<Todo[]>({
        queryKey: ["todoLists"],
        queryFn: getTodos,
        initialData: undefined,
    });
    return (
        <div className="w-[100vw]  flex flex-col justify-center items-center ">
            <h1 className="text-[3rem]">Moorad ToDo List</h1>
            <InputContainer></InputContainer>
            {isLoading ? (
                <BeatLoader loading={isLoading} size={40} color={"#99ff33"} />
            ) : error ? (
                <h1>오류</h1>
            ) : (
                // <></>
                <TodoLists todoLists={todoLists || []}></TodoLists>
            )}
        </div>
    );
};

export default App;
