import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const HomePageContext = createContext();

export function UseHomePageContext(){
    return useContext(HomePageContext);
}

export function HomePageProvider({children}){

    const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

    const [newArrivalProduct, setNewArrivalProduct] = useState(null);
    const [bestDiscountProduct, setBestDiscountProduct] = useState(null);

    const [loading, setLaoding]= useState(true);
    const [error, setError] = useState(null);
    const [requestCompleted, setRequestCompleted] = useState(0);
    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const response1 = await axios.get(`${BASE_API_URL}products/getNewArrival`);
                setNewArrivalProduct(response1.data.data);
                
                const response2 = await axios.get(`${BASE_API_URL}products/getDiscount`);
                setBestDiscountProduct(response2.data.data);
                
                setRequestCompleted(5);
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                } else {
                    setError(error);
                    setLaoding(false);
                }
            }
            finally{
                if(requestCompleted === 5){
                    setLaoding(false);
                }
            }
        }
        fetchData();
    },[requestCompleted]);


    const data = {
        newArrivalProduct: newArrivalProduct,
        bestDiscountProduct: bestDiscountProduct,
        loading: loading,
        error: error,
    }

    return (
        <HomePageContext.Provider value={data}>
            {children}
        </HomePageContext.Provider>
    )
}

HomePageProvider.propTypes = {
    children: PropTypes.node.isRequired
}