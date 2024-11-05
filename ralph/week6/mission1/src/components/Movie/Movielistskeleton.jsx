import React from "react";
import Movieskeleton from "./movieskeleton";

function Movielistskeleton({ number }) {
    return new Array(number)
        .fill(0)
        .map((_, idx) => <Movieskeleton></Movieskeleton>);
}

export default Movielistskeleton;
