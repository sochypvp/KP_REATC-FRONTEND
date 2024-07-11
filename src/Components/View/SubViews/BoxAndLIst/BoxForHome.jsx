import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/20/solid";
import {
  HeartIcon as OutlineHeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { useUser } from "../../context/userContext";
import MessageBox from "./AlertBox";

const BoxForHome = ({ id, profile, name, brand, price, discount, handleCloseMessage }) => {

  const setMessage = (response)=>{
    handleCloseMessage(response);
  }

  const navigate = useNavigate();

  const { addFavorite, addToCart, userFavPdtId } = useUser();

  const [favorite, setFavorite] = useState(false);
  const [addToCarat, setAddToCarat] = useState(1);
  const handleFavorite = async (e) => {
    e.preventDefault();
    if (localStorage.getItem('userId') != null) {
      const data = {
        productId: id,
        customerId: localStorage.getItem('userId'),
      }
      const check = await addFavorite(data);
      if (check) {
        setMessage({status: check, message: "Add successfully"});
      }
      setFavorite(!favorite);
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
      const check = await addToCart(data);
      if (check) {
        setMessage({status: check, message: "Add successfully"});
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
    <article className="relative w-full h-full">
      <Link to={"/products/" + id} key={id} className="w-full h-full">
        <div className=" h-[200px] relative">
          <img
            src={profile}
            alt=""
            className="h-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <h1 className="mt-4 text-black">{name}</h1>
        <h1 className="text-blue-500 font-semibold flex w-full justify-between text-shadow-red p-1">
          {brand.brandName}
          <img className="min-h-5 max-h-5"  src={brand.logo}/>
        </h1>
        {/* <h1 className="absolute text-lg bottom-1 left-0 font-bold">${price}</h1> */}
        <button
          onClick={handleAddToCart}
          className="absolute  text-sm bottom-2 right-4 flex items-center justify-center"
        >
          <ShoppingCartIcon className="mr-1 w-4 h-4" />
          <button onClick={handleAddToCart} className="border-b border-black">Add to Cart</button>
        </button>
        {
          userFavPdtId && (
            userFavPdtId.includes(id) ? (
              <button
                onClick={handleFavorite}
                className="absolute top-1 right-[-70px] text-white font-bold p-1 bg-white rounded-full group-hover:block transform group-hover:right-2 duration-150"
              >
                <SolidHeartIcon className="w-4 h-4 text-blue-500 " />
              </button>
            ) : (
              <button
                onClick={handleFavorite}
                className="absolute top-1 right-[-70px] text-white font-bold p-1 bg-white rounded-full group-hover:block transform group-hover:right-2 duration-150"
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
        {
          discount && discount != 0 ? (
            <h1 className="absolute flex text-lg bottom-1 left-0 font-bold ">${ price-discount }<h1 className="ml-1 text-sm lg:text-base line-through font-semibold text-red-500">${price}</h1><span className="text-sm font-normal text-red-500 bg-red-100 flex items-center p-1 ml-1 justify-center">{ discountPercent }%</span></h1>
            // <h1 className="bg-red-500 w-[60px] d-flex justify-center text-white p-1">{discount}%</h1>
          ) : (
            <h1 className="absolute text-lg bottom-1 left-0 font-bold">${price}</h1>
          )
        }
      </Link>
    </article>
  );
};

BoxForHome.propTypes = {
  id: PropTypes.node.isRequired,
  profile: PropTypes.node.isRequired,
  name: PropTypes.node.isRequired,
  brand: PropTypes.node.isRequired,
  price: PropTypes.node.isRequired,
  discount: PropTypes.node.isRequired,
}

export default BoxForHome;
