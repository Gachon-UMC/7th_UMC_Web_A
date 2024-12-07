// axios-instance.ts

// AxiosInstance를 추가로 import
import axios, { AxiosInstance } from "axios";

// axiosInstance의 타입을 AxiosInstance로 명시
const axiosInstance: AxiosInstance = axios.create({
  headers: {
    // import.meta.env.VITE_TMDB_TOKEN을 string 타입으로 명시
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN as string}`,
  },
  // import.meta.env.VITE_MOVIE_API_URL을 string 타입으로 명시
  baseURL: import.meta.env.VITE_MOVIE_API_URL as string,
});

export { axiosInstance };
