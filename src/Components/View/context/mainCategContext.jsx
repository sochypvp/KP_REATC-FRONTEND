import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const MainCategContext = createContext();

export function UseMainCateg(){
    return useContext(MainCategContext);
}

export function MainCategProvider({children}){

    const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

    const [mainCateg, setMainCateg] = useState(null);
    const [loading, setLaoding] = useState(true);
    const [error, setError] = useState(null);
    const [requestCompleted, setRequestCompleted] = useState(0);

    useEffect(()=>{
        const fetchData = async ()=>{
            try {    
                const response1 = await axios.get(`${BASE_API_URL}mainCategories/getAll`);
                setMainCateg(response1.data.data);
                setRequestCompleted(2);
            } 
            catch (error) {
                if (error.response && error.response.status === 429) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                } else {
                    setError(error);
                    setLaoding(false);
                }
            }
            finally{
                if(requestCompleted === 2){
                    setLaoding(false);
                }
            }
        }
        fetchData();
    },[requestCompleted]);

    const data = {
        mainCateg: mainCateg,
        loading: loading,
        error: error,
    }

    return (
        <MainCategContext.Provider value={data}> 
            {children}
        </MainCategContext.Provider>
    )
}

MainCategProvider.propTypes = {
    children: PropTypes.node.isRequired
}
