import { useNavigate } from "react-router-dom";

/**
 *
 * @param to
 * @param options
 * @returns
 * 페이지 네비게이션시에 to(목적지)를 인자로 받고,
 * options(전달할 객체)가 존재한다면 해당 페이지에 객체를 넘겨줍니다.
 */
const usePageNavigate = (
    to: string,
    options: { state: { value: string } } | undefined = undefined
) => {
    const navigate = useNavigate();
    const handleNavigate = (
        to: string,
        options: { state: { value: string } } | undefined
    ) => {
        if (options === undefined) {
            navigate(to);
        } else {
            navigate(to, options);
        }
    };

    return () => handleNavigate(to, options);
};

export default usePageNavigate;
