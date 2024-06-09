import { useState } from "react";
import BoxFav from "../SubViews/BoxAndLIst/BoxFav";
import { useUser } from "../context/userContext";
import MessageBox from "../SubViews/BoxAndLIst/AlertBox";


const Favorite = () => {

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(null);

  const handleCloseMessage = (response) => {
    setShowMessage(response.status);
    setMessage(response.message);
  }


  const { userFav, error, loading } = useUser();

  return (
    <article className="min-h-[43vh]">
      {showMessage && (
        <>
          <MessageBox
            message={message}
            onClose={() => setShowMessage(false)}
            duration={3000} // Duration in milliseconds (3 seconds in this example)
          />
          {showMessage}
        </>
      )}
      <div className="flex items-center justify-between pb-10 pr-4">
        <p className="text-black uppercase font-extrabold text-lg max-md:text-base pb-5">
          Favorite
        </p>

        <p className="text-black font-bold text-lg">
          {/* <button className="btn btn-danger mr-2 btn-sm">Remove</button> */}
          Total-
          {
            userFav && (
              userFav.total && (
                userFav.total
              )

            )
          }
        </p>
      </div>
      <div className="flex flex-wrap justify-items-startt">
        {
          error ? (<>{error}</>) : (
            loading ? (<>Loading...</>) : (
              userFav && (
                userFav.products.map((favData) => {
                  var shortName = "";
                  if (favData.productName.length > 60) {
                    shortName =
                      favData.productName.substring(0, 60).toUpperCase() + "...";
                  } else {
                    shortName = favData.productName;
                  }
                  return (
                    <BoxFav
                      key={favData.id}
                      id={favData.id}
                      profile={favData.header_img}
                      name={shortName}
                      price={favData.price}
                      brand={favData.get_brand && favData.get_brand}
                      barcode={favData.barcode}
                      favId={favData.favId}
                      discount={favData.discount}
                      handleCloseMessage={handleCloseMessage}
                    />
                  );
                })
              )
            )
          )
        }
      </div>
      {/* Pagination */}
      {/* <ul className="flex justify-center mt-4">
        <li
          className={`cursor-pointer mx-1 px-3 py-1 rounded-full ${currentPage === 1 ? "bg-gray-100" : "bg-gray-200"
            }`}
          onClick={prevPage}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </li>
        {Array.from({
          length: Math.ceil(KK[0].data.length / itemsPerPage),
        }).map((_, index) => (
          <li
            key={index}
            onClick={() => paginate(index + 1)}
            className={`cursor-pointer mx-1 px-3 py-1 rounded-full ${currentPage === index + 1
              ? "bg-gray-600 text-white"
              : "bg-gray-200"
              }`}
          >
            {index + 1}
          </li>
        ))}
        <li
          className={`cursor-pointer mx-1 px-3 py-1 rounded-full ${currentPage === Math.ceil(KK[0].data.length / itemsPerPage)
            ? "bg-gray-100"
            : "bg-gray-200"
            }`}
          onClick={nextPage}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </li>
      </ul> */}
    </article>
  );
};

export default Favorite;
