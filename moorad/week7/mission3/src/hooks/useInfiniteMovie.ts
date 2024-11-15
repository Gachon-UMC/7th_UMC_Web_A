import { useEffect } from "react";

const {
    data: movies,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
} = useInfiniteQuery({
    queryKey: ["movieDatas", apiAddress],
    queryFn: ({ pageParam }) => getMoviesData(apiAddress, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
        const currentPage = allPages.length;
        return currentPage < lastPage.totalPage ? currentPage + 1 : undefined;
    },
    select: (data) => {
        return data.pages.flatMap((el) => el.results);
    },
});
const useObserver = ({
    target,
    rootMargin = "0px",
    threshold = 0.5,
    onIntersect,
}) => {
    useEffect(() => {
        let observer: IntersectionObserver | undefined;
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
