import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getTodoDetail } from "./todoApi";
const GetTodoDetails = () => {
    const { todoId } = useParams();
    const { data, isLoading } = useQuery({
        queryFn: () => getTodoDetail({ id: todoId }),
        queryKey: ["gettodo", todoId],
    });

    return isLoading ? (
        <div>로딩중</div>
    ) : (
        <div>
            <div>Id: {todoId}</div>
            <div>{data.title}</div>
            <div>{data.content}</div>
            <div>상태: {data.checked ? "완료" : "미완료"}</div>
        </div>
    );
};

export default GetTodoDetails;
