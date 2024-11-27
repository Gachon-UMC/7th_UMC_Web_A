import { signInSchema, signUpSchema } from "./../schema/accountSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { internalServerInstance } from "../instance/apiInstance";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginState } from "../recoil/loginState";

const obj = {
    signin: { url: "/auth/login", schema: signInSchema },
    signup: { url: "/auth/register", schema: signUpSchema },
};

/**
 *
 * @param name
 * @returns
 * 회원가입인지 로그인인지에 따라 다르게 schema를 적용해서
 * 성공시에 동작도 다르게 작동할 수 있도록 적용하였습니다.
 *
 */
const usePostAccount = (name: "signin" | "signup") => {
    const setIsLoggedIn = useSetRecoilState(loginState);
    const navigate = useNavigate();

    const schema = obj[name].schema;
    type FormData = z.infer<typeof schema>;

    const mutationFn = async (data: FormData) =>
        await internalServerInstance.post(obj[name].url, data);

    // useForm 설정
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    // Mutation 설정
    const mutation = useMutation({
        mutationFn,
        onSuccess: (res) => {
            if (name === "signin") {
                const token = res?.data?.accessToken;
                const refreshToken = res.data.refreshToken;
                if (token) {
                    localStorage.setItem("accessToken", token);
                    localStorage.setItem("refreshToken", refreshToken);
                    alert("로그인 성공!");
                    setIsLoggedIn(true);
                    navigate("/");
                }
            } else if (name === "signup") {
                alert("회원 가입이 완료되었습니다.");
                navigate("/signin");
            }
        },
        onError: () => {
            if (name === "signin") {
                alert("일치하지 않는 이메일 또는 비밀번호입니다.");
            } else {
                alert("유효하지 않은 이메일 또는 비밀번호입니다.");
            }
        },
    });

    return { register, handleSubmit, errors, isValid, mutation };
};

export default usePostAccount;
