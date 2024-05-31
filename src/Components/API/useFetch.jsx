import { useCallback, useEffect, useState } from "react"

const useFetch = (apiFunction) => {
    const [data, setData] = useState(null);
    const [error,setError] = useState(null);
    const [loading, setLaoding] = useState(false);

    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const result = await apiFunction();
                setData(result);
            } catch (error) {
                setError(error);
            }
            finally {
                setLaoding(false);
            }
        }
        fetchData();
    },[apiFunction]);
    
    return {data, error, loading};
};

export default useFetch;