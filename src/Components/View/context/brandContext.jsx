import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const BarndContext = createContext();

export function UseBrand(){
    return useContext(BarndContext);
}

export function BrandProvider({children}){

    const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

    const [brand,setBrand] = useState(null);
    const [loading,setLaoding] = useState(true);
    const [error,setError] = useState(null);
    const [requestCompleted, setRequestCompleted] = useState(0);

    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const response = await axios.get(`${BASE_API_URL}brands/getAll`);
                setBrand(response.data.data);
                setRequestCompleted(1);
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                } else {
                    setError(error);
                    setLaoding(false);
                }
            } finally{
                if(requestCompleted === 1){
                    setLaoding(false);
                }
            }
        }
        fetchData();
    },[requestCompleted]);

    const data = {
        brand: brand,
        loading: loading,
        error: error,
    }

    return (
        <BarndContext.Provider value={data}>
            {children}
        </BarndContext.Provider>
    )
}

BrandProvider.propTypes = {
    children: PropTypes.node.isRequired
}