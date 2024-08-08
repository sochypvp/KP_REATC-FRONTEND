import { HeartIcon as SolidHeartIcon } from "@heroicons/react/20/solid";
import {
  HeartIcon as OutlineHeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import MessageBox from "./AlertBox";
import Loading from "../../loading/loading";

const Box = ({ id, profile, name, brand, price, discount }) => {

  const navigate = useNavigate();

  const [favorite, setFavorite] = useState(false);

  const { addFavorite, addToCart, userFavPdtId } = useUser();

  const [showMessage, setShowMessage] = useState(false);

  const [check, setCheck] = useState(null);

  const handleCloseMessage = () => {
    setShowMessage(false);
  }


  const handleFavorite = async (e) => {
    e.preventDefault();
    if (localStorage.getItem('userId') != null) {
      const data = {
        productId: id,
        customerId: localStorage.getItem('userId'),
      }
      const check = await addFavorite(data);
      if (check) {
        setShowMessage(true);
      } else {
        setShowMessage(false);
      }
      setFavorite(!favorite);
    } else {
      navigate('/login');
    }

  };
  const handleAddToCart = async (e) => {
    e.preventDefault();
    setCheck(true);
    if (localStorage.getItem('userId') != null) {
      const data = {
        productId: id,
        customerId: localStorage.getItem('userId'),
      }
      const check = await addToCart(data);
      if (check) {
        setShowMessage(true);
        setCheck(null); 
      } else {
        setShowMessage(false);
        setCheck(null);
      }
    } else {
      navigate('/login');
    }
  };

  let discountPercent = 0;
  if(discount){
    discountPercent = ((100 / price) * discount).toFixed(2);
  }

  return (
    <article className="relative border bg-gray-50 shadow-sm max-h-[300px] p-2 flex-wrap w-[24%] max-md:w-3/6 max-sm:w-2/4 pb mb-10 m-1 pr-3 overflow-hidden">
      {showMessage && (
        <>
          <MessageBox
            message="Add successfully"
            onClose={handleCloseMessage}
            duration={3000} // Duration in milliseconds (3 seconds in this example)
          />
          {showMessage}
        </>
      )}
      <Link to={"/products/" + id} key={id} className="w-full h-full">
        <img
          src={profile ? (profile) : ('https://img.freepik.com/free-vector/tech-computer-logo-template_23-2149204144.jpg?size=338&ext=jpg&ga=GA1.1.1224184972.1715385600&semt=ais_user')}
          alt=""
          className="h-[55%] m-auto object-cover object-center"
        />
        <h1 className="mt-4 text-sm text-black">{name}</h1>
        <h1 className="text-blue-500 font-semibold flex w-full justify-between text-shadow-red p-1">
          <h1>{brand.brandName}</h1>
          <img className="min-h-5 max-h-5" src={brand.logo} />
        </h1>
        {
          discount && discount != 0 ? (
            <h1 className="absolute flex text-lg bottom-2 left-2 font-bold ">${ price-discount }<h1 className="ml-1 text-sm lg:text-base line-through font-semibold text-red-500">${price}</h1><span className="text-sm font-normal text-red-500 bg-red-100 flex items-center p-1 ml-1 justify-center">{ discountPercent }%</span></h1>
            // <h1 className="bg-red-500 w-[60px] d-flex justify-center text-white p-1">{discount}%</h1>
          ) : (
            <h1 className="absolute text-lg bottom-2 left-2 font-bold">${price}</h1>
          )
        }
        {/* <h1 className="absolute text-lg bottom-0 left-0 font-bold">${price}</h1> */}
        <button
          onClick={handleAddToCart}
          className=" m-1 absolute text-lg bottom-3 right-4 flex items-center justify-center"
        >
          {
            check ? (
              <Loading/>
            ) : (
              <ShoppingCartIcon className="w-4 h-4 " />
            )
          }
          
        </button>
        {
          userFavPdtId && (
            userFavPdtId.includes(id) ? (
              <button
                onClick={handleFavorite}
                className="absolute top-1 right-5 text-white font-bold p-1 bg-white rounded-full"
              >
                <SolidHeartIcon className="w-4 h-4 text-blue-500" />
              </button>
            ) : (
              <button
                onClick={handleFavorite}
                className="absolute top-1 right-5 text-white font-bold p-1 bg-white rounded-full"
              >
                {favorite ? (
                  <SolidHeartIcon className="w-4 h-4 text-black" />
                ) : (
                  <OutlineHeartIcon className="w-4 h-4 text-black" />
                )}
              </button>
            )
          )
        }
      </Link>
    </article>
  );
};

Box.propTypes = {
  id: PropTypes.node.isRequired,
  profile: PropTypes.node.isRequired,
  name: PropTypes.node.isRequired,
  price: PropTypes.node.isRequired,
}

export default Box;
