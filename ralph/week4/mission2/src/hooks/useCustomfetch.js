import {useEffect, useState} from "react";
import { axiosInstance } from "../apis/axios-instance.js";

const useCustomfetch = (url) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading]= useState(false);
  const [isError, setIsError]= useState(false);

  useEffect(() => {
    const fetchData = async () =>  {
      setIsLoading(true);
      try {
        const response =await axiosInstance.get(url)
        setData(response.data.results); // 알맹이만 가져오기
      } catch (error){
        setIsError(true)
     }finally {
      setIsLoading(false);
     }
    }
    fetchData();
  },[url])

return {data,isLoading,isError}
}
export default useCustomfetch;