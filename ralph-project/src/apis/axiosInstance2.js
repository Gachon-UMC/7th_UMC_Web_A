import axios from "axios";
const axiosInstance2 = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

export { axiosInstance2 };
