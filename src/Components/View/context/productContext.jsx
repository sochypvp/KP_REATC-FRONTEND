// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";
// import PropTypes from "prop-types";

// const ProductContext = createContext({
//     product: null,
//     setProduct: () => { },
//     productPagination: null,
//     setProductPagination: () => { },
//     loading: true,
//     error: null,
//     requestCompleted: 0,
//     refreshProduct: () => { },
//     showProductByPage: (page) => { },
//     showProductBySubCateg: (subCategId) => { },
//     showProductByMainCateg: (mainCategId) => { },
//     showProductByBrand: (brandId) => { },
//     showProductByHigh: () => { },
//     showProductByLow: () => { }
// });

// export function UseProduct() {
//     return useContext(ProductContext);
// }
// export function ProductPagination() {
//     return useContext(ProductContext);
// }

// export function ProductProvider({ children }) {

//     const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

//     const [product, setProduct] = useState(null);
//     const [productPagination, setProductPagination] = useState(null);
//     const [loading, setLaoding] = useState(true);
//     const [error, setError] = useState(null);
//     const [requestCompleted, setRequestCompleted] = useState(0);

//     const [byCateg, setByCateg] = useState(0);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response1 = await axios.get(`${BASE_API_URL}products/get`);
//                 setProduct(response1.data.data);
//                 setProductPagination(response1.data.links || null);
//                 setLaoding(false);
//                 setRequestCompleted(0);
//             } catch (err) {
//                 setError(err);
//                 setLaoding(true);
//             }
//         }
//         fetchData();

//     }, [requestCompleted]);

//     const refreshProduct = async () => {
//         try {
//             const response1 = await axios.get(`${BASE_API_URL}products/get`);
//             setProduct(response1.data.data);
//             setProductPagination(response1.data.links);

//             setRequestCompleted(2);

//         } catch (error) {
//             if (error.response && error.response.status === 429) {
//                 await new Promise(resolve => setTimeout(resolve, 100));
//             } else {
//                 setError(error);
//                 setLaoding(false);
//             }
//         } finally {
//             if (requestCompleted === 2) {
//                 setLaoding(false);
//             }
//         }

//     }

//     const showProductByPage = async (pag) => {
//         try {
//             // const {subCateg} = useParams();
//             const response1 = await axios.get(pag);
//             setProduct(response1.data.data);

//             if (byCateg != 0) {
//                 const newLinks = response1.data.links.map((items) => {
//                     items.url = items.url + `&subCategId=${byCateg}`;
//                     return items;
//                 });
//                 setProductPagination(newLinks);
//             } else {
//                 setProductPagination(response1.data.links);

//             }

//             setRequestCompleted(2);
//         } catch (error) {
//             if (error.response && error.response.status === 429) {
//                 await new Promise(resolve => setTimeout(resolve, 100));
//             } else {
//                 setError(error);
//                 setLaoding(false);
//             }
//         } finally {
//             if (requestCompleted === 2) {
//                 setLaoding(false);
//             }
//         }
//         console.log(byCateg);
//     }

//     const showProductBySubCateg = async (subCategId) => {
//         try {
//             const response = await axios.get(`${BASE_API_URL}products/getBySubCategory?subCategId=${subCategId}`);
//             setProduct(response.data.data);
//             const newLinks = response.data.links.map((items) => {
//                 items.url = items.url + `&subCategId=${subCategId}`;

//                 return items;
//             });
//             setByCateg(subCategId);
//             setProductPagination(newLinks);
//             setRequestCompleted(2);
//             console.log("kkkkkkkk");
//         } catch (error) {
//             if (error.response && error.response.status === 429) {
//                 await new Promise(resolve => setTimeout(resolve, 100));
//             } else {
//                 setError(error);
//                 setLaoding(false);
//             }
//         } finally {
//             if (requestCompleted === 2) {
//                 setLaoding(false);
//             }
//         }
//     }

//     const showProductByMainCateg = async (mainCategId) => {
//         try {
//             const response = await axios.get(`${BASE_API_URL}products/getByMainCategory/?mainCategId=${mainCategId}`);
//             setProduct(response.data.data);
//         } catch (error) {
//             if (error.response && error.response.status === 429) {
//                 await new Promise(resolve => setTimeout(resolve, 100));
//             } else {
//                 setError(error);
//                 setLaoding(false);
//             }
//         }
//         finally {
//             if (requestCompleted === 2) {
//                 setLaoding(false);
//             }
//         }
//     }

//     const showProductByBrand = async (brandId) => {
//         try {
//             const response = await axios.get(`${BASE_API_URL}products/getByBrand/?brandId=${brandId}`);
//             setProduct(response.data.data);
//         } catch (error) {
//             if (error.response && error.response.status === 429) {
//                 await new Promise(resolve => setTimeout(resolve, 100));
//             } else {
//                 setError(error);
//                 setLaoding(false);
//             }
//         }
//         finally {
//             if (requestCompleted === 2) {
//                 setLaoding(false);
//             }
//         }
//     }

//     const showProductByHight = () => {
//         const sortProduct = product.sort((a, b) => b.price - a.price);
//         setProduct(sortProduct);
//     }
//     const showProductByLow = () => {
//         const sortProduct = product.sort((a, b) => a.price - b.price);
//         setProduct(sortProduct);
//     }

//     return (
//         <ProductContext.Provider
//             value={{
//                 product,
//                 setProduct,
//                 productPagination,
//                 setProductPagination,
//                 loading,
//                 error,
//                 requestCompleted,
//                 refreshProduct,
//                 showProductByPage,
//                 showProductBySubCateg,
//                 showProductByMainCateg,
//                 showProductByBrand,
//                 showProductByHight,
//                 showProductByLow
//             }}
//         >
//             {children}
//         </ProductContext.Provider>
//     );
// }

// ProductProvider.propTypes = {
//     children: PropTypes.node.isRequired
// };

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
    showProductByLow: () => { }
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
                showProductByLow
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

ProductProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
