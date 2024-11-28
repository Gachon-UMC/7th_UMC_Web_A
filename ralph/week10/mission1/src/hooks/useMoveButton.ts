import React from "react";
import { useState } from "react";
// 전역으로 관리 하는 경우
// useMoveButton을 여러 컴포넌트에서 사용하고 타입을 재사용해야 할 경우.
//타입 선언이 많아져 컴포넌트 파일을 깔끔하게 유지하고 싶을 경우
// 이렇게 type 선언한 이유는 return { reverseButton, nextButton, page };때문이다.
//u seMoveButton 훅이 반환하는 객체의 구조를 명확히 타입으로 지정하기 위해서
type UseMoveButtonReturn = {
    reverseButton: () => void;
    nextButton: () => void;
    page: number;
};

const useMoveButton = (): UseMoveButtonReturn => {
    // page 상태에 number 타입 지정
    const [page, setPage] = useState<number>(1);
    const reverseButton = () => {
        return setPage(Math.max(page - 1, 1));
    };

    const nextButton = () => {
        return setPage(page + 1);
    };

    return { reverseButton, nextButton, page };
};

export default useMoveButton;
