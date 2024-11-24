import { useNavigate } from "react-router-dom";

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
