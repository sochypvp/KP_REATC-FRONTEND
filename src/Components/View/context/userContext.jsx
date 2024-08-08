import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}


export function UserProvider({ children }) {

    const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

    const [user, setUser] = useState(null);
    const [userFav, setUserFav] = useState(null);
    const [userCart, setUserCart] = useState(null);
    const [userFavPdtId, setUserFavPdtId] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLaoding] = useState(true);
    const [requestCompleted, setRequestCompleted] = useState(0);

    useEffect(() => {
        const fetchData = async (userId) => {
            try {
                const response1 = await axios.get(`${BASE_API_URL}user/getFav?userId=${userId}`);
                setUserFav(response1.data);
                const favPdtId = response1.data.products.map((items)=>{
                    return items.id;
                });
                setUserFavPdtId(favPdtId);

                const response2 = await axios.get(`${BASE_API_URL}user/getCart?userId=${userId}`);
                setUserCart(response2.data);

                const response3 = await axios.get(`${BASE_API_URL}user/getUserData?userId=${userId}`);
                setUser(response3.data.data);

                setRequestCompleted(1);
                setLaoding(false);
            } catch (err) {
                if (err.response && err.response.status == 429) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } else {
                    setError(err);
                    setLaoding(false);
                }
            } finally {
                if (requestCompleted === 1) {
                    setLaoding(false);
                }
            }
        }

        if (localStorage.getItem('userId') != null) {
            const userId = localStorage.getItem('userId');
            if (requestCompleted !== 1) {
                fetchData(userId);
                console.log("JUII");
            }
        }

    }, [requestCompleted]);


    const addFavorite = async (data) => {
        try {
            const response = await axios.post(`${BASE_API_URL}user/addFav`, data);
            setRequestCompleted(0);
            return response.data.status;
        } catch (err) {
            if (err.response && err.response.status == 429) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            } else {
                setError(err);
                setLaoding(false);
            }
        } finally {
            if (requestCompleted === 1) {
                setLaoding(false);
            }
        }
    }
    const removeFavorite = async (favId) => {
        try {
            const response = await axios.get(`${BASE_API_URL}user/removeFav?favId=${favId}`);
            setRequestCompleted(0);
            return response.data.status;
        } catch (err) {
            if (err.response && err.response.status == 429) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            } else {
                setError(err);
                setLaoding(false);
                return false;
            }
        } finally {
            if (requestCompleted === 1) {
                setLaoding(false);
            }
        }
    }

    const addToCart = async (data) => {
        try {
            const response = await axios.post(`${BASE_API_URL}user/addCart`, data);
            setRequestCompleted(0);
            return response.data.status;
        } catch (err) {
            if (err.response && err.response.status == 429) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            } else {
                setError(err);
                setLaoding(false);
            }
        } finally {
            if (requestCompleted === 1) {
                setLaoding(false);
            }
        }
    }

    const removeCart = async (cartId) => {
        try {
            await axios.get(`${BASE_API_URL}user/removeCart?cartId=${cartId}`);
            setRequestCompleted(0);
        } catch (err) {
            if (err.response && err.response.status == 429) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            } else {
                setError(err);
                setLaoding(false);
            }
        } finally {
            if (requestCompleted === 1) {
                setLaoding(false);
            }
        }
    }

    const updateUserData = async (userData) => {
        try {
            const id = localStorage.getItem('userId');
            userData.userId = id;
            const response = await axios.post(`${BASE_API_URL}user/updateUserData`, userData);
            setUser(response.data);
            setRequestCompleted(3);
            return true;
        } catch (err) {
            if (err.response && err.response.status === 429) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            else {
                setError(err);
                setLaoding(false);
            }
        } finally {
            if (requestCompleted === 3) {
                setLaoding(false);
            }
        }
    }

    const updateUserPassword = async (userPassword)=>{
        try {
            const id = localStorage.getItem('userId');
            userPassword.userId = id;

            const response = await axios.post(`${BASE_API_URL}customer/changePassword`, userPassword);
            setUser(response.data);
            setRequestCompleted(1);
            return({
                message: response.data.message,
                status: response.data.status,
            })
        } catch (err) {
            if(err.response && err.response.status === 429) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            else{
                setError(err);
                setLaoding(false);
            }
        } finally {
            if(requestCompleted === 1){
                setLaoding(false);
            }
        }
    }

    const addDeliveryAddress = async (address)=>{
        try {
            const id = localStorage.getItem('userId');
            address.customerId = id;
            console.log(address);
            const response = await axios.post(`${BASE_API_URL}user/addDeliveryAddress`, address);
            setRequestCompleted(2);
            return({
                message: response.data.message,
                status: response.data.status,
            })
        } catch (err) {
            if(err.response && err.response.status === 429) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            else{
                setError(err);
                setLaoding(false);
            }
        } finally {
            if(requestCompleted === 1){
                setLaoding(false);
            }
        }
    }
    const updateDeliveryAddress = async (address)=>{
        try {
            const id = localStorage.getItem('userId');
            address.customerId = id;
            const response = await axios.post(`${BASE_API_URL}user/updateDeliveryAddress`, address);
            setRequestCompleted(2);
            return({
                message: response.data.message,
                status: response.data.status,
            })
        } catch (err) {
            if(err.response && err.response.status === 429) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            else{
                setError(err);
                setLaoding(false);
            }
        } finally {
            if(requestCompleted === 1){
                setLaoding(false);
            }
        }
    }
    const deleteDeliveryAddress = async (id)=>{
        try {
            const response = await axios.get(`${BASE_API_URL}user/deleteDeliveryAddress?id=${id}`,);
            setRequestCompleted(2);
            return({
                message: response.data.message,
                status: response.data.status,
            })
        } catch (err) {
            if(err.response && err.response.status === 429) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            else{
                setError(err);
                setLaoding(false);
            }
        } finally {
            if(requestCompleted === 1){
                setLaoding(false);
            }
        }
    }

    return (
        <UserContext.Provider value={{ userFavPdtId, user, userFav, userCart, error, loading, addFavorite, addToCart, setRequestCompleted, removeFavorite, removeCart, updateUserData, updateUserPassword, addDeliveryAddress, updateDeliveryAddress, deleteDeliveryAddress }}>
            {children}
        </UserContext.Provider>
    )
}


UserProvider.propTypes = {
    children: PropTypes.node.isRequired
}