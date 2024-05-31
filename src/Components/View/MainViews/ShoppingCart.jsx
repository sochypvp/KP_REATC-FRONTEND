import { useEffect, useState } from "react";
import ListBox from "../SubViews/BoxAndLIst/ListBox";
import { useUser } from "../context/userContext";
import CheckOut from "./CheckOut";

const ShoppingCart = () => {

  const { userCart, addFavorite, error, loading } = useUser();

  var defaultTotal = null;
  const [subTotal, setSubTotal] = useState(null);

  useEffect(() => {
    setSubTotal(defaultTotal);
  }, [defaultTotal]);

  const handleQtyChange = (newData) => {
    setSubTotal(subTotal + parseInt(newData));
  }
  // const handleQtyChangeBack = (newData) => {
  //   setSubTotal(subTotal - parseInt(newData));
  // }

  const handleAddFav = async (data) => {
    await addFavorite(data);
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

  const handleIsChecked = (evnet)=>{
    setIsCheked(evnet.target.checked);
    setSubTotal(defaultTotal);
  }

  return (
    <div className="w-full pt-5 bg-white text-slate-950">
      <div className="max-sm:w-11/12 w-10/12 m-auto px-4 sm:px-2 md:px-2 lg:px-4 xl:px-0 pt-5">
        <div className="flex">
          <article className="w-[70%] py-2 pr-2">
            <div className="flex items-center justify-between pb-10 pr-4">
              <p className="text-black font-extrabold text-xl">Shopping cart</p>
            </div>
            {
              checkoutEvent && (
                <CheckOut product={userCart} error={error} loading={loading} />
              )
            }
            <div className="form-check">
              <input onChange={handleIsChecked} checked={isChecked} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              <label className="form-check-label">
                Select all
              </label>
            </div>
            <div className={`flex-wrap justify-start ${checkoutEvent ? "hidden" : "flex"}`}>
              {
                error ? (<>{error}</>) : (
                  loading ? (<>Loading...</>) : (
                    userCart && (
                      userCart.products.map((favData) => {
                        defaultTotal += parseInt(favData.price);
                        var shortName = "";
                        if (favData.productName.length > 60) {
                          shortName =
                            favData.productName.substring(0, 60).toUpperCase() + "...";
                        } else {
                          shortName = favData.productName;
                        }
                        return (
                          <ListBox
                            key={favData.id}
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
                            setIsChekedd={setIsCheked}
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
              <h1>${subTotal ? subTotal : defaultTotal}</h1>
            </div>
            <div className="flex justify-between py-2 border-b mt-5">
              <h1>Discount</h1>
              <h1>$0.0</h1>
            </div>
            <div className="flex justify-between py-2 border-b mt-5">
              <h1 className="font-bold text-lg">Total</h1>
              <h1 className="font-bold text-lg">${subTotal ? subTotal : defaultTotal}</h1>
            </div>
            {
              checkoutEvent ? (
                <div className="flex justify-between py-2 ">
                  <button onClick={handleUnCheckout} className="w-1/2 mr-2 h-14 hover:bg-gray-100 border border-slate-500 font-bold ">
                    Back to cart
                  </button>
                  <button className="flex justify-center items-center w-1/2 ml-2 h-14 bg-black hover:bg-opacity-80 font-bold text-white ">
                    Order
                  </button>
                </div>
              ) : (
                <div className="flex justify-between py-2 ">
                  <button className="w-1/2 mr-2 h-14 hover:bg-gray-100 border border-slate-500 font-bold ">
                    Continue Shopping
                  </button>
                  <button onClick={hanldeCheckout} className="flex justify-center items-center w-1/2 ml-2 h-14 bg-black hover:bg-opacity-80 font-bold text-white ">
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
