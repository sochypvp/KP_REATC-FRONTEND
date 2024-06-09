import { useEffect, useState } from "react";
import CheckOut from "./CheckOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import ConfirmBox from "../SubViews/BoxAndLIst/ConfirmBox";

const Buying = () => {

  const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLaoding] = useState(false);
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}products/getOneProduct/${id}`);
        setProduct(response.data.data);
        setLaoding(false);
        console.log(product);
      } catch (error) {
        setError(error);
        setLaoding(false);
      }
    }
    fetchData();
  }, []);

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  // == Ordering ===================================
  const [alertConfirm, setAlertConfirm] = useState(false);
  const closeConfirmBox = (e) => {
    e.preventDefault();
    setAlertConfirm(false);
  }
  const [location, setLocation] = useState('');

  const orderProductRequest = async (items) => {
    try {
      // await axios.get(`${BASE_API_URL}/user/orderProduct`, items);
      const response = await axios.post(`${BASE_API_URL}user/buyProduct`, items);
      return response.data;
    } catch (err) {
      return err;
    }
  }
  const orderProduct = async (e) => {
    e.preventDefault();
    if (product != null || product != []) {
      const data = {
        cusData: {
          customerId: localStorage.getItem('userId'),
          verify: 0,
          pay: 0,
          deliveryAddress: location,
        },
        orderItems: {}
      };
      data.orderItems = {
        productId: product.id,
        QTY: 1
      }
      setAlertConfirm(true);
      console.log(data);
      const check = await orderProductRequest(data);
      if (check.status) {
        alert("success");
        setAlertConfirm(false);
      } else {
        alert(check.message);
      }
    }
  }

  if (error) return <>{error}</>;
  if (loading) return <>Loading...</>;
  if (!product) return <>No product found</>;
  return (
    <div className="w-full bg-white text-slate-950 pt-[90px]">
      <div className="max-sm:w-11/12 w-10/12 m-auto px-4 sm:px-2 md:px-2 lg:px-4 xl:px-0">
        <div className="flex max-sm:flex-col border-b">
          {alertConfirm && (
            <ConfirmBox close={closeConfirmBox} action={orderProduct}/>
          )}
          <CheckOut deliveryAddress={setLocation} />
          <article className="w-1/3 max-lg:w-1/2 max-sm:w-full  py-2 pr-2 text-sm text-black ">
            <p className="text-black font-semibold text-base uppercase">
              ORDER SUMMARY
            </p>
            {/* <div className="w-full h-56 rounded-md bg-gray-600 "></div> */}
            <div className="flex flex-col w-full justify-center text-sm font-medium mt-6 ">
              <h1>Quantity</h1>
              <div className="flex items-center justify-between w-100 border py-3 px-1 mt-1">
                <button
                  className="px-3 text-gray-700 font-semibold"
                  onClick={handleDecrement}
                >
                  <MinusIcon className="size-4" />
                </button>
                <span>{quantity}</span>
                <button
                  className="px-3 font-semibold"
                  onClick={handleIncrement}
                >
                  <PlusIcon className="size-4 " />
                </button>
              </div>
            </div>
            <div className="flex justify-between py-2 border-b mt-3">
              <h1>Sub Total</h1>
              <h1>${product.price}</h1>
            </div>
            <div className="flex justify-between py-2 border-b mt-5">
              <h1>Discount</h1>
              <h1>{product.discount}%</h1>
            </div>
            <div className="flex justify-between py-2 border-b mt-5">
              <h1 className="font-bold text-lg">Total</h1>
              <h1 className="font-bold text-lg">
                {
                  product.discount && product.discount != 0 ? (
                    <h1 className=" flex text-lg bottom-0 left-0 font-bold ">${(product.price) - (product.price / 100 * product.discount)}<h1 className="ml-1 text-sm lg:text-base line-through font-semibold text-red-500">${product.price}</h1></h1>
                    // <h1 className="bg-red-500 w-[60px] d-flex justify-center text-white p-1">{discount}%</h1>
                  ) : (
                    <h1 className=" text-lg bottom-0 left-0 font-bold">${product.price}</h1>
                  )
                }
              </h1>
            </div>
            <div className="flex justify-between py-2 ">
              <button onClick={()=>setAlertConfirm(true)} className="flex bg-gradient-to-r hover:bg-gray-100 shadow-sm rounded border  text-gray-800 py-3 w-100 mt-2 text-nowrap items-center justify-center">
                <h1 className="text-sm font-bold">Buy</h1>
              </button>
            </div>
          </article>
        </div>
        <div className="w-full flex items-center justify-between mb-2 mt-3">
          <p className="text-black font-semibold text-sm ">Product</p>
        </div>
        <div className="w-full max-lg:w-full">
          <div className="w-full flex flex-wrap justify-items-start">

            <article className="relative w-1/5 max-lg:w-1/3 max-sm:w-2/4 pb text-sm max-sm:text-xs mb-10 pr-3 overflow-hidden">
              <img
                src={product.header_img}
                alt=""
                className="w-full m-auto object-cover object-center"
              />
              <h1 className="mt-4 text-black line-clamp-2">
                {product.productName}
              </h1>
              <h1 className="mt-1 mb-4 text-slate-600">{product.brand}</h1>
              <h1 className="absolute bottom-0 left-0 font-bold">
                ${product.price}
              </h1>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buying;
