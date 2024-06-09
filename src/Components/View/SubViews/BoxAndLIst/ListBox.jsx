import {
  HeartIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";



const ListBox = ({ handleCloseMessage, favData,orderItems, handleCheckItems, setIsChekedd, selectItem, id, profile, name, price, warranty, addQty, handleAddFav, cartId }) => {

  const setMessage = (response)=>{
    handleCloseMessage(response);
  }

  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [newPrice, setNewPrice] = useState(price);

  const { removeCart } = useUser();

  const hanldeRemoveCart = async (e) => {
    e.preventDefault();
    const response = await removeCart(cartId);
    if(response){
      setMessage({status: response, message: 'Remove successfully'});
    }
  }


  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    if (selectItem) {
      setIsChecked(true);
    }
  }, [selectItem]);

  const handleIncrement = (e) => {
    e.preventDefault();
    if (isChecked) {
      setQuantity(quantity + 1);
      setNewPrice(newPrice + parseInt(price));
      addQty(newPrice);
      favData.qty = quantity+1;
      favData.totalPrice = parseInt(newPrice*favData.qty);
    }

  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (isChecked) {
      if (quantity > 1) {
        setQuantity(quantity - 1);
        addQty(-newPrice);
        favData.qty = quantity+1-1;
        favData.totalPrice = parseInt(price);
      }
    }

  };

  const handleFavorite = async (e) => {
    e.preventDefault();
    if (localStorage.getItem('userId') != null) {
      const data = {
        productId: id,
        customerId: localStorage.getItem('userId'),
      }
      handleAddFav(data);
    } else {
      navigate('/login');
    }

  };


  const handleIsChecked = (event) => {
    const h = handleCheckItems(event, favData, quantity);
    if (!h) {
      setNewPrice(newPrice + parseInt(price));
      addQty(newPrice * quantity);
      setQuantity(1);
      // handleUnCheckItems(orderItems.include(id) && orderItems);
    } else {
      setIsChekedd(false);
      addQty(-newPrice * quantity);
    }
  }

  return (
    <article className=" w-full py-7 pr-2 border-b border-slate-400 text-sm">
      <input checked={orderItems.includes(favData)} onChange={(event)=>handleIsChecked(event)} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
      <Link to={"/products/" + id} key={id} className="w-full h-full flex ">
        <img
          width="100px"
          src={profile}
          alt=""
          className="m-auto object-cover object-center"
        />
        <div className="w-full pl-12 flex flex-col justify-between">
          <div className=" relative w-full">
            <h1 className="w-[80%] text-black">{name}</h1>
            <h1>{warranty}</h1>
            <button onClick={hanldeRemoveCart} className="absolute flex items-center top-0 right-0">
              <TrashIcon className="w-4 h-4 mr-2" />
              <p className="border-b border-black">remove</p>
            </button>
          </div>
          <div className="flex w-32 p-1 items-center justify-between text-black text-sm border border-slate-400">
            <button disabled={!orderItems.includes(favData)} className="px-3 py-1 " onClick={handleDecrement}>
              <MinusIcon className="w-4 h-4" />
            </button>
            <span className="">{quantity}</span>
            <button disabled={!orderItems.includes(favData)} className="px-3 py-1 " onClick={handleIncrement}>
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="flex justify-between">
            <h1>${price}</h1>
            <button onClick={handleFavorite} className=" flex items-center top-0 right-0">
              <HeartIcon className="w-4 h-4 mr-2" />
              <p className="border-b border-black">More to Favorite</p>
            </button>
            <h1>
              Total: <span className="font-bold">${parseInt(newPrice*quantity)}</span>
            </h1>
          </div>
        </div>
      </Link>
    </article>
  );
};

ListBox.propTypes = {
  id: PropTypes.node.isRequired,
  profile: PropTypes.node.isRequired,
  name: PropTypes.node.isRequired,
  brand: PropTypes.node.isRequired,
  price: PropTypes.node.isRequired,
}

export default ListBox;
