import axios, { AxiosInstance } from "axios";

// 환경 변수 타입 정의
const API_TOKEN = import.meta.env.VITE_API_TOKEN as string;
const API_URL = import.meta.env.VITE_API_URL as string;

if (!API_TOKEN || !API_URL) {
    throw new Error("Missing environment variables: VITE_API_TOKEN or VITE_API_URL");
}

// axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${API_TOKEN}`,
    },
    baseURL: API_URL,
});

export { axiosInstance };
