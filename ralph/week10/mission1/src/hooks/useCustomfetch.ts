import { useEffect, useState } from "react";
import { axiosInstance } from "../apis/axios-instance.js";

//수정
//url 의 type을 string으로 선언
const useCustomfetch = (url: string) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get(url);
                setData(response.data.results); // 알맹이만 가져오기 , console.log로 data 찍어 보면 우리가 필요한 내용은 data 안에 results 부분이기 때문에 껍질 하나더 볏겨 줘야함
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url]);
    console.log(data);

    return { data, isLoading, isError };
};
export default useCustomfetch;
