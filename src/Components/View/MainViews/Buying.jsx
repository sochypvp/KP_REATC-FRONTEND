import { useEffect, useState } from "react";
import CheckOut from "./CheckOut";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import ConfirmBox from "../SubViews/BoxAndLIst/ConfirmBox";
import BoxForHome from "../SubViews/BoxAndLIst/BoxForHome";
import Box from "../SubViews/BoxAndLIst/Box";

const Buying = () => {

  const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLaoding] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [subTotal, setSubTotal] = useState(null);
  const [realPrice, setRealPrice] = useState();

  const [showMessage, setShowMessage] = useState(false);

  const handleCloseMessage = () => {
    setShowMessage(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}products/getOneProduct/${id}`);
        setProduct(response.data.data);
        if (response) setRealPrice(response.data.data.price - response.data.data.discount)
        setLaoding(false);
        console.log(product);
      } catch (error) {
        setError(error);
        setLaoding(false);
      }
    }
    fetchData();
  }, []);

  console.log(realPrice);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    if (product) {
      let newQty = quantity + 1;
      setRealPrice((product.price - product.discount) * newQty);
      setSubTotal(product.price * newQty);
    }

  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      if (product) {
        let newQty = quantity - 1;
        setRealPrice((product.price - product.discount) * newQty);
        setSubTotal(product.price * newQty);
      }
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
          totalItems: quantity,
          totalProducts: 1,
          totalPayment: realPrice,
          deliveryAddress: location,
        },
        orderItems: {}
      };
      data.orderItems = {
        productId: product.id,
        QTY: quantity,
        totalPrice: realPrice,
      }
      setAlertConfirm(true);
      console.log(data);
      const check = await orderProductRequest(data);
      if (check.status) {
        // setShowMessage(true);
        setAlertConfirm(false);
        window.alert("successfully");
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

      {/* =========== */}
      {
        showMessage && (
          <SuccessAlert
            message="Add successfully"
            onClose={handleCloseMessage}
            duration={3000}
          />
        )
      }

      {/* =========== */}
      <div className="max-sm:w-11/12 w-10/12 m-auto px-4 sm:px-2 md:px-2 lg:px-4 xl:px-0">
        <div className="flex max-sm:flex-col border-b">
          {alertConfirm && (
            <ConfirmBox close={closeConfirmBox} action={orderProduct} />
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
            <div className="flex justify-between py-1 border-b mt-4">
              <h1>Sub Total</h1>
              <h1>${subTotal ? subTotal : product.price}</h1>
            </div>
            <div className="flex justify-between py-1 border-b mt-4">
              <h1>Discount</h1>
              <h1>${product.discount}</h1>
            </div>
            <div className="flex justify-between py-1 border-b mt-4">
              <h1>Total Discount</h1>
              <h1>${product.discount * quantity}</h1>
            </div>
            <div className="flex justify-between py-1 border-b mt-5">
              <h1 className="font-bold text-lg">Total</h1>
              <h1 className="font-bold text-lg">
                {
                  product.discount && product.discount != 0 ? (
                    <h1 className=" flex text-lg bottom-0 left-0 font-bold ">${realPrice}<h1 className="ml-1 text-sm lg:text-base line-through font-semibold text-red-500">${product.price * quantity}</h1></h1>
                    // <h1 className="bg-red-500 w-[60px] d-flex justify-center text-white p-1">{discount}%</h1>
                  ) : (
                    <h1 className=" text-lg bottom-0 left-0 font-bold">${realPrice}</h1>
                  )
                }
              </h1>
            </div>
            <div className="flex justify-between py-2 ">
              <button onClick={() => setAlertConfirm(true)} className="flex bg-gradient-to-r hover:bg-gray-100 shadow-sm rounded border  text-gray-800 py-3 w-100 mt-2 text-nowrap items-center justify-center">
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
            <Box
              key={product.id}
              id={product.id}
              profile={product.header_img}
              name={product.productName}
              price={product.price}
              brand={product.get_brand}
              barcode={product.barcode}
              discount={product.discount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SuccessAlert = ({ message, onClose, duration }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose(); // Optionally, you can call a callback function onClose when the message box closes automatically
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <>
      {isVisible && (
        <div id="alert-additional-content-3" style={{ transition: '1s' }} class="p-4 mb-4 left-[20%] right-[20%] fixed z-50 text-green-800 border border-green-300 rounded-lg bg-white shadow dark:bg-white-800 dark:text-green-700 dark:border-green-800" role="alert">
          <div class="flex items-center">
            <svg class="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <h3 class="text-lg font-medium">Product order success</h3>
          </div>
          <div class="mt-2 mb-4 text-sm">
            You order successfully ! now you can track your order
          </div>
          <div class="flex">
            <Link to={"/my_account/trackOrder"} type="button" class="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              <svg class="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              </svg>
              View order
            </Link>
            <button type="button" class="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800" data-dismiss-target="#alert-additional-content-3" aria-label="Close">
              Dismiss
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Buying;
