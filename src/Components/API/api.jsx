import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const api = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(response => response,
    async error => {
        const {config, response: {status}} = error;
        const originalRequest = config;

        if (status === 429) {
            const retryAfter = error.response.headers['retry-after'] || 1000;
            await new Promise(resolve => setTimeout(resolve, retryAfter));
            return api(originalRequest);
        }

        return Promise.reject(error);
    }
);

export const login = async (credentials)=>{
    const response = await api.post("/auth/login", credentials);
    return response.data;
}
export const apiLogin = async (credentials)=>{
    const response = await api.post("/auth/login", credentials);
    return response.data;
}

export const apiRegister = async (userDetals) => {
    const response = await api.post("/customer/add", userDetals);
    return response.data;
}

export const logout = async ()=>{
    await api.post("/auth/logout");
}

export default api; 
