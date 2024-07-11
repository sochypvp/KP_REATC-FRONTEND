import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import BoxSlide from "../SubViews/BoxAndLIst/BoxSlide";
import BoxForHome from "../SubViews/BoxAndLIst/BoxForHome";
import { UseBrand } from "../context/brandContext";
import { UseHomePageContext } from "../context/homePageContext";
import { Link } from "react-router-dom";
import "../../swiperCustom.css";
import MessageBox from "../SubViews/BoxAndLIst/AlertBox";
import { useState } from "react";

const Home = () => {

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(false);

  const handleCloseMessage = (response) => {
    setShowMessage(response.status);
    setMessage(response.message);
  }

  const brands = UseBrand();
  const dataContext = UseHomePageContext();

  return (
    <div className="pt-4 w-full bg-white">
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
      <div className="max-sm:w-11/12 w-10/12 m-auto py-6 lg:px-8">
        <BoxSlide />
        {/* Best discount */}
        <div className="w-full text-black my-10">
          <h1 className="text-md mb-4 font-bold lg:text-xl ">Promotion</h1>
          <div className="flex flex-wrap justify-items-startt">
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
              {dataContext.error ? (<>{dataContext.error}</>) : (
                dataContext.loading ? (<>Loading...</>) : (
                  dataContext.bestDiscountProduct && (
                    dataContext.bestDiscountProduct.map((items) => {
                      var shortName = "";
                      if (items.productName.length > 100) {
                        shortName =
                          items.productName.substring(0, 100).toUpperCase() + "...";
                      } else {
                        shortName = items.productName;
                      }
                      return (
                        <SwiperSlide
                          key={items.id}
                          className="relative group pb-2 text-sm mb-10 overflow-hidden"
                        >
                          <BoxForHome
                            key={items.id}
                            id={items.id}
                            profile={items.header_img ? (items.header_img) : ("none")}
                            name={shortName}
                            price={items.price}
                            brand={items.get_brand}
                            barcode={items.barcode}
                            discount={items.discount}
                            handleCloseMessage={handleCloseMessage}
                          />
                        </SwiperSlide>
                      );
                    })
                  )
                )
              )}
            </Swiper>
          </div>
        </div>
        {/* New products */}
        <div className="w-full text-black my-10">
          <h1 className="text-md mb-4 font-bold lg:text-xl ">New Products</h1>
          <div className="flex flex-wrap justify-items-startt">
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
              {
                dataContext.error ? (<>{dataContext.error}</>) : (
                  dataContext.loading ? (<>Loading...</>) : (
                    dataContext.newArrivalProduct && (
                      dataContext.newArrivalProduct.map((items) => {
                        var shortName = "";
                        if (items.productName.length > 100) {
                          shortName =
                            items.productName.substring(0, 100).toUpperCase() + "...";
                        } else {
                          shortName = items.productName;
                        }
                        return (
                          <SwiperSlide
                            key={items.id}
                            className="relative group pb-2 text-sm mb-10 overflow-hidden"
                          >
                            <BoxForHome
                              key={items.id}
                              id={items.id}
                              profile={items.header_img ? (items.header_img) : ("none")}
                              name={shortName}
                              price={items.price}
                              brand={items.get_brand}
                              discount={""}
                              barcode={items.barcode}
                              handleCloseMessage={handleCloseMessage}
                            />
                          </SwiperSlide>
                        );
                      })
                    )
                  )
                )
              }
            </Swiper>
          </div>
        </div>
        <div className="w-full text-black my-10">
          <div><h1 className="text-md mb-4 font-bold lg:text-xl ">Brands</h1><p></p></div>
          <div className="flex flex-wrap justify-center">
            {
              brands.loading ? (
                <>Loading...</>
              ) : (
                brands.brand && (
                  brands.brand.map((brand) => (
                    <Link to={"/products/?brand=" + brand.id} key={brand.id} className="max-sm:w-2/5 mb-2 mx-1 p-1 flex align-middle">
                      <img className="h-[50px]" src={brand.logo} alt="" />
                    </Link>
                    // <BoxBrands key={brand.id} id={brand.id} img={brand.price}  />
                  ))
                )
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
