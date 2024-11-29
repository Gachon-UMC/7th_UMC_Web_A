import React from "react";
import { axiosInstance } from "../apis/axios-instance";

const QueryMovieDetailData = async (movieId: string | undefined) => {
    const getData = await axiosInstance.get(
        `/movie/${movieId}/credits?language=ko`
    );

    return getData.data.cast;
};

export default QueryMovieDetailData;
