import axios from "axios";

const todoInstance = axios.create({
    headers: { accept: "application/json" },
    baseURL: "http://localhost:3000",
});
export { todoInstance };
