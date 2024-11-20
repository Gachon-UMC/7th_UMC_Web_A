import { SubmitHandler, useForm } from "react-hook-form";
import { schema } from "../schemas/inputSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoInstance } from "../instance/todoInstance";

type inputType = z.infer<typeof schema>;
const InputContainer = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<inputType>({ resolver: zodResolver(schema), mode: "onChange" });

    const onSubmit: SubmitHandler<inputType> = async (data) => {
        try {
            const res = await todoInstance.post("/todo", data);
            if (res.status === 201) alert("TODO가 생성되었습니다.");
        } catch (err) {
            alert("오류 발생");
        }
    };
    return (
        <form
            className="flex flex-col justify-center items-center  w-[40vw] gap-2"
            onSubmit={handleSubmit(onSubmit)}
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
