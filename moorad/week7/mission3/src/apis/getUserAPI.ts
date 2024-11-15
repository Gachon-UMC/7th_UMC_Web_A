import axios from "axios";

const userInstance = axios.create({
    headers: { accept: "application/json" },
    baseURL: "http://localhost:3000",
});
export { userInstance };
