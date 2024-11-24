import { todoInstance } from "../instance/todoInstance";
import { useState } from "react";
import { schema } from "../schemas/inputSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
type inputType = z.infer<typeof schema>;

type Todo = {
    id: number;
    title: string;
    content: string;
    checked: boolean;
    createdAt: string; // ISO8601 formatted date string
    updatedAt: string; // ISO8601 formatted date string
    version: number;
};

const TodoLists = ({ todoLists }: { todoLists: Todo[] }) => {
    return (
        <main className="mt-[1rem] w-[50%]">
            <ul className="flex flex-col">
                {todoLists.length > 0 &&
                    todoLists.map((list, idx) => (
                        <List key={idx} list={list}></List>
                    ))}
            </ul>
        </main>
    );
};

const List = ({ list }: { list: Todo }) => {
    // input onClick event 추가
    // 버튼 별 onClick event 추가
    const [isUpdatable, setIsUpdatable] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<inputType>({ resolver: zodResolver(schema), mode: "onChange" });

    const handleCheckbox = async () => {
        try {
            const res = await todoInstance.patch(`/todo/${list.id}`, {
                checked: !list.checked,
            });
            if (res.status === 200) alert("미션 수행 완료!");
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const res = await todoInstance.delete(`/todo/${id}`);
            if (res.status === 200) alert("삭제 완료");
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdate = async (id: number, data: inputType) => {
        try {
            const res = await todoInstance.patch(`/todo/${id}`, data);
            if (res.status === 200) {
                alert("수정 완료!");
                setIsUpdatable(false);
            }
        } catch (err) {
            console.error(err);
        }
    };
    const navigate = useNavigate();
    return (
        <li
            key={list.id}
            className="w-[100%] h-[4rem] grid grid-cols-[1fr_2fr_1fr] gap-1 border-2 border-gray-400"
            onClick={(e) => {
                e.stopPropagation(); // 이벤트 버블링 방지
                navigate(`/todo/${list.id}`);
            }}
        >
            <div
                className="flex items-center justify-center h-full"
                onClick={(e) => e.stopPropagation()} // 부모 클릭 이벤트 방지
            >
                <input
                    type="checkbox"
                    checked={list.checked}
                    onChange={(e) => {
                        e.stopPropagation(); // 이벤트 버블링 방지
                        handleCheckbox();
                    }}
                />
            </div>
            {!isUpdatable ? (
                <div className="flex flex-col justify-center items-center h-full">
                    <span className="h-[50%]]">제목 : {list.title}</span>
                    <span>{list.content}</span>
                </div>
            ) : (
                // 중복 컴포넌트 분리
                <div className="flex flex-col justify-center items-center h-full">
                    <input
                        type="text"
                        placeholder="제목을 입력하세요."
                        defaultValue={list.title}
                        className="border-2 border-gray-300 pl-2"
                        onClick={(e) => e.stopPropagation()}
                        {...register("title", { required: true })}
                    />
                    <input
                        type="text"
                        placeholder="내용을 입력하세요."
                        defaultValue={list.content}
                        className="border-2 border-gray-300 pl-2"
                        onClick={(e) => e.stopPropagation()}
                        {...register("content", { required: true })}
                    />
                </div>
            )}

            <div
                className="flex gap-2 justify-center items-center h-full"
                onClick={(e) => e.stopPropagation()} // 부모 클릭 이벤트 방지
            >
                {!isUpdatable ? (
                    <>
                        <Button
                            name={"수정"}
                            id={list.id}
                            onClick={(e) => {
                                e.stopPropagation(); // 이벤트 버블링 방지
                                setIsUpdatable((prev) => !prev);
                            }}
                        ></Button>
                        <Button
                            name={"삭제"}
                            id={list.id}
                            onClick={(e) => {
                                e.stopPropagation(); // 이벤트 버블링 방지
                                handleDelete(list.id);
                            }}
                        ></Button>
                    </>
                ) : (
                    <Button
                        name={"수정완료"}
                        id={list.id}
                        disabled={!isValid}
                        onClick={(e) => {
                            e.stopPropagation();
                            // ?????
                            // 반환된 함수에 이벤트 객체를 전달하여 실행하는 역할
                            handleSubmit((data) => handleUpdate(list.id, data))(
                                e
                            );
                        }}
                    ></Button>
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
    id: number;
    disabled?: boolean | undefined;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
    return (
        <button
            className={`border-2 h-[80%] ${
                disabled && `text-gray-200 bg-gray-700`
            }`}
            disabled={disabled}
            onClick={onClick}
        >
            {name}
        </button>
    );
};

export default TodoLists;
