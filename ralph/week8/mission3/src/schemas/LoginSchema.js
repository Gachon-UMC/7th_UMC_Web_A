import * as yup from "yup";
import React from "react";

export const LoginSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required("이메일을 꼭 입력해주세요.")
        // 정규식을 쓸 때는 matches 메소드 사용
        .matches(
            /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
            "올바른 이메일 형식이 아닙니다. 다시 입력해주세요."
        ),
    password: yup
        .string()
        .min(8, "비밀번호는 8자리 이상이어야 합니다")
        .max(16, "비밀번호는 16자리 이하여야 합니다")
        .required(),
});
