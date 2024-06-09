import { useEffect, useState } from "react";
import ListBox from "../SubViews/BoxAndLIst/ListBox";
import { useUser } from "../context/userContext";
import CheckOut from "./CheckOut";
import useFetchOnClick from "../../API/useFetchOnClick";
import { apiOrderProduct } from "../../API/api";
import { Link } from "react-router-dom";
import axios from "axios";
import MessageBox from "../SubViews/BoxAndLIst/AlertBox";
import ConfirmBox from "../SubViews/BoxAndLIst/ConfirmBox";

const ShoppingCart = () => {

  const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(null);

  const handleCloseMessage = (response) => {
    setShowMessage(response.status);
    setMessage(response.message);
  }

  const { userCart, addFavorite, error, loading } = useUser();
  const [orderItems, setOrderItems] = useState(null);
  let data = userCart;
  console.log(orderItems);

  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    if (userCart)
      setOrderItems(userCart.products);
  }, [userCart]);

  useEffect(() => {
    let newTotal = 0;
    orderItems && orderItems.forEach((item) => {
      newTotal += parseInt(item.price);
    });
    setSubTotal(newTotal);
  }, [orderItems]);



  const handleCheckItems = (event, data) => {
    if (event.target.checked) {
      setOrderItems([...orderItems, data]);
    } else {
      handleIsChecked(event);
      setOrderItems(orderItems.filter(item => item != data));
    }
  }

  const handleQtyChange = (newData) => {
    setSubTotal(subTotal + parseInt(newData));
  }
  // const handleQtyChangeBack = (newData) => {
  //   setSubTotal(subTotal - parseInt(newData));
  // }

  const handleAddFav = async (data) => {
    const response = await addFavorite(data);
    if(response){
      setMessage({status: response, message: 'Remove successfully'});
    }
  }

  // Check out 
  const [checkoutEvent, setCheckoutEvnet] = useState(false);


  const hanldeCheckout = (e) => {
    e.preventDefault();
    setCheckoutEvnet(true);
  }

  const handleUnCheckout = (e) => {
    e.preventDefault();
    setCheckoutEvnet(false);
  }

  const [isChecked, setIsCheked] = useState(true);

  const handleIsChecked = (evnet) => {
    setIsCheked(evnet.target.checked);
    if (evnet.target.checked) {
      setOrderItems(userCart.products.filter(item => item != orderItems));
    }

  }

  const productOrdering = useFetchOnClick(apiOrderProduct);

  //======= Order =====================================================
  const [alertConfirm, setAlertConfirm] = useState(false);
  const closeConfirmBox = (e) => {
    e.preventDefault();
    setAlertConfirm(false);
  }
  const [location, setLocation] = useState('');

  const orderProductRequest = async (items) => {
    try {
      // await axios.get(`${BASE_API_URL}/user/orderProduct`, items);
      const response = await axios.post(`${BASE_API_URL}user/orderProduct`, items);
      if (response.data.status) return true;
      return false;
    } catch (err) {
      return err;
    }
  }
  const orderProduct = async (e) => {
    e.preventDefault();
    if (orderItems != null || orderItems != []) {
      const data = {
        cusData: {
          customerId: localStorage.getItem('userId'),
          verify: 0,
          pay: 0,
          deliveryAddress: location,
        },
        orderItems: {}
      };
      data.orderItems = orderItems.map((items) => {
        let qty = 1;
        if (items.qty) qty = items.qty;
        const newData = {
          productId: items.id,
          QTY: qty
        }
        return newData;
      });
      const check = await orderProductRequest(data);
      if (check) {
        alert("success");
        setAlertConfirm(false);
      } else {
        alert(check);
      }

    }
  }

  return (
    <div className="w-full relative pt-5 bg-white text-slate-950">
      {alertConfirm && (
            <ConfirmBox close={closeConfirmBox} action={orderProduct}/>
          )}
      {showMessage && (
        <>
          <MessageBox
            message={message}
            onClose={() => handleCloseMessage(false)}
            duration={3000} // Duration in milliseconds (3 seconds in this example)
          />
          {showMessage}
        </>
      )}
      <div className="max-sm:w-11/12 w-10/12 m-auto px-4 sm:px-2 md:px-2 lg:px-4 xl:px-0 pt-5">
        <div className="flex">
          <article className="w-[70%] py-2 pr-2">
            <div className="flex items-center justify-between pb-10 pr-4">
              <p className="text-black font-extrabold text-xl">Shopping cart</p>
            </div>
            {
              checkoutEvent && (
                <CheckOut product={orderItems} error={error} loading={loading} deliveryAddress={setLocation}/>
              )
            }
            {
              !checkoutEvent && (
                <div className="form-check">
                  <input onChange={handleIsChecked} checked={isChecked} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label className="form-check-label">
                    Select all
                  </label>
                </div>
              )
            }

            <div className={`flex-wrap justify-start ${checkoutEvent ? "hidden" : "flex"}`}>
              {
                error ? (<>{error}</>) : (
                  loading ? (<>Loading...</>) : (
                    userCart && orderItems && (
                      data.products.map((favData, index) => {
                        var shortName = "";
                        if (favData.productName.length > 60) {
                          shortName =
                            favData.productName.substring(0, 60).toUpperCase() + "...";
                        } else {
                          shortName = favData.productName;
                        }
                        return (
                          <ListBox
                            key={index}
                            id={favData.id}
                            profile={favData.header_img}
                            name={shortName}
                            price={favData.price}
                            brand={favData.brand}
                            barcode={favData.barcode}
                            addQty={handleQtyChange}
                            handleAddFav={handleAddFav}
                            cartId={favData.cartId}
                            selectItem={isChecked}
                            favData={favData}
                            setIsChekedd={setIsCheked}
                            handleCheckItems={handleCheckItems}
                            orderItems={orderItems}
                            handleCloseMessage={handleCloseMessage}
                          />
                        );
                      })
                    )
                  )
                )
              }
            </div>
          </article>
          <article className="w-[30%] py-2 pr-2 text-sm text-black ">
            <p className="text-black font-extrabold text-lg pb-10 ">
              ORDER SUMMARY
            </p>
            <div className="flex justify-between py-2 border-b mt-5">
              <h1>Sub Total</h1>
              <h1>${subTotal ? subTotal : 0}</h1>
            </div>
            <div className="flex justify-between py-2 border-b mt-5">
              <h1>Discount</h1>
              <h1>$0.0</h1>
            </div>
            <div className="flex justify-between py-2 border-b mt-5">
              <h1 className="font-bold text-lg">Total</h1>
              <h1 className="font-bold text-lg">${subTotal ? subTotal : 0}</h1>
            </div>
            {
              checkoutEvent ? (
                <div className="flex justify-between py-2 ">
                  <button onClick={handleUnCheckout} className="w-1/2 mr-2 h-14 hover:bg-gray-100 border border-slate-500 font-bold ">
                    Back to cart
                  </button>
                  <button onClick={()=>setAlertConfirm(true)} className="flex justify-center items-center w-1/2 ml-2 h-14 bg-green-600 hover:bg-opacity-80 font-bold text-white ">
                    {
                      productOrdering.loading ? (
                        <>Loading...</>
                      ) : (
                        productOrdering.error ? (
                          <>{productOrdering.error}</>
                        ) : (
                          "Order"
                        )
                      )
                    }
                  </button>
                </div>
              ) : (
                <div className="flex justify-between py-2 ">
                  <Link to={"/products"} className="w-1/2 flex items-center justify-center mr-2 h-14 hover:bg-gray-100 border border-slate-500 font-bold ">
                    Continue Shopping
                  </Link>
                  <button disabled={subTotal === 0} onClick={hanldeCheckout} className="flex btn justify-center items-center w-1/2 ml-2 h-14 bg-blue-700 hover:bg-opacity-80 font-bold text-white ">
                    Checkout
                  </button>
                </div>
              )
            }


          </article>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
