import { useForm } from "react-hook-form";
import { schema } from "../schemas/inputSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { postTodos } from "../apis/postTodos";
import { useQueryClient } from "@tanstack/react-query";

type inputType = z.infer<typeof schema>;
const InputContainer = () => {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<inputType>({ resolver: zodResolver(schema), mode: "onChange" });

    const postTodo = useMutation({
        mutationFn: async (data: inputType) => await postTodos(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todoLists"] });
            alert("등록 성공");
        },
    });

    return (
        <form
            className="flex flex-col justify-center items-center  w-[40vw] gap-2"
            onSubmit={handleSubmit((data) => postTodo.mutate(data))}
        >
            <input
                type="text"
                placeholder="제목을 입력해주세요."
                className="border-2 w-full pl-2"
                {...register("title", { required: true })}
            />
            {errors.title && (
                <h3 className="text-red-600">{errors.title.message}</h3>
            )}
            <input
                type="text"
                placeholder="내용을 입력해주세요."
                className="border-2 w-full pl-2"
                {...register("content", { required: true })}
            />
            {errors.content && (
                <h3 className="text-red-600">{errors.content.message}</h3>
            )}

            <button
                type="submit"
                className={`border-2 w-[70%] hover:bg-sky-400 hover:text-white rounded-md ${
                    !isValid && "bg-gray-600 cursor-not-allowed"
                }`}
                disabled={!isValid}
            >
                TODO 생성
            </button>
        </form>
    );
};

export default InputContainer;
