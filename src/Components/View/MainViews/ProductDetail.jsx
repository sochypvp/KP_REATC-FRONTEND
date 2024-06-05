// // import { faHeart, faHome } from "@fortawesome/free-solid-svg-icons";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { ArrowLeftIcon } from "@heroicons/react/24/outline";
// import axios from "axios";
// import { useEffect } from "react";
// import {  useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useUser } from "../context/userContext";
// // import { getProduct } from "../../FatchAPI/fetchProduct";

// const ProductDetail = () => {

//   const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

//   const navigate = useNavigate();

//   // const id = useParams().id;
//   //   console.log(id);
//   const [quantity, setQuantity] = useState(1);
//   const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
//   const [Spec, setSpec] = useState(true);
//   const [Dsec, setDsec] = useState(false);

//   const handleIncrement = () => {
//     setQuantity(quantity + 1);
//   };

//   const handleDecrement = () => {
//     if (quantity > 0) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const handleSpec = () => {
//     setSpec(true);
//     setDsec(false);
//   };
//   const handleDesc = () => {
//     setDsec(true);
//     setSpec(false);
//   };

//   const handleToggleWishlist = () => {
//     setIsAddedToWishlist(!isAddedToWishlist);
//   };

//   const [url, setUrl] = useState(
//     "https://dlcdnwebimgs.asus.com/gain/cefd241b-b64b-4c4a-acba-af8e31cf232e/w800/fwebp"
//   );

//   const viewImg = (e) => {
//     setUrl(e.currentTarget.src);
//   };


//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLaoding] = useState(false);
//   console.log(id);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${BASE_API_URL}products/getOneProduct/${id}`);
//         setProduct(response.data.data);
//         setLaoding(false);
//         console.log(product);
//       } catch (error) {
//         setError(error);
//         setLaoding(false);
//       }
//     }
//     fetchData();
//   }, []);

//   const { addFavorite, addToCart } = useUser();

//   const handleFavorite = async (e) => {
//     e.preventDefault();
//     if (localStorage.getItem('userId') != null) {
//       const data = {
//         productId: id,
//         customerId: localStorage.getItem('userId'),
//       }
//       const check = await addFavorite(data);
//       if (check) {
//         // setShowMessage(true);
//       } else {
//         // setShowMessage(false);
//       }
//       // setFavorite(!favorite);
//     } else {
//       navigate('/login');
//     }

//   };
//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     if (localStorage.getItem('userId') != null) {
//       const data = {
//         productId: id,
//         customerId: localStorage.getItem('userId'),
//       }
//       await addToCart(data);
//       // setFavorite(!favorite);
//     } else {
//       navigate('/login');
//     }
//   };

//   if (error) {
//     return <>{error}</>;
//   }

//   if (loading) {
//     return <>Loading...</>;
//   }

//   return (
//     <div className="relative w-full bg-white text-slate-950 overflow-hidden">
//       <div className="max-sm:w-full w-10/12 m-auto py-2 pl-4 lg:px-8">
//         <div className="flex pt-[90px] items-center text-base max-sm:text-sm pb-6">
//           <Link to="/products">
//             <ArrowLeftIcon className="size-4 mr-2" />
//           </Link>
//           <span className="mr-2">/</span>
//           <Link to="/products">
//             <span className="mr-2">Products</span>
//           </Link>
//           <span className="mr-2">/</span>
//           <span className="mr-2">
//             {product && (product.productName.substring(0, 30))}...
//           </span>
//         </div>
//         {/* =========== */}
//         <div className="flex">
//           <div className=" w-[50%]">
//             <div className="flex items-center justify-center  w-full relative py-2">
//               <img src={product && (product.header_img)} alt="" className="h-[400px]" />
//             </div>
//             {
//               product && (
//                 <div className="flex py-[4px] space-x-2">
//                   {
//                     product.product_img && (
//                       product.product_img.map((items, index) => (
//                         <img
//                           key={index}
//                           onClick={viewImg}
//                           src={items.imageUrl}
//                           alt=""
//                           className="h-[56px] "
//                         />
//                       ))
//                     )
//                   }
//                 </div>
//               )
//             }

//           </div>
//           {/* === */}
//           <div className=" w-[50%]">
//             <div>
//               <h1 className="text-xl font-extrabold ">
//                 {product && (product.productName)}
//               </h1>
//               <h1 className="text-lg text-slate-1000 pt-2">
//                 {
//                   product && (
//                     product.get_brand && (
//                       product.get_brand.brandName
//                     )
//                   )
//                 }
//               </h1>
//               <h2 className="text-blue-700 text-3xl font-extrabold mt-6 ">
//                 $
//                 {
//                   product && (product.price)
//                 }
//               </h2>
//               <div className="flex flex-col justify-center space-y-2 mt-4">
//                 <div className="flex items-center text-base">
//                   <h3 className="w-40 font-bold ">Category</h3>:
//                   <span className="ml-5">
//                     {
//                       product && (
//                         product.sub_category && (
//                           product.sub_category.categoryName
//                         )
//                       )
//                     }
//                   </span>
//                 </div>
//                 <div className="flex items-center text-base">
//                   <h3 className="w-40 font-bold ">Part Number</h3>:
//                   <span className="ml-5">{product && (product.partNumber)}</span>
//                 </div>
//                 <div className="flex items-center text-base">
//                   <h3 className="w-40 font-bold ">UPC / BARCODE</h3>:
//                   <span className="ml-5">{product && (product.barcode)}</span>
//                 </div>
//                 <div className="flex items-center text-base">
//                   <h3 className="w-40 font-bold ">Warranty</h3>:
//                   <span className="ml-5">{product && (product.warranty)}</span>
//                 </div>
//               </div>
//             </div>
//             {/* === */}
//             <div className="flex flex-col justify-center space-y-2 mt-4">
//               <div className="flex flex-col justify-center space-y-2">
//                 <p>Quantity</p>
//                 <div className="flex items-center justify-between w-[148px] h-[42px] border-[1px] border-blue-500 rounded-md">
//                   <button
//                     className="px-3 py-1 rounded-md text-gray-700 font-semibold"
//                     onClick={handleDecrement}
//                   >
//                     -
//                   </button>
//                   <span className="text-blue-500 font-semibold">
//                     {quantity}
//                   </span>
//                   <button
//                     className="px-3 py-1 rounded-md text-gray-700 font-semibold"
//                     onClick={handleIncrement}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button onClick={handleAddToCart} className="w-[148px] h-[42px] border-[1px] border-blue-500 rounded-md text-blue-500 font-semibold">
//                   Add to Cart
//                 </button>
//                 <Link to={"/cart"} className="w-[148px] h-[42px] bg-blue-500 flex justify-center items-center rounded-lg text-slate-50">
//                   Buy Now
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* =========== */}
//         <div className=" pt-2">
//           <div className="text-lg font-bold text-gray-700">
//             <button className="p-1" onClick={handleDesc}>Description</button>|
//             <button className="p-1" onClick={handleSpec}>Specifications</button>
//           </div>
//           {/* Conditional rendering of div1 based on showDiv1 state */}
//           {Spec && (
//             <div dangerouslySetInnerHTML={{ __html: product && (product.specifications) }} className="w-full rounded-md border-[1px] border-slate-300 p-5">
//               {/* {product && (product.specifications)} */}
//             </div>
//           )}
//           {/* Conditional rendering of div2 based on showDiv2 state */}
//           {Dsec && (
//             <div dangerouslySetInnerHTML={{ __html: product && (product.description) }} className="w-full rounded-md border-[1px] border-slate-300 p-5 uppercase">
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "../../../Style/swiper-custom.css"; // Import your custom CSS file
import { Navigation } from "swiper/modules";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/20/solid";
import {
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
  HeartIcon as OutlineHeartIcon,
  ChartBarIcon,
  ShoppingCartIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BoxForHome from "../SubViews/BoxAndLIst/BoxForHome";
import axios from "axios";
import { useUser } from "../context/userContext";
// import { getProduct } from "../../FatchAPI/fetchProduct";

const ProductDetail = () => {

  const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

  const navigate = useNavigate();

  // const id = useParams().id;
  //   console.log(id);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [Spec, setSpec] = useState(true);
  const [Dsec, setDsec] = useState(false); 
  const [about, setAbout] = useState("Details");
  const handleAbout = (objActive) => {
    setAbout(objActive);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };



  const [url, setUrl] = useState(null);

  const viewImg = (e) => {
    setUrl(e.currentTarget.src);
  };


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

  const { addFavorite, addToCart } = useUser();

  const handleFavorite = async (e) => {
    e.preventDefault();
    if (localStorage.getItem('userId') != null) {
      const data = {
        productId: id,
        customerId: localStorage.getItem('userId'),
      }
      const check = await addFavorite(data);
      if (check) {
        // setShowMessage(true);
      } else {
        // setShowMessage(false);
      }
      // setFavorite(!favorite);
    } else {
      navigate('/login');
    }

  };
  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (localStorage.getItem('userId') != null) {
      const data = {
        productId: id,
        customerId: localStorage.getItem('userId'),
      }
      await addToCart(data);
      // setFavorite(!favorite);
    } else {
      navigate('/login');
    }
  };

  if (error) {
    return <>{error}</>;
  }

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <article className="pt-[70px] relative w-full text-black overflow-hidden">
      <div className="max-sm:w-11/12 w-10/12 m-auto py-6 lg:px-8">
        <div className="flex items-center text-base max-sm:text-sm pb-6">
          <Link to="/products">
            <ArrowLeftIcon className="size-4 mr-2" />
          </Link>
          <span className="mr-2">/</span>
          <Link to="/products">
            <span className="mr-2">Products</span>
          </Link>
          <span className="mr-2">/</span>
          <span className="mr-2">{product && (product.productName.substring(0, 30))}...</span>
        </div>
        <div className="flex max-md:flex-col pb-4 border-b">
          <div className="w-1/2 max-lg:w-2/5 max-md:w-full px-20 max-lg:px-1">
            <div className="hidden max-md:block">
              <h1 className="text-base font-semibold">
                {product && (product.productName)}
              </h1>
              <h1 className="text-base text-slate-500 pt-2">Asus</h1>
              <h2 className="underline underline-offset-4 text-xl font-extrabold my-2">
                $78.00
              </h2>
            </div>
            <div className="min-h-[47vh] h-[47vh] max-h-[47vh] flex">
              {
                url ? (
                  <img src={url} alt="" className="max-h-[100%] m-auto pb-2 " />
                ) : (
                  <img src={product && (product.header_img)} alt="" className="max-h-[100%] m-auto pb-2 " />
                )
              }
            </div>
            
            
            {
              product && (
                <div className="flex">
                  {
                    product.product_img && (
                      product.product_img.map((items, index) => (
                        <img
                          key={index}
                          onClick={viewImg}
                          src={items.imageUrl}
                          alt=""
                          className="w-1/5 pr-2 "
                        />
                      ))
                    )
                  }
                </div>
              )
            }
          </div>
          <div className="w-1/2 max-lg:w-3/5 max-md:w-full pb-2 pl-2 lg:px-10">
            <div>
              <div className="max-md:hidden">
                <h1 className="text-xl font-semibold">
                  {product && (product.productName)}
                </h1>
                <h1 className="text-base text-slate-500 pt-2">
                  {
                    product && (
                      product.get_brand && (
                        product.get_brand.brandName
                      )
                    )
                  }
                </h1>
                <h2 className="underline underline-offset-4 text-3xl font-extrabold mt-6 ">
                  {
                    product && (<h1 className="bg-gradient-to-r from-red-600 via-rose-500 to-red-400 inline-block text-transparent bg-clip-text">${product.price}</h1>)
                  }
                                  
                </h2>
              </div>
              <div className="flex flex-col justify-center text-sm font-medium mt-6 ">
                <p>Quantity</p>
                <div className="flex items-center justify-between w-44 border py-3 px-1 mt-1">
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
              <div className="mt-6 text-base font-semibold text-gray-500 ">
                <button onClick={() => handleAbout("Details")}>
                  <span
                    className={`uppercase hover:underline hover:underline-offset-4 hover:text-black border-black mr-5 ${about === "Details"
                      ? "underline underline-offset-4 text-black"
                      : ""
                      }`}
                  >
                    Details
                  </span>
                </button>
                <button className="" onClick={() => handleAbout("Spec")}>
                  <span
                    className={`uppercase hover:underline hover:underline-offset-4 hover:text-black border-black mr-5 ${about === "Spec" &&
                      "underline underline-offset-4 text-black"
                      }`}
                  >
                    Specifications
                  </span>
                </button>
                <button className="" onClick={() => handleAbout("Desc")}>
                  <span
                    className={`uppercase hover:underline hover:underline-offset-4 hover:text-black border-black mr-5 ${about === "Desc" &&
                      "underline underline-offset-4 text-black"
                      }`}
                  >
                    Description
                  </span>
                </button>
              </div>
              <div className="p-2 mt-1 border rounded-sm ">
                {about === "Details" && (
                  <div className="flex flex-col justify-center space-y-2">
                    <div className="flex items-center text-base">
                      <h3 className="w-40 font-bold ">Category</h3>:
                      <span className="ml-5">{
                        product && (
                          product.sub_category && (
                            product.sub_category.categoryName
                          )
                        )
                      }</span>
                    </div>
                    <div className="flex items-center text-base">
                      <h3 className="w-40 font-bold ">Part Number</h3>:
                      <span className="ml-5">{product && (product.partNumber)}</span>
                    </div>
                    <div className="flex items-center text-base">
                      <h3 className="w-40 font-bold ">UPC / BARCODE</h3>:
                      <span className="ml-5">{product && (product.barcode)}</span>
                    </div>
                    <div className="flex items-center text-base">
                      <h3 className="w-40 font-bold ">Warranty</h3>:
                      <span className="ml-5">{product && (product.warranty)}</span>
                    </div>
                  </div>
                )}
                {about === "Spec" && (
                  <div className="whitespace-break-spaces text-sm">
                    {Spec && (
                      <div dangerouslySetInnerHTML={{ __html: product && (product.specifications) }} className="w-full rounded-md border-[1px] border-slate-300 p-5">
                        {/* {product && (product.specifications)} */}
                      </div>
                    )}
                  </div>
                )}
                {about === "Desc" && (
                  <div className="whitespace-pre-line">
                    {Dsec && (
                      <div dangerouslySetInnerHTML={{ __html: product && (product.description) }} className="w-full rounded-md border-[1px] border-slate-300 p-5 uppercase">
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap w-full text-sm font-bold text-white mt-3 ">
                <button onClick={handleAddToCart} className="flex bg-gradient-to-r from-rose-400 to-red-500 shadow rounded border bg-black py-3 w-44 mr-2 mt-2 text-nowrap items-center justify-center">
                  <ShoppingCartIcon className="size-5 mr-1"/> Add to Cart
                </button>
                <button className="bg-gradient-to-r from-rose-400 to-red-500 flex shadow rounded border bg-black py-3 w-44 mr-2 mt-2 text-nowrap items-center justify-center">
                  <ShoppingCartIcon className="size-5 mr-1"/> Buy Now
                </button>
                <button onClick={handleFavorite} className="bg-gradient-to-r from-rose-400 to-red-500 shadow rounded border bg-black py-3 w-44 mr-2 mt-2 text-nowrap flex items-center justify-center">
                  <HeartIcon className="size-5 mr-1" /><p>Favorite</p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full text-black mt-4 boder">
          <h1 className="text-md mb-4 font-bold lg:text-xl ">
            Similar Products
          </h1>
          <div className="flex flex-wrap justify-items-start">
            <Swiper
              spaceBetween={20}
              slidesPerView={5}
              navigation={
                window.innerWidth >= 768 // Show navigation for widths >= 768px
              }
              modules={[Navigation]}
              pagination={{ clickable: true }}
              className="w-full h-auto"
              breakpoints={{
                0: { slidesPerView: 2, navigation: false }, // Hide navigation for widths < 768px
                480: { slidesPerView: 2, navigation: false },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1100: { slidesPerView: 4 },
                1200: { slidesPerView: 5 },
              }}
            >
              <SwiperSlide
                key={1}
                className="relative group pb-2 text-sm mb-10 overflow-hidden"
              >
                <BoxForHome
                  key={1}
                  id={1}
                  profile={""}
                  name={
                    "Asus GT301 TUF GAMING CASE, BLK, ARGB, FAN (90DC0040-B40000)"
                  }
                  price={"70.00"}
                  brand={"ASUS"}
                  barcode={""}
                />
              </SwiperSlide>
              <SwiperSlide
                key={1}
                className="relative group pb-2 text-sm mb-10 overflow-hidden"
              >
                <BoxForHome
                  key={1}
                  id={1}
                  profile={""}
                  name={
                    "Asus GT301 TUF GAMING CASE, BLK, ARGB, FAN (90DC0040-B40000)"
                  }
                  price={"70.00"}
                  brand={"ASUS"}
                  barcode={""}
                />
              </SwiperSlide>
              <SwiperSlide
                key={1}
                className="relative group pb-2 text-sm mb-10 overflow-hidden"
              >
                <BoxForHome
                  key={1}
                  id={1}
                  profile={""}
                  name={
                    "Asus GT301 TUF GAMING CASE, BLK, ARGB, FAN (90DC0040-B40000)"
                  }
                  price={"70.00"}
                  brand={"ASUS"}
                  barcode={""}
                />
              </SwiperSlide>
              <SwiperSlide
                key={1}
                className="relative group pb-2 text-sm mb-10 overflow-hidden"
              >
                <BoxForHome
                  key={1}
                  id={1}
                  profile={""}
                  name={
                    "Asus GT301 TUF GAMING CASE, BLK, ARGB, FAN (90DC0040-B40000)"
                  }
                  price={"70.00"}
                  brand={"ASUS"}
                  barcode={""}
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductDetail;
