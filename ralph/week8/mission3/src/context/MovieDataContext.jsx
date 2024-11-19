import React from "react";
import { createContext } from "react";
import useGetMovieData from "../hooks/useGetMovieData";
import useMoveButton from "../hooks/useMoveButton";
export const MovieDataContext = createContext();

export const MovieDataContextProvider = ({ children }) => {
    const { reverseButton, nextButton, page } = useMoveButton();
    const { data, isError, isLoading } = useGetMovieData({
        category: "top_rated",
        page: page,
    });
    console.log(data);

    return (
        <MovieDataContext.Provider
            value={{
                data,
                isError,
                isLoading,
                reverseButton,
                nextButton,
                page,
            }}
        >
            {children}
        </MovieDataContext.Provider>
    );
};

export default MovieDataContext;
