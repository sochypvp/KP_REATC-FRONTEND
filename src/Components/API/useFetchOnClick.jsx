import { useCallback, useState } from "react"

const useFetchOnClick = (apiFunction) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLaoding] = useState(false);

    const fetchData = useCallback(async ()=>{
        setLaoding(false);
        setError(null);
        try {
            const result = await apiFunction();
            setData(result);
        } catch (error) {
            setError(error);
        } finally {
            setLaoding(false);
        }
    }, [apiFunction]);

    return {data, error, loading, fetchData};
}
export default useFetchOnClick;