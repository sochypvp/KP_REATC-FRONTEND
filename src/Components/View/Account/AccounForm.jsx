import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Profile from "./Profile";
import Favorite from "./Favorite";
import { useState } from "react";
import ShoppingCart from "../MainViews/ShoppingCart";
import { HomeIcon } from "@heroicons/react/24/outline";
import Delivery from "./Delivery";
import TrackOrder from "./TrackOrder";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { TrackOrderProvider } from "../context/TrackOrderContext";

const AccounForm = () => {

  const location = useLocation();

  const [currentPage, setCurrentPage] = useState("Profile");


  return (
    <div className="w-full pt-5 bg-white text-slate-950">
      <div className="max-sm:w-11/12 w-10/12 m-auto px-4 sm:px-2 md:px-2 lg:px-4 xl:px-0 pt-5 pb-5">
        <div className="flex items-center text-base pb-6">
          <Link to="/">
            <HomeIcon className="size-5 mr-4" />
          </Link>
          <span className="mr-4">/</span>
          <span className="mr-4">{currentPage}</span>
        </div>
        <article className="flex max-md:block mt-4">
          <nav className="text-sm w-1/5 max-md:w-full flex md:flex-col pb-4 overflow-x-auto max-md:border-b">
            <Link to="profile" onClick={() => setCurrentPage("Profile")}>
              <span className={` border-black mr-5 text-nowrap ${location.pathname === "/my_account/profile" && "font-bold"}`}>
                Profile {location.pathname === "/my_account/profile" && <PaperAirplaneIcon className="size-4 float-end mr-10" />}
              </span>
            </Link>
            <Link to="favorite" onClick={() => setCurrentPage("Favorite")}>
              <span className={` border-black mr-5 text-nowrap ${location.pathname === "/my_account/favorite" && "font-bold"}`}>
                Favorite {location.pathname === "/my_account/favorite" && <PaperAirplaneIcon className="size-4 float-end mr-10" />}
              </span>
            </Link>
            <Link to="deliveryLocation" onClick={() => setCurrentPage("DeliveryLocation")}>
              <span className={` border-black mr-5 text-nowrap ${location.pathname === "/my_account/deliveryLocation" && "font-bold"}`}>
                Delivery Address {location.pathname === "/my_account/deliveryLocation" && <PaperAirplaneIcon className="size-4 float-end mr-10" />}
              </span>
            </Link>
            <Link to="trackOrder" onClick={() => setCurrentPage("TrackOrder")}>
              <span className={` border-black mr-5 text-nowrap ${location.pathname === "/my_account/trackOrder" && "font-bold"}`}>
                Track Your Order {location.pathname === "/my_account/trackOrder" && <PaperAirplaneIcon className="size-4 float-end mr-10" />}
              </span>
            </Link>
          </nav>
          <div className="w-4/5 max-md:w-full max-md:mt-4">
            <Routes>
              <Route path="profile" element={<Profile />} />
              <Route path="favorite" element={<Favorite />} />
              {/* <Route path="order" element={<OrderHistory />} /> */}
              <Route path="deliveryLocation" element={<Delivery />} />
              <Route path="trackOrder" element={<TrackOrderProvider><TrackOrder /></TrackOrderProvider>} />
            </Routes>
          </div>
        </article>
      </div>
    </div>
  );
};

export default AccounForm;
