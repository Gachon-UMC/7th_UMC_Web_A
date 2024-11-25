import { searchMovieInstance } from "../instance/apiInstance";
const lang = "ko-KR";

const getSearchMoviesData = async (searchValue: string, pageParam: number) => {
    const res = await searchMovieInstance.get("", {
        params: {
            query: searchValue,
            include_adult: false,
            language: lang,
            page: pageParam,
        },
    });

    const results = res.data.results;
    const totalPage = res.data.total_pages;

    return { results, totalPage };
};

export default getSearchMoviesData;
