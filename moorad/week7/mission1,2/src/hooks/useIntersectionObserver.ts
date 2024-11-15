import { useEffect } from "react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

interface UseObserverProps {
    target: React.RefObject<HTMLElement>; // useRef로 생성된 HTML 요소 참조
    onIntersect: (entries: IntersectionObserverEntry[]) => void; // 교차 상태를 처리하는 함수
    rootMargin?: string; // 옵셔널: 루트 마진
    threshold?: number | number[]; // 옵셔널: 교차 임계값
}
const useIntersectionObserver = (
    bottomRef: React.RefObject<HTMLElement>,
    fetchNextPage: () => Promise<UseInfiniteQueryResult>
) => {
    const useObserver = ({
        target,
        rootMargin = "0px",
        threshold = 0.5,
        onIntersect,
    }: UseObserverProps) => {
        useEffect(() => {
            let observer: IntersectionObserver | undefined;
            // 대상이 존재하고 target.current 값이 유효하다면
            if (target && target.current) {
                observer = new IntersectionObserver(onIntersect, {
                    root: null,
                    rootMargin,
                    threshold,
                });
                observer.observe(target.current);
            }
            return () => observer && observer.disconnect();
        }, [target, rootMargin, threshold, onIntersect]);
    };
    const onIntersect = ([entry]: IntersectionObserverEntry[]) =>
        entry.isIntersecting && fetchNextPage();

    useObserver({
        target: bottomRef,
        onIntersect,
    });
};

export default useIntersectionObserver;
