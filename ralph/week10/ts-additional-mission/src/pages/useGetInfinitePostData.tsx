// import React from "react";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { QueryGetData } from "./QueryGetData";
// const useGetInfinitePostData = (k: string) => {
//     return useInfiniteQuery({
//         queryKey: [k],
//         queryFn: ({ pageParam = 1 }) => {
//             console.log(pageParam);
//             return QueryGetData();
//         },
//         getNextPageParam: (lastPage, allPages) => {
//             console.log(lastPage);
//             const lastMovie = lastPage[lastPage.length - 1];
//             return lastMovie ? allPages?.length + 1 : undefined;
//         },
//     });
// };
// export default useGetInfinitePostData;
