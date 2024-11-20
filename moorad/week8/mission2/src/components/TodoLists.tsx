import { useState } from "react";
import { schema } from "../schemas/inputSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteTodos } from "../apis/deleteTodos";
import { updateTodos } from "../apis/updateTodos";

type InputType = z.infer<typeof schema>;

type Todo = {
    id: number;
    title: string;
    content: string;
    checked: boolean;
    createdAt: string;
    updatedAt: string;
    version: number;
};

const TodoLists = ({ todoLists }: { todoLists: Todo[] }) => (
    <main className="mt-[1rem] w-[50%]">
        <ul className="flex flex-col">
            {todoLists.map((list) => (
                <List key={list.id} list={list} />
            ))}
        </ul>
    </main>
);

const List = ({ list }: { list: Todo }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isUpdatable, setIsUpdatable] = useState(false);

    const { register, handleSubmit, formState } = useForm<InputType>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const { isValid } = formState;

    const deleteTodo = useMutation({
        mutationFn: deleteTodos, // 명시적으로 mutationFn 사용
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todoLists"] });
            alert("삭제 성공!");
        },
        onError: (error) => {
            console.error(error);
            alert("삭제 실패!");
        },
    });

    const toggleCheckbox = useMutation({
        onMutate: async (id: number) => {
            await queryClient.cancelQueries({ queryKey: ["todoLists"] });
            const previousTodo = queryClient.getQueryData(["todoLists"]);
            queryClient.setQueryData(
                ["todoLists"],
                (oldTodos: Todo[] | undefined) =>
                    oldTodos?.map((todo) =>
                        todo.id === id
                            ? { ...todo, checked: !todo.checked }
                            : todo
                    )
            );
            return { previousTodo };
        },
        mutationFn: async () => {
            await updateTodos(list.id, { checked: !list.checked });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todoLists"] });
            alert("체크 상태 변경 성공!");
        },
        onError: () => {
            alert("체크 상태 변경 실패!");
        },
    });

    const updateTodo = useMutation({
        mutationFn: async (data: InputType) => {
            await updateTodos(list.id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todoLists"] });
            setIsUpdatable(false);
            alert("수정 완료!");
        },
        onError: () => {
            alert("수정 실패!");
        },
    });

    return (
        <li
            className="w-[100%] h-[4rem] grid grid-cols-[1fr_2fr_1fr] gap-1 border-2 border-gray-400"
            onClick={(e) => {
                if ((e.target as HTMLElement).tagName === "INPUT") return;
                navigate(`/todo/${list.id}`);
            }}
        >
            <div className="flex items-center justify-center h-full">
                <input
                    type="checkbox"
                    checked={list.checked}
                    onChange={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        toggleCheckbox.mutate(list.id);
                    }}
                />
            </div>

            {!isUpdatable ? (
                <div className="flex flex-col justify-center items-center h-full">
                    <span className="h-[50%]]">제목 : {list.title}</span>
                    <span>{list.content}</span>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center h-full">
                    <input
                        type="text"
                        placeholder="제목을 입력하세요."
                        defaultValue={list.title}
                        className="border-2 border-gray-300 pl-2"
                        {...register("title", { required: true })}
                    />
                    <input
                        type="text"
                        placeholder="내용을 입력하세요."
                        defaultValue={list.content}
                        className="border-2 border-gray-300 pl-2"
                        {...register("content", { required: true })}
                    />
                </div>
            )}

            <div className="flex gap-2 justify-center items-center h-full">
                {!isUpdatable ? (
                    <>
                        <Button
                            name="수정"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsUpdatable(true);
                            }}
                        />
                        <Button
                            name="삭제"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteTodo.mutate(list.id);
                            }}
                        />
                    </>
                ) : (
                    <Button
                        name="수정완료"
                        disabled={!isValid}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSubmit((data) => updateTodo.mutate(data))();
                        }}
                    />
                )}
            </div>
        </li>
    );
};

const Button = ({
    name,
    onClick,
    disabled = false,
}: {
    name: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}) => (
    <button
        className={`border-2 h-[80%] ${
            disabled ? "text-gray-200 bg-gray-700" : ""
        }`}
        disabled={disabled}
        onClick={onClick}
    >
        {name}
    </button>
);

export default TodoLists;
