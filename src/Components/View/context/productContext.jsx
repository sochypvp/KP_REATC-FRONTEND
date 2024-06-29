import axios from "axios";
import PropTypes from "prop-types";
import { useState, useEffect, createContext, useContext } from "react";

const ProductContext = createContext({
    product: null,
    setProduct: () => { },
    productPagination: null,
    setProductPagination: () => { },
    loading: true,
    error: null,
    requestCompleted: 0,
    refreshProduct: () => { },
    showProductByPage: (page) => { },
    showProductBySubCateg: (subCategId) => { },
    showProductByMainCateg: (mainCategId) => { },
    showProductByBrand: (brandId) => { },
    showProductByHigh: () => { },
    showProductByLow: () => { },
    showSimilarProduct: (categoryName) => {}
});

export function useProduct() {
    return useContext(ProductContext);
}

export function useProductPagination() {
    return useContext(ProductContext); // You could use a different context if you separate pagination
}

export function ProductProvider({ children }) {
    const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

    const [product, setProduct] = useState(null);
    const [productPagination, setProductPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [requestCompleted, setRequestCompleted] = useState(0);
    const [byCateg, setByCateg] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}products/get`);
                setProduct(response.data.data);
                setProductPagination(response.data.links);
                setRequestCompleted(2);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        if (requestCompleted !== 2) {
            fetchData();
        }
    }, [requestCompleted]);

    const refreshProduct = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_API_URL}products/get`);
            setProduct(response.data.data);
            setProductPagination(response.data.links);
            setRequestCompleted(2);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const showProductByPage = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get(page);
            setProduct(response.data.data);
            if (byCateg !== 0) {
                const newLinks = response.data.links.map((link) => ({
                    ...link,
                    url: `${link.url}&subCategId=${byCateg}`
                }));
                setProductPagination(newLinks);
            } else {
                setProductPagination(response.data.links);
            }
            setRequestCompleted(2);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const showProductBySubCateg = async (subCategId) => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_API_URL}products/getBySubCategory?subCategId=${subCategId}`);
            setProduct(response.data.data);
            const newLinks = response.data.links.map((link) => ({
                ...link,
                url: `${link.url}&subCategId=${subCategId}`
            }));
            setByCateg(subCategId);
            setProductPagination(newLinks);
            setRequestCompleted(2);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const showProductByMainCateg = async (mainCategId) => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_API_URL}products/getByMainCategory?mainCategId=${mainCategId}`);
            setProduct(response.data.data);
            setRequestCompleted(2);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const showProductByBrand = async (brandId) => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_API_URL}products/getByBrand?brandId=${brandId}`);
            setProduct(response.data.data);
            setRequestCompleted(2);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const showSimilarProduct = async (categoryName) => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_API_URL}products/selectSimilarProduct?categoryName=${categoryName}`);
            setRequestCompleted(2);
            return(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const showProductByHigh = () => {
        setProduct((prevProducts) => [...prevProducts].sort((a, b) => b.price - a.price));
    };

    const showProductByLow = () => {
        setProduct((prevProducts) => [...prevProducts].sort((a, b) => a.price - b.price));
    };

    return (
        <ProductContext.Provider
            value={{
                product,
                setProduct,
                productPagination,
                setProductPagination,
                loading,
                error,
                requestCompleted,
                refreshProduct,
                showProductByPage,
                showProductBySubCateg,
                showProductByMainCateg,
                showProductByBrand,
                showProductByHigh,
                showProductByLow,
                showSimilarProduct
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

ProductProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
