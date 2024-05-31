import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
  ChevronDownIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { UseMainCateg } from "../View/context/mainCategContext";
import { useAuth } from "../View/context/AuthContext";
import logo from "../../assets/logo.png";
import { useUser } from "../View/context/userContext";

// import { logout } from "../API/api";

const Header = () => {

  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainCategoryContext = UseMainCateg();

  // === Active event ================================
  const [onActive, setOnActive] = useState("");
  const onActiveHandler = (objActive) => {
    setOnActive(objActive);
  }
  // === Active event ================================
  if (localStorage.getItem('userId')) {
    // console.log(localStorage.getItem('userId'));
  }

  const { logout } = useAuth();
  const { userFav, userCart } = useUser();

  const handleLogout = async () => {
    await logout();
    // navigate('/');
    window.location.reload();
  }
  
  // all element
  const navBarButtonActive = "border-l-2 border-r-2 pl-2 shadow-xl pr-2 border-gray-600 text-sm font-semibold leading-6";

  return (
    <header className="bg-white w-full border-b" style={{ position: "fixed", zIndex: "1000" }}>
      <nav
        className="max-sm:w-11/12 w-10/12 m-auto flex items-center justify-between py-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1" style={{ position: "relative" }}>
          <Link to="/">
            <p className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-[78px] w-auto"
                style={{ position: "absolute", top: "-39px" }}
                src={logo}
                alt=""
              />
            </p>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12 justify-center items-center">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Category
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {
                    mainCategoryContext.loading ? (<>Loading...</>) : (
                      mainCategoryContext.mainCateg && (
                        mainCategoryContext.mainCateg.map((cateItem) => (
                          <Link
                            onClick={() => onActiveHandler("product")}
                            to={"/products/?mainCateg=" + cateItem.id}
                            key={cateItem.id}
                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                          >
                            <div>
                              <p className="block font-semibold text-gray-900">
                                {cateItem.categoryName}
                              </p>
                              <img src="" alt="" />
                            </div>
                          </Link>
                        ))
                      )
                    )
                  }
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          <Link
            onClick={() => onActiveHandler("home")}
            to="">
            <p className={location.pathname === "/" ? navBarButtonActive : "text-sm font-semibold leading-6 text-gray-900"}>
              Home
            </p>
          </Link>
          <Link
            onClick={() => onActiveHandler("product")}
            to="/products">
            <p className={location.pathname === "/products" || location.pathname === "/products/" ? navBarButtonActive : "text-sm font-semibold leading-6 text-gray-900"}>
              Products
            </p>
          </Link>
          <Link
            onClick={() => onActiveHandler("contact")}
            to="/contact">
            <p className={location.pathname === "/contact" ? navBarButtonActive : "text-sm font-semibold leading-6 text-gray-900"}>
              Contact us
            </p>
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
          <Link to="/my_account/favorite">
            <div className="relative flex items-center justify-center mr-5 ">
              <HeartIcon className="size-7 text-black" />
              {
                userFav && (
                  <p className="absolute top-[-8px] right-[-9px] size-5 rounded-full text-white text-center text-sm font-medium bg-red-600">
                    {
                      userFav.total && (
                        userFav.total
                      )
                    }
                  </p>
                )
              }

            </div>
          </Link>
          <Link to="/cart">
            <div className="relative flex items-center justify-center mr-5 ">
              <ShoppingBagIcon className="size-7 text-black" />
              {
                userCart && (
                  <p className="absolute top-[-8px] right-[-9px] size-5 rounded-full text-white text-center text-sm font-medium bg-red-600">
                    {
                      userCart.total && (
                        userCart.total
                      )
                    }
                  </p>
                )
              }

            </div>
          </Link>
          {
            localStorage.getItem('userId') == null ?
              (
                <Link to="/login">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    Log in <span aria-hidden="true">&rarr;</span>
                  </p>
                </Link>
              ) : (
                <>
                  <button
                    onClick={handleLogout}
                  >
                    <p className="btn btn-sm btn-danger">
                      Logout <span aria-hidden="true"></span>
                    </p>
                  </button>
                  <Link to="/my_account/profile" className="relative text-black">
                  <UserIcon className="size-6 ml-2"></UserIcon>
                    {/* {localStorage.getItem('token') ? "" : user.user.name.substring(0,2)} */}
                  </Link>
                </>
              )
          }

        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </a>
                <a
                  href="/products"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Products
                </a>

                <a
                  href="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Contact us
                </a>
              </div>
              <div className="py-6">
                <a
                  href="/my_account/profile"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
                <UserIcon className="size-5"></UserIcon>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;
