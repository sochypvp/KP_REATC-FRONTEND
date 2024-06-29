import { FaceSmileIcon, StarIcon } from "@heroicons/react/20/solid";
import { ArrowLeftStartOnRectangleIcon, FaceFrownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="relative bg-blueGray-200 pt-8 pb-6 bg-white border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl fonat-semibold text-black">
            KP Computer and Eletronic
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-black">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <button
                className="bg-white text-black shadow-lg font-normal p-2 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <StarIcon className="w-6 h-6" />
              </button>
              <button
                className="bg-white text-black shadow-lg font-normal p-2 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <StarIcon className="w-6 h-6" />
              </button>
              <button
                className="bg-white text-black shadow-lg font-normal p-2 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <StarIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-black text-sm font-semibold mb-2">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      to={"/contact"}
                      className="text-black hover:text-black font-semibold block pb-2 text-sm"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <a href="https://web.facebook.com/kpcsvayrieng/?_rdc=1&_rdr" target="_blank"
                      className="text-black hover:text-black font-semibold block pb-2 text-sm"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-black hover:text-black font-semibold block pb-2 text-sm"
                    >
                      Telegram
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-black text-sm font-semibold mb-2">
                  Account
                </span>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      to="my_account/profile"
                      className="text-black hover:text-black font-semibold block pb-2 text-sm"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="cart" className="text-black hover:text-black font-semibold block pb-2 text-sm">
                      View Cart
                    </Link>
                  </li>
                  <li>
                    <Link to="my_account/favorite" className="text-black hover:text-black font-semibold block pb-2 text-sm">
                      Favorite
                    </Link>
                  </li>
                  <li>
                    <Link to="my_account/trackOrder" className="text-black hover:text-black font-semibold block pb-2 text-sm">
                      Track Order
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-black font-semibold py-1">
              Copyright © <span id="get-current-year">2024 </span>
              <a href="#" className="text-black hover:text-black">
                KP Computer and Eletronic
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
