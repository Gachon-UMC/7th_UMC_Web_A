import React from "react";
import { useParams } from "react-router-dom";
import Credits from "../components/credits";
import { useQuery } from "react-query";
import QueryMovieDetailData from "../components/QueryMovieDetailData";
import { MovieDetail } from "../types/movieTypes";
const MovieDetails = () => {
    const { movieId } = useParams();
    // movieId 라는 값은 App 컴포넌트에서 path 부분 뒤에 적은 것과 같은 이름이여야 한다.

    // 여기서 왜 useEffect 를 사용한 걸까?
    // 우리는 저 api에서 정보를 한번만 받아오면 되니까 useEffect 하고 []을 이용해서 movieDetails 컴포넌트가 처음 랜더링 될때 한번만 실행되고 그 뒤로 정보를 받아올 필요가 없다.
    // 근데 useEffect 를 쓰지 않으면 처음 컴포넌트가 랜더링 될때 abc 함수가 실행되고 그럼 setData 메서드를 통해 api로 부터 받아온 data가 data state 에 들어간다. 근데 data state 는 상태가 변화하면 다시 랜더링 되니까 movieDetails 컴포넌트가 또 랜더링 되고 그럼 api에서 데이터를 가져오는 abc 함수가 또 실행이 된다.
    // 결론 : 그래서 무한으로 계속 돌아가는 코드가 되어 버린다. 이해함??

    // useEffect(() => {
    //     const abc = async () => {
    //         const def = await axiosInstance.get(
    //             `/movie/${movieId}/credits?language=ko`
    //         );
    //         console.log(def);
    //         setData(def.data.cast);
    //     };
    //     abc();
    // }, []);

    const { data } = useQuery(["QueryData", movieId], () =>
        QueryMovieDetailData(movieId)
    );
    console.log(data);

    return (
        <div className="test">
            {data &&
                data
                    .filter((movie: MovieDetail) => movie.profile_path)
                    .map((movie: MovieDetail) => (
                        <Credits key={movie.id} movie={movie} />
                    ))}
        </div>
    );
};
// movie={movie} 의미: 각 영화 데이터를 Credits 컴포넌트에 movie라는 이름의 props로 전달
// 핵심은 앞에 있는 movie이다
// 이 movie 라는 이름의 props 로 전달하고 이걸 credits 컴포넌트에서 구조분해할당으로 받음
// 앞에 movie 라는 이름이 credits 컴포넌트의 props 값하고 같아야한다.

// data 에서 progfile_path 가 있는 사람들만 filter 메서드로 걸러서 map 메서드를 통해서 새로운 배열을 만들어서 Credits 컴포넌트에 전달
// 상위 컴포넌트에서 map 메서드를 통해서 하위 컴포넌트에 전달할 때 object(객체) 형태로 전달된다. 그래서 Credits 컴포넌트가 받은 movie 데이터도 (object)객체 형태이다
export default MovieDetails;
