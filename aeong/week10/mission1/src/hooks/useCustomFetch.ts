// useCustomFetch.ts
import { useEffect } from "react";
import { axiosInstance } from "../apis/axios-instance";
import { useState } from "react";

// <T> 제너릭 타입 허용, url 타입 지정
const useCustomFetch = <T>(url: string) => {
  // useState 타입 지정,
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(url);
        setData(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]); // url이 변경될 때마다 실행

  return { data, isLoading, isError };
};

export default useCustomFetch;
