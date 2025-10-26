import { useEffect, useRef, useCallback } from "react";

export const useInfiniteScroll = (
    onLoadMore: () => void,
    hasMore: boolean,
    isLoading: boolean
) => {
    const sentinelRef = useRef<HTMLDivElement>(null);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && hasMore && !isLoading) {
                onLoadMore();
            }
        },
        [onLoadMore, hasMore, isLoading]
    );

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "100px",
            threshold: 0.1,
        });
        observer.observe(sentinel);
        return () => {
            observer.disconnect();
        };
    }, [handleObserver]);

    return sentinelRef;
};