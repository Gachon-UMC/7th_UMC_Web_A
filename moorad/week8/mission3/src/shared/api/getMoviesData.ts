import { movieInstance } from "../instance/apiInstance";
const lang = "ko-KR";

const getMoviesData = async (apiAddress: string, pageParam: number) => {
    const res = await movieInstance.get(
        `${apiAddress}?language=${lang}&page=${pageParam}`
    );
    const results = res.data.results;
    const totalPage = res.data.total_pages;

    return { results, totalPage };
};

export default getMoviesData;
