import { useCallback, useState } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const sendRequest = useCallback(async (requestConfig, ApplyData = null) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : "GET",
                headers: requestConfig.header ? requestConfig.header : {},
                body: requestConfig.body
                    ? JSON.stringify(requestConfig.body)
                    : null,
            });
            if (!res.ok) {
                throw new Error("Request failed!");
            }
            const data = await res.json();
            ApplyData && ApplyData(data);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, []);
    return {
        isLoading,
        error,
        sendRequest,
    };
};

export default useHttp;
