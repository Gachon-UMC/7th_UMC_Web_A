import { useState, useEffect } from "react";
import { axiosInstance } from "../apis/axios-instance";

interface UseCustomFetchReturn<T> {
    data: T | null;          // 데이터를 generic 타입으로 설정
    isLoading: boolean;      // 로딩 상태
    isError: boolean;        // 에러 상태
}

const useCustomFetch = <T,>(url: string): UseCustomFetchReturn<T> => {
    const [data, setData] = useState<T | null>(null); // 초기값 null로 설정
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get<T>(url); // 요청 결과 타입 지정
                setData(response.data);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, isLoading, isError };
};

export default useCustomFetch;
