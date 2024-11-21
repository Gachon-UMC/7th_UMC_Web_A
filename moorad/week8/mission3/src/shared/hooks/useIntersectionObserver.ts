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
                    // root가 null이면 viewport가 기준
                    // 즉 target.current가 뷰포트와 교차할 때만 onIntersect가 호출된다는 것.
                    // viewport와 교차한다는 것은 목표 요소 (target.current)가 브라우저 화면의 가시 영역에 들어오거나 나가는 순간을 감지
                    // threshold가 0.5이므로 목표 target.current의 viewport height의 절반 지점으로 오면 onIntersect가 실행
                    root: null,
                    rootMargin,
                    threshold,
                });
                // target.current를 관찰하고 있다는 뜻
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
