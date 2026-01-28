import { useEffect, useState } from 'react';

export function usePerformanceMode() {
    const [isLowPerformance, setIsLowPerformance] = useState(false);

    useEffect(() => {
        // Detect low-end devices
        const isLowEnd =
            (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) || // 2 or fewer CPU cores
            /Android|webOS|BlackBerry/i.test(navigator.userAgent); // Mobile devices

        setIsLowPerformance(isLowEnd);
    }, []);

    return { isLowPerformance };
}
