import React from "react";
import Movieskeleton from "./movieskeleton";
// 수정 ( number 의 type 선언 )
function Movielistskeleton({ number }: { number: number }) {
    return new Array(number)
        .fill(0)
        .map((_, idx) => <Movieskeleton></Movieskeleton>);
}

export default Movielistskeleton;
