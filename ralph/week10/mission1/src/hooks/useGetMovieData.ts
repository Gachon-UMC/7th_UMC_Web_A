import { useQuery } from "react-query";
import useGetMoviesApi from "../apis/useGetMovieApi";
import { Movie } from "../types/movieTypes";
const useGetMovieData = ({
    category,
    page,
}: {
    category: string;
    page: number;
}) => {
    console.log(category, page);
    //수정
    // useQuery 는 제네릭 타입
    // <Movie[]> 이걸 안해주면 그냥 useQuery 가 반환하는 값의 타입에 의존하지만 정의해주는게 더 좋긴함
    // 제네릭 타입: 순서는 이렇게 됨:
    // useQuery <TData, TError, TQueryFnData, TQueryKey>(options)
    // option 이니까 나처럼 Movie[] 이렇게만 하면 나는 data의 type만 지정한거고 나머지 error, QueryData , QueryKey 는 반환해주는 대로 그 type을 자동으로 따라서 간다.
    // 엄밀히 말하면 queryFn 에서 실행되는 메서드에 의해서 return result 값이 반환되는데 이 값은 QueryData 에 저장되는 가공하지 않은 날 것의 데이터
    // 만약 내가 useQUery 이렇게만 하고 type을 지정해주지 않았다면 data에 들어가는 타입은  QueryFn 메서드를 통해서 반환받은 result 의 type을 그대로 따라가게 된다.
    // 그래서 굳이 타입을 선언안해도 데이터는 올바르게 들어옴 ( useQuery 만 써서 작동 시켜보니까 됨 )
    // 하지만 내 코드를 다른 사람이 봤을 때 data 의 type을 바로 알 수 있기 때문에 그런 점에서 사용함
    // 이 QueryData 의 type을 지정해주지 않은 이유는 useGetMoviesApi 컴포넌트에서 promise의 값을 Movie[]라는 type으로 지정을 해놓았기 때문에 그 type 그대로 반영해서 result 값의 type이 지정된다.
    // const result: Movie[] = await useGetMoviesApi({ category, pageParam: page }); 이렇게 선언하는거랑 같은 결과가 나온다는 뜻

    // 이러면 중요한게 일관성 있는 type 선언이 중요함
    //  const result: Movie[] 이렇게 호출할 때 type을 지정해주거나
    //useGetMoviesApi 에서  Promise<Movie[]> 이렇게 return 하는 반환값을 미리 지정해서 보내주고 호출부 에서는 그 type을 그대로 따라가는 이 2가지 type 선언 방식 중에 하나를 일관성 있게 해야함
    // 같은 내용의 type을 두번 선언하는건 불필요 함
    // 근데 내 생각엔 반환하는 값을 미리 type 지정해주는게 더 유지보수가 편할 거 같음

    const { data, isError, isLoading } = useQuery<Movie[]>({
        queryKey: [category, page],
        queryFn: async () => {
            //수정
            // 여기서 result의 type 을 지정 안해줘도 되는 이유는 useGetMoviesApi 컴포넌트에서 return 하는 promise 값을 Movie[]로 이미 type을 선언했기 때문에 또 다시 할 필요는 없음
            // TypeScript가 자동으로 result를 Movie[]로 추론

            const result = await useGetMoviesApi({ category, pageParam: page });

            return result;
        },
    });

    return { data, isError, isLoading };
};

export default useGetMovieData;
