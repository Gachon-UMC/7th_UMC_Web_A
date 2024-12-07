import React from "react";
import { axiosInstance } from "../apis/axiosInstance";
import { useQuery } from "@tanstack/react-query";
type mydata = {
    id: number;
    email: string;
    role: string;
};
const myData = async (): Promise<mydata> => {
    const response = await axiosInstance.get<mydata>("/v1/users/me");
    return response.data;
};

export default myData;
