// import React from "react";
// import { useQuery } from "react-query";
// import { getTodoList } from "./todoApi";
// import { useRecoilState } from "recoil";
// import { searchState } from "./atom";
// const GetTodo = () => {
//     const [search, setSearch] = useRecoilState(searchState);
//     const {
//         data: todos,
//         isError,
//         isLoading,
//         isPending,
//     } = useQuery({
//         queryKey: ["gettodo", search],
//         queryFn: () => getTodoList({ title: search }),
//     });
//     console.log(todos);

//     return { todos, isError, isLoading, isPending };
// };

// export default GetTodo;
