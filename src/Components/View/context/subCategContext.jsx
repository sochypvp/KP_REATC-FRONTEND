import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const SubCategContext = createContext();
const GetSubByMainCategContext= createContext();

export function UseSubCateg(){
    return useContext(SubCategContext);
}
export function UseSubCategByMainCateg(){
    return useContext(GetSubByMainCategContext);
}

export function SubCategProvider({children}){

    const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

    const [subCateg, setSubCateg] = useState(null);
    const [loading, setLaoding] = useState(true);
    const [error, setError] = useState(null);
    const [requestCompleted, setRequestCompleted] = useState(0);

    useEffect(()=>{
        const fetchData = async ()=>{
            try {    
                const response1 = await axios.get(`${BASE_API_URL}subCategories/getAll`);
                setSubCateg(response1.data.data);
                setRequestCompleted(2);
            } 
            catch (error) {
                if(error.response && error.response.status === 429){
                    await new Promise(resolve => setTimeout(resolve, 1000));
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


    const fetchSubCategByMainCateg = async (mainCategId)=>{
        try {
            const response = await axios.get(`${BASE_API_URL}subCategories/getSubByMain/?mainCategId=${mainCategId}`);
            setSubCateg(response.data.data);

            setRequestCompleted(2);
        } catch (error) {
            setError();
        }
        finally{
            if(requestCompleted === 2){
                setLaoding(false);
            }
        }
    }

    const data = {
        subCateg: subCateg,
        loading: loading,
        error: error,
    }
    return (
        <SubCategContext.Provider value={data}> 
            <GetSubByMainCategContext.Provider value={fetchSubCategByMainCateg}>
                {children}
            </GetSubByMainCategContext.Provider>
        </SubCategContext.Provider>
    )
}

SubCategProvider.propTypes = {
    children: PropTypes.node.isRequired
}