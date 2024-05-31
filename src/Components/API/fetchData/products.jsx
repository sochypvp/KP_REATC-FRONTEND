import api from "../api";

export const getProduct = async ()=>{
    const response = await api.get('/products/get');
    return response.data;
};

export const getProductBySubCateg = async (subCategId)=>{
    const response = await api.get(`/products/getBySubCategory?subCategId=${subCategId}`);
    return response.data;
}