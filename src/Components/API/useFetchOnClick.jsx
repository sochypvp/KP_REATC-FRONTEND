import { useCallback, useState } from "react"

const useFetchOnClick = (apiFunction) => {
    const [sendBack, setSendBack] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLaoding] = useState(false);

    const fetchData = useCallback(async (data)=>{
        setLaoding(false);
        setError(null);
        try {
            const result = await apiFunction(data);
            setSendBack(result);
        } catch (error) {
            setError(error);
        } finally {
            setLaoding(false);
        }
    }, [sendBack]);

    return {sendBack, error, loading, fetchData};
}
export default useFetchOnClick;