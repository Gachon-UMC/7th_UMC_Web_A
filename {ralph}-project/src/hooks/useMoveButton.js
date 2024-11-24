import React from "react";
import { useState } from "react";
const useMoveButton = () => {
    const [page, setPage] = useState(1);
    const reverseButton = () => {
        return setPage(Math.max(page - 1, 1));
    };

    const nextButton = () => {
        return setPage(page + 1);
    };

    return { reverseButton, nextButton, page };
};

export default useMoveButton;
