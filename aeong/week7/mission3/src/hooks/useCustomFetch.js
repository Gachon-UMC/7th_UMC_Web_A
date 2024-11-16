// useCustomFetch.js

import { useEffect } from "react";
import { axiosInstance } from "../apis/axios-instance";
import { useState } from "react";

const useCustomFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
