import React from "react";
import { useState } from "react";
const useMoveButton = () => {
    const [page, setPage] = useState(1);
    const reverseButton = () => {
        return setPage(Math.max(page - 1, 1)); // page-1 과 1 중에 터 큰 값을 반환 // 페이지 번호가 1 이하로 내려가는 것을 방지
    };

    const nextButton = () => {
        return setPage(page + 1);
    };

    return { reverseButton, nextButton, page };
};

export default useMoveButton;
