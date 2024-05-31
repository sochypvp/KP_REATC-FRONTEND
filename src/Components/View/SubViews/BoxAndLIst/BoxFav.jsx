import { HeartIcon as SolidHeartIcon } from "@heroicons/react/20/solid";
import {
  HeartIcon as OutlineHeartIcon,
  ShoppingCartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";


const Box = ({ id, profile, name, brand, price, favId, discount }) => {

  const navigate = useNavigate();

  const { removeFavorite, addToCart } = useUser();

  const handleRemoveFav = (e)=>{
    e.preventDefault();
    removeFavorite(favId);
  }

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if(localStorage.getItem('userId') != null){
      const data = {
        productId: id,
        customerId: localStorage.getItem('userId'),
      }
      await addToCart(data);
    } else {
      navigate('/login');
    }
  };



  return (
    <article className="relative w-1/4 h-[300px] max-md:w-3/6 max-sm:w-2/4 pb mb-10 pr-3 overflow-hidden">
      <Link to={"/products/" + id} key={id} className="w-full h-full">
        <img
          src={profile ? (profile) : ('https://img.freepik.com/free-vector/tech-computer-logo-template_23-2149204144.jpg?size=338&ext=jpg&ga=GA1.1.1224184972.1715385600&semt=ais_user')}
          alt=""
          className="h-[50%] m-auto object-cover object-center"
        />
        <h1 className="mt-4 text-sm text-black">{name}</h1>
        <h1 className="text-blue-500 font-semibold flex w-full justify-between text-shadow-red p-1">
          {brand.brandName}
          <img className="min-h-5 max-h-5" src={brand.logo} />
        </h1>
        {
          discount && discount != 0 ? (
            <h1 className="absolute flex text-lg bottom-1 left-0 font-bold ">${(price)-(price/100*discount)}<h1 className="ml-1 text-sm lg:text-base line-through font-semibold text-red-500">${price}</h1></h1>
            // <h1 className="bg-red-500 w-[60px] d-flex justify-center text-white p-1">{discount}%</h1>
          ) : (
            <h1 className="absolute text-lg bottom-1 left-0 font-bold">${price}</h1>
          )
        }
        {/* <h1 className="absolute mb-1 text-lg bottom-0 left-0 font-bold">${price}</h1> */}
        <button onClick={handleRemoveFav} className="btn text-danger m-1 btn-sm h-[30px] absolute bottom-0 text-lg right-14 flex items-center justify-center"><TrashIcon className="w-4 h-4 " /></button>
        
        <button 
          onClick={handleAddToCart}
          className="btn m-1 absolute text-lg bottom-0 right-4 flex items-center justify-center"
        >
          <ShoppingCartIcon className="w-4 h-4 " />
        </button>
      </Link>
    </article>
  );
};

Box.propTypes = {
  id: PropTypes.node.isRequired,
  profile: PropTypes.node.isRequired,
  name: PropTypes.node.isRequired,
  brand: PropTypes.node.isRequired,
  price: PropTypes.node.isRequired,
  favId: PropTypes.node.isRequired,
}

export default Box;