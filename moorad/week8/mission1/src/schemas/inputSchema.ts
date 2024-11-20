import { z } from "zod";

export const schema = z.object({
    title: z.string().min(1, { message: "제목은 필수로 입력돼야 합니다." }),
    content: z.string().min(1, { message: "내용은 필수로 입력돼야 합니다." }),
});
