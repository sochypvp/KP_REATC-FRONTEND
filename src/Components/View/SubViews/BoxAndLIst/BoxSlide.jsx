import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";

const BoxSlide = () => {
  const dataSlide = [
    {
      message: "Record founded",
      status: true,
      data: [
        {
          id: 1,
          url_image:
            "https://storage.iserp.cloud/ice/integration/banner/banner/1652783086045-Logitech.jpg?transform=1&format=webp&width=1920&qualtity=75",
        },
        {
          id: 2,
          url_image:
            "https://storage.iserp.cloud/ice/integration/banner/banner/1652783055813-PC-Build.jpg?transform=1&format=webp&width=1920&qualtity=75",
        },
        {
          id: 3,
          url_image:
            "https://storage.iserp.cloud/ice/integration/banner/banner/1645591695591-APC.jpg?transform=1&format=webp&width=1920&qualtity=75",
        },
        {
          id: 4,
          url_image:
            "https://storage.iserp.cloud/ice/integration/banner/banner/1652783133203-HPE-Enterprise.jpg?transform=1&format=webp&width=1920&qualtity=75",
        },
      ],
    },
  ];

  const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

  const [slide, setSlide] = useState(null);
  const [loadindSlide, setLoadindSlide] = useState(false);
  const [errorSlide, setErrorSlide] = useState(null);
  const [requestCompleted, setRequestCompleted] = useState(0);

  useEffect(() => {
    const fetchSlide = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}slideShow/get`);
        setSlide(response.data.data);
        setLoadindSlide(false);
        setRequestCompleted(1);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          await new Promise(resolve => setTimeout(resolve, 100));
        } else {
          setErrorSlide(error);
          setLoadindSlide(false);
        }
      } finally {
        if (requestCompleted === 1) {
          setLoadindSlide(false);
        }
      }
    }

    fetchSlide();
  }, [setRequestCompleted]);

  if (errorSlide) {
    return <>{errorSlide.message}</>;
  }
  if (loadindSlide) {
    return <>Loading...</>;
  }
  return (
    <article className="w-full text-black bg-white my-10 flex items-center">
      <div className="flex w-full bg-black">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          navigation={
            window.innerWidth >= 768 // Show navigation for widths >= 768px
          }
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          breakpoints={{
            0: {
              pagination: false,
              navigation: false,
              autoplay: {
                delay: 1600,
              },
            }, // Hide navigation for widths < 768px
            480: {
              pagination: false,
              navigation: false,
              autoplay: {
                delay: 1600,
              },
            },
            768: {},
            1024: {},
            1100: {},
            1200: {},
          }}
        >
          {
            slide && (
              slide.map((sli, index) => (
                <SwiperSlide key={index}>
                  <img width="100%" src={sli.url_image} alt="" />
                  {/* <img src="https://storage.iserp.cloud/ice/integration/banner/banner/1652783086045-Logitech.jpg?transform=1&format=webp&width=1920&qualtity=75" alt="" /> */}
                </SwiperSlide>
              ))
            )
          }
        </Swiper>
      </div>
    </article>
  );
}

export default BoxSlide