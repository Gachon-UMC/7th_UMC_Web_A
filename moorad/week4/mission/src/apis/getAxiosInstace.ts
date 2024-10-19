import axios from "axios";
import { info } from "console";

const axiosInstance = axios.create({
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
    baseURL: "https://api.themoviedb.org/3/movie/",
});

export { axiosInstance };
