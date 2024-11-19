import * as yup from "yup";
export const SignUpSchema = yup.object().shape({
    email: yup
        .string()
        .matches(
            /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
            "올바른 이메일 형식이 아닙니다. 다시 입력해주세요."
        )
        .required("이메일을 꼭 입력해주세요."),
    password: yup
        .string()
        .min(8, "비밀번호는 8자리 이상 입력해주세요")
        .max(16, "비밀번호는 16자리 이하로 입력해주세요")
        .required("비밀번호를 꼭 입력해주세요."),
    checkPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다")
        .required("비밀번호를 한번 더 입력해 주세요"),
});
