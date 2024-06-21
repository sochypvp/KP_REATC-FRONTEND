import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TrackOrder = createContext({
    trackOrderView: null,
    setTrackorderView: () => {},
    ordersData: null,
    error: null,
    loading: true,
    requestComplete: 0,
    cancelOrder: () => {},
    completeOrder: () => {}
});

export function useTrackOrder() {
    return useContext(TrackOrder);
}
export function TrackOrderProvider({ children }) {

    const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

    const [ordersData, setOrdersData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [requestComplete, setRequesComplete] = useState(0);


    const [trackOrderView, setTrackorderView] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (localStorage.getItem('userId')) {
                    const customerId = localStorage.getItem('userId');
                    const response = await axios.get(`${BASE_API_URL}user/getOrder?customerId=${customerId}`);
                    setOrdersData(response.data.data);
                    setTrackorderView(response.data.data[0] || null);
                    setLoading(false);
                    setRequesComplete(0);
                }
            } catch (error) {
                setError(error);
                setLoading(true);
            }
        }
        fetchData();
    }, [requestComplete]);

    const cancelOrder = async (id) => {
        try {
            const response = await axios.get(`${BASE_API_URL}user/cancelOrder?id=${id}`);
            setOrdersData(response.data.data);
            if (response.data.data) {
                setTrackorderView(await response.data.data[0]);
            }
            setLoading(false);
            setRequesComplete(1);
        } catch (error) {
            setError(error);
            setLoading(true);
        }
    }

    const completeOrder = async (id) => {
        try {
            const response = await axios.get(`${BASE_API_URL}user/completeOrder?id=${id}`);
            setOrdersData(response.data.data);
            if (response.data.data) {
                setTrackorderView(response.data.data[0]);
            }
            setLoading(false);
            setRequesComplete(2);
        } catch (error) {
            setError(error);
            setLoading(true);
        }
    }
    return (
        <TrackOrder.Provider value={{ trackOrderView, setTrackorderView, ordersData, error, loading, requestComplete, cancelOrder, completeOrder }}>
            {children}
        </TrackOrder.Provider>
    )
}
// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";

// // Create the context with default values to avoid undefined issues
// const TrackOrderContext = createContext({
//     trackOrderView: null,
//     setTrackorderView: () => {},
//     ordersData: null,
//     error: null,
//     loading: true,
//     requestComplete: 0,
//     cancelOrder: () => {},
//     completeOrder: () => {}
// });

// // Hook to use the context
// export function useTrackOrder() {
//     return useContext(TrackOrderContext);
// }

// // Provider component
// export function TrackOrderProvider({ children }) {
//     const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

//     const [ordersData, setOrdersData] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [requestComplete, setRequestComplete] = useState(0);
//     const [trackOrderView, setTrackorderView] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const customerId = localStorage.getItem('userId');
//                 if (customerId) {
//                     const response = await axios.get(`${BASE_API_URL}user/getOrder?customerId=${customerId}`);
//                     setOrdersData(response.data.data);
//                     setTrackorderView(response.data.data[0] || null); // Avoid setting undefined
//                     setLoading(false);
//                     setRequestComplete(0);
//                 }
//             } catch (error) {
//                 setError(error);
//                 setLoading(false); // Ensure loading is set to false on error
//             }
//         };
//         fetchData();
//     }, [requestComplete]);

//     const cancelOrder = async (id) => {
//         try {
//             const response = await axios.get(`${BASE_API_URL}user/cancelOrder?id=${id}`);
//             setOrdersData(response.data.data);
//             setTrackorderView(response.data.data[0] || null);
//             setLoading(false);
//             setRequestComplete(1);
//         } catch (error) {
//             setError(error);
//             setLoading(false);
//         }
//     };

//     const completeOrder = async (id) => {
//         try {
//             const response = await axios.get(`${BASE_API_URL}user/completeOrder?id=${id}`);
//             setOrdersData(response.data.data);
//             setTrackorderView(response.data.data[0] || null);
//             setLoading(false);
//             setRequestComplete(2);
//         } catch (error) {
//             setError(error);
//             setLoading(false);
//         }
//     };

//     return (
//         <TrackOrderContext.Provider value={{ trackOrderView, setTrackorderView, ordersData, error, loading, requestComplete, cancelOrder, completeOrder }}>
//             {children}
//         </TrackOrderContext.Provider>
//     );
// }
