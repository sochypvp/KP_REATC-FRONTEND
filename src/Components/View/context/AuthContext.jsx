import { createContext, useCallback, useContext, useState } from "react";
import PropTypes from "prop-types";
import { apiLogin, apiRegister } from "../../API/api";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLaoding] = useState(false);
    const [error, setError] = useState(null);

    const login = useCallback(async (credentials)=>{
        setLaoding(false);
        setError(null);
        try {
            const result = await apiLogin(credentials);
            setUser(result.user);
            // localStorage.setItem('token', result.token);
            if(result.status){
                localStorage.setItem('userId', result.user.id);
                return result.status;
            }
            
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
        } finally {
            setLaoding(false);
        }
    }, []);

    const register = useCallback(async (userDetails)=>{
        setLaoding(false);
        setError(null);
        try {
            const data = await apiRegister(userDetails);
            console.log(data);
            if(data.status){
                return true;
            }
            setError(data.message);
            return false;
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
            return false;
        }
    }, []);

    const logout = useCallback(async () => {
        setLaoding(true);
        try {
            await logout();
        } catch (err) {
            setError(error);
        } finally {
            localStorage.removeItem('userId');
            setUser(null);
            setLaoding(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading, error }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export const useAuth = ()=>{
    return useContext(AuthContext);
}