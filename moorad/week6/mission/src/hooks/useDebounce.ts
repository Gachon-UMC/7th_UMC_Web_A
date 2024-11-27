import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setDebouncedValue(value);
            setLoading(false);
        }, delay);
        return () => {
            clearTimeout(timer);
        }; //value 변경 시점에 clearTimeout을 해줘야함.
    }, [value]);

    return { debouncedValue, loading };
};

export default useDebounce;
