import axios from "axios";

const movieInstance = axios.create({
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
    baseURL: "https://api.themoviedb.org/3/movie/",
});

const searchMovieInstance = axios.create({
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
    baseURL: "https://api.themoviedb.org/3/search/movie",
    // baseURL에서 쿼리 파라미터가 있으면 안됨
});
export { movieInstance, searchMovieInstance };
