import { z } from "zod";
export const signInSchema = z
    .object({
        email: z.coerce
            .string()
            .email({ message: "올바른 이메일 형식이 아닙니다." }),
        password: z.coerce
            .string()
            .min(8, { message: "비밀번호는 8자리 이상이어야 합니다." })
            .max(16, { message: "비밀번호는 16자리 이하여야 합니다." }),
    })
    .required();

export const signUpSchema = z
    .object({
        email: z.coerce
            .string()
            .email({ message: "올바른 이메일 형식이 아닙니다." }),
        password: z.coerce
            .string()
            .min(8, { message: "비밀번호는 8자리 이상이어야 합니다." })
            .max(16, { message: "비밀번호는 16자리 이하여야 합니다." }),
        passwordCheck: z.coerce.string(),
    })
    .superRefine((values, ctx) => {
        if (values.password !== values.passwordCheck) {
            ctx.addIssue({
                path: ["passwordCheck"],
                message: "비밀번호가 일치하지 않습니다.",
                code: z.ZodIssueCode.custom,
            });
        }
    });
