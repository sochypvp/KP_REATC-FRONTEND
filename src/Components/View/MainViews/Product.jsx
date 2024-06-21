import { useEffect, useState } from "react";
import {
  ChevronRightIcon,
  FunnelIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Box from "../SubViews/BoxAndLIst/Box";
import { UseSubCateg } from "../context/subCategContext";
import { UseMainCateg } from "../context/mainCategContext";
import { UseBrand } from "../context/brandContext";
import { Disclosure } from "@headlessui/react";
import { Link, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../loading/LoadingSpinner";
import { useProduct, useProductPagination } from "../context/productContext";

const Product = () => {

  const subCategory = UseSubCateg();
  const mainCategory = UseMainCateg();
  const brand = UseBrand();
  const productContext = useProduct();
  const { showProductByPage, showProductBySubCateg, showProductByHight, showProductByLow, refreshProduct, showProductByMainCateg, showProductByBrand } = useProductPagination();
  // console.log(productContext.productPagination);


  const showByPage = [];

  const PaginationHandler = (e) => {

    showProductByPage(e.target.getAttribute('data'));
  }

  //=== Show product by low and hight price
  const [sortSelect, setSortSelect] = useState(0);
  const sortProductHandleSelectChange = (e) => {
    setSortSelect(e.target.value);
    if (e.target.value == 2) {
      showProductByHight();
    }
    if (e.target.value == 1) {
      showProductByLow();
    }
  }

  const [showDiv1, setShowDiv1] = useState(true);
  const toggleDiv = () => {
    setShowDiv1(!showDiv1);
  };

  const [numBoxes, setNumBoxes] = useState(8);

  // Function to handle changing the number of boxes
  const handleNumBoxesChange = (e) => {
    const newNumBoxes = parseInt(e.target.value);
    setNumBoxes(newNumBoxes);// Recalculate total pages
  };


  // === Active event ================================
  const [subCategOnActive, setSubCategOnActive] = useState(0);
  const [mainCategOnActive, setMainCategOnActive] = useState(0);
  const [barndOnActive, SetBrandOnActive] = useState(0);

  const subCategClickHandler = (id) => {
    setSubCategOnActive(id);
    setMainCategOnActive(0);
    SetBrandOnActive(0);
  }
  const mainCategClickHandler = (id) => {
    setMainCategOnActive(id);
    setSubCategOnActive(0);
    SetBrandOnActive(0);
  }
  const brandClickHandler = (id) => {
    SetBrandOnActive(id);
    setSubCategOnActive(0);
    setMainCategOnActive(0);
  }
  // === Active event ================================

  // === Check URL params ============================
  const [searchParams] = useSearchParams();
  const mainCateg = searchParams.get('mainCateg');

  useEffect(() => {
    if (mainCateg) {
      showProductByMainCateg(mainCateg);
      mainCategClickHandler(parseInt(mainCateg))
      console.log(mainCategOnActive);
    }
    if(location.pathname === "/products"){
      refreshProduct();
    }
  }, [mainCateg]);
  // === Check URL params ============================


  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className="relative w-full pt-5 bg-white text-slate-950 overflow-hidden">
        <div className="max-sm:w-full w-10/12 m-auto py-2 pl-4 lg:px-8">
          <div className="flex items-center text-base max-sm:text-sm pb-6">
            <Link to="/">
              <HomeIcon className="size-5 mr-2" />
            </Link>
            <span className="mr-2">/</span>
            <span className="mr-2">Products</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-black uppercase font-extrabold text-lg max-md:text-base max-lg:hidden ">
              Filters
            </p>
            <button
              onClick={() => setShowPopup(!showPopup)}
              className="bg-white h-10 max-md:h-8 px-2 ml-1 hidden max-lg:block border border-black outline-none"
            >
              <FunnelIcon className="size-5" />
            </button>
            <div className=" w-full flex justify-end items-center products">
              <button
                onClick={() => {
                  refreshProduct(),
                    setSubCategOnActive(0),
                    setMainCategOnActive(0),
                    SetBrandOnActive(0)
                }}
                className="bg-white text-sm max-md:text-xs h-10 max-md:h-8 px-2 ml-1 border border-black outline-none">
                View All
              </button>
              <select
                value={sortSelect}
                onChange={sortProductHandleSelectChange}
                name=""
                id=""
                className="bg-white text-sm max-md:text-xs h-10 max-md:h-8 px-2 ml-1 border border-black outline-none"
              >
                <option value="0">Sort by :</option>
                <option value="1">Price (Low-Hight)</option>
                <option value="2">Price (Hight-Low)</option>
              </select>
              <select
                name=""
                id="numBoxes"
                value={numBoxes}
                onChange={handleNumBoxesChange}
                className="bg-white text-sm max-md:text-xs h-10 max-md:h-8  px-2 ml-1 border border-black outline-none"
              >
                <option value="0">16 / Page</option>
                {showByPage}
              </select>
              {/* <button
                onClick={toggleDiv}
                className="bg-white h-10 max-md:h-8 px-2 ml-1 mr-4 border border-black outline-none"
              >
                {showDiv1 ? (
                  <>
                    <ListBulletIcon className="size-6 max-md:size-4" />
                  </>
                ) : (
                  <>
                    <Squares2X2Icon className="size-6 max-md:size-4" />
                  </>
                )}
              </button> */}
            </div>
          </div>
          <div className=" flex justify-between pt-3 ">
            {/* Category */}
            <div className="w-1/5 max-lg:hidden py-1 pr-3 border-t ">
              {/* Main */}
              <Disclosure
                as="div"
                defaultOpen={true}
                className="border-b pt-1 pb-2 mt-1"
              >
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center justify-between py-2">
                      <span className="text-sm/6 uppercase font-medium text-black group-data-[hover]:text-white/80">
                        Main Category
                      </span>
                      <ChevronRightIcon
                        className={`${open ? "rotate-90 transform" : "rotate-180  transform"
                          } size-5 `}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-gray-500 pl-3 pb-2">
                      {mainCategory &&
                        (mainCategory.loading ? (
                          <LoadingSpinner/>
                        ) : (
                          mainCategory.mainCateg &&
                          mainCategory.mainCateg.map((main) => (
                            <a
                              onClick={() => { showProductByMainCateg(main.id), mainCategClickHandler(main.id) }}
                              href="#"
                              key={main.id}
                              className={mainCategOnActive === main.id ? "text-red-600 w-ful flex my-1 pr-2 font-bold" : "w-ful flex my-1 pr-2"}
                            >
                              <label
                                htmlFor=""
                                className="w-full flex justify-between "
                              >
                                <h1>{main.categoryName}</h1>
                                <h1 className="text-blue-500">
                                  {main.total_product}
                                </h1>
                              </label>
                            </a>
                          ))
                        ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              {/* Sub */}
              <Disclosure
                as="div"
                defaultOpen={true}
                className="border-b pt-1 pb-2 mt-1"
              >
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center justify-between py-2">
                      <span className="text-sm/6 uppercase font-medium text-black group-data-[hover]:text-white/80">
                        Sub Category
                      </span>
                      <ChevronRightIcon
                        className={`${open ? "rotate-90 transform" : "rotate-180  transform"
                          } size-5 `}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-gray-500 pl-3 pb-2">
                      {subCategory &&
                        (subCategory.loading ? (
                          <LoadingSpinner/>
                        ) : (
                          subCategory.subCateg &&
                          subCategory.subCateg.map((sub) => (
                            <Link
                              to={""}
                              onClick={() => { showProductBySubCateg(sub.id, 1), subCategClickHandler(sub.id) }}
                              key={sub.id}
                              className={subCategOnActive === sub.id ? "text-red-600 w-ful flex my-1 pr-2 font-bold" : "w-ful flex my-1 pr-2"}
                            >
                              <label
                                htmlFor=""
                                className="w-full flex justify-between "
                              >
                                <h1>{sub.categoryName}</h1>
                                <h1 className="text-blue-500">
                                  {sub.total_product}
                                </h1>
                              </label>
                            </Link>
                          ))
                        ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              {/* Brand */}
              <Disclosure
                as="div"
                defaultOpen={true}
                className="pt-1 pb-2 mt-1"
              >
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center justify-between py-2">
                      <span className="text-sm/6 uppercase font-medium text-black group-data-[hover]:text-white/80">
                        Brand
                      </span>
                      <ChevronRightIcon
                        className={`${open ? "rotate-90 transform" : "rotate-180  transform"
                          } size-5 `}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-gray-500 pl-3 pb-2">
                      {brand &&
                        (brand.loading ? (
                          <LoadingSpinner/>
                        ) : (
                          brand.brand &&
                          brand.brand.map((brand) => (
                            <a
                              onClick={() => { showProductByBrand(brand.id), brandClickHandler(brand.id) }}
                              href="#"
                              key={brand.id}
                              className={barndOnActive === brand.id ? "text-red-600 w-ful flex my-1 pr-2 font-bold" : "w-ful flex my-1 pr-2"}
                            >
                              <label
                                htmlFor=""
                                className="w-full flex justify-between "
                              >
                                <h1>{brand.brandName}</h1>
                                <h1 className="text-blue-500">
                                  {brand.total_product}
                                </h1>
                              </label>
                            </a>
                          ))
                        ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
            {/* List Product */}
            <div className="w-3/4 max-lg:w-full">
              <div className="w-full flex flex-wrap justify-items-start">
                {productContext &&
                  (productContext.loading ? (
                    <LoadingSpinner/>
                  ) : (
                    productContext.product &&
                    productContext.product.map((pro) => {
                      var shortName = "";
                      if (pro.productName.length >= 45) {
                        shortName =
                          pro.productName.substring(0, 45).toUpperCase() +
                          "...";
                      } else {
                        shortName = pro.productName;
                      }
                      return (
                        <Box
                          key={pro.id}
                          id={pro.id}
                          profile={pro.header_img}
                          name={shortName}
                          price={pro.price}
                          brand={pro.get_brand}
                          barcode={pro.barcode}
                          discount={pro.discount}
                        />
                      );
                    })
                  ))}
              </div>
              {/* Previous / Next */}
              <div className="w-full flex justify-center items-center space-x-10 py-4">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    {/* {pagination} */}
                    {
                      productContext.productPagination && (
                        productContext.productPagination.map((element, index) => {
                          var className = "page-item";
                          if (element.active) {
                            className = "page-item active";
                          }
                          var paginateList = <li
                            onClick={PaginationHandler}
                            className={className}
                            key={index}
                          >
                            <a data={element.url} className="page-link">{element.label}</a>
                          </li>;
                          if (index == 0) {
                            paginateList = <li
                              onClick={PaginationHandler}
                              className={className}
                              key={index}
                            >
                              <span data={element.url} className="page-link">Previous</span>
                            </li>;
                          }
                          if (index == productContext.productPagination.length - 1) {
                            paginateList = <li
                              onClick={PaginationHandler}
                              className={className}
                              key={index}
                            >
                              <span data={element.url} className="page-link">Next</span>
                            </li>;
                          }
                          return (
                            paginateList
                          )
                        }
                        )
                      )
                    }
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
