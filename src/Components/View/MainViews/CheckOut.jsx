import { useEffect, useState } from "react";
import {
  MapPinIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Map from '../GooleMap/CusLoaction';
import { useUser } from "../context/userContext";
import PropTypes from 'prop-types';

const CheckOut = ({ product, error, loading, deliveryAddress }) => {

  const [mapReload, setMapReload] = useState(false);

  const user = useUser();

  //======== Google map API =================================

  const [markerPosition, setMarkerPosition] = useState({lat: 11.082832479596043, lng: 105.79927160482406});
  const [address, setAddress] = useState('');
  const getAddress = (address, markLocation) => {
    setMarkerPosition(markLocation);
    setAddress(address);
  };
  useEffect(() => {
    if (user.user) {
      if (user.user.customer_address && user.user.customer_address.length) {
        setAddress(user.user.customer_address[0].address);
        setMarkerPosition({lat: user.user.customer_address[0].lat, lng: user.user.customer_address[0].lng});
        deliveryAddress(user.user.customer_address[0].lat+"|"+user.user.customer_address[0].lng);
        // localStorage.setItem('mapLat', user.user.customer_address[0].lat);
        // localStorage.setItem('mapLng', user.user.customer_address[0].lng);
      }
      else{
        setAddress('3QMX+4PR, Krong Svay Rieng, Cambodia');
        deliveryAddress('11.082832479596043|105.79927160482406');
      }
    }
  }, [user.user]);

  const selectLocation = (items)=>{
    setAddress(items.address);
    setMarkerPosition({lat: items.lat, lng: items.lng});
    deliveryAddress(items.lat+"|"+items.lng);
    // localStorage.setItem('mapLat', items.lat);
    // localStorage.setItem('mapLng', items.lng);
  }
  //======== Google map API ==================================
  console.log(markerPosition);

  const [isOpen, setIsOpen] = useState(false);

  if (user.error) { return <>{user.error}</> }
  if (user.loading) { return <>Loading...</> }
  return (
    <div className="w-full bg-white text-slate-950">
      <div className="max-sm:w-11/12 w-10/12 m-auto px-4 sm:px-2 md:px-2 lg:px-4 xl:px-0">
        <div className="flex top-[80px] pt-1 bg-white  max-sm:flex-col border-b pb-2" style={{ zIndex: "1000" }}>
          <article className="w-full max-lg:w-1/2 max-sm:w-full py-2 pr-2 flex flex-col">
            <div className="flex items-center justify-between pb-3 pr-4">
              <p className="text-black font-semibold text-base uppercase">
                CheckOut
              </p>
            </div>
            <div className="w-full border p-2 flex max-lg:flex-col rounded-sm">
              <div className="w-2/3 max-lg:w-full h-60 bg-slate-200 rounded-sm">
                <Map key={mapReload} getAddress={getAddress} initialCenter={markerPosition} deliveryAddress={deliveryAddress}/>
              </div>
              <div className="w-1/3 max-lg:w-full max-lg:mt-2 pr-2 ml-2">
                <div className="w-full flex items-center justify-between mb-2">
                  <p className="text-black font-semibold text-sm ">
                    Delivery Address
                  </p>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gray-200 p-2 rounded top-0 right-0 text-black font-semibold underline text-xs"
                  >
                    Select
                  </button>
                  <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    className="relative z-50"
                  >
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                      <DialogPanel className="w-2/3 max-sm:w-full space-y-4 border rounded-sm bg-white p-12 shadow-[0px_0px_150px_rgba(0,0,0,0.0)] shadow-gray-700 ">
                        <DialogTitle className="font-bold flex items-center justify-between">
                          <h1>Delivery Address</h1>
                          <button onClick={() => setIsOpen(false)}>
                            <XMarkIcon className="size-6" />
                          </button>
                        </DialogTitle>
                          <div className="w-full flex flex-wrap justify-start ">
                            {
                              user.user && (
                                user.user.customer_address && (
                                  user.user.customer_address.map((items, index) => (
                                    <div key={index} className="w-1/3  max-lg:w-1/2 max-sm:w-full h-28 pr-2 mb-2">
                                      <div onClick={()=>{selectLocation(items), setMapReload(!mapReload)}} className="w-full h-full border-2 hover:bg-slate-200 cursor-pointer rounded-sm flex flex-col justify-center p-2">
                                        <div className="flex relative items-center justify-between mb-1">
                                          <h1 className="text-base font-semibold flex items-center">
                                            <MapPinIcon className="size-5 mr-1" />
                                            {items.label}
                                          </h1>
                                        </div>
                                        <h2 className="text-sm font-semibold mb-1">
                                          Address:
                                          <span className="text-xs font-normal ml-2">
                                            {items.address}
                                          </span>
                                        </h2>
                                        <h2 className="text-sm font-semibold mb-1">
                                          Location:
                                          <span className="text-xs font-normal ml-2">{items.lat},{items.lng}</span>
                                        </h2>
                                      </div>
                                    </div>
                                  ))
                                )
                              )
                            }
                          </div>
                      </DialogPanel>
                    </div>
                  </Dialog>
                </div>
                <div className="flex items-center mb-2">
                  <MapPinIcon className="size-5 font-medium mr-1" />
                  <h1 className="w-[80%] text-base font-semibold">{user && user.customerName}</h1>
                </div>
                <h2 className="text-sm font-semibold mb-1">
                  Address:
                  <span className="text-xs font-normal ml-2">
                    {address && address}
                  </span>
                </h2>
                <h2 className="text-sm font-semibold mb-1">
                  Note:
                  <span className="text-xs font-normal ml-2">Chhose current location</span>
                </h2>
              </div>
            </div>
          </article>
        </div>
        <div className="w-full max-lg:w-full mt-5">
          <div className="w-full flex flex-wrap justify-items-start">
            {
              error ? (<>{error}</>) : (
                loading ? (<>Loading</>) : (
                  product && (
                    product.map((data) => (
                      <article key={data.id} className="relative w-1/5 max-lg:w-1/3 max-sm:w-2/4 pb text-sm max-sm:text-xs mb-10 pr-3">
                        <img
                          style={{ maxHeight: '120px', minHeight: "120px" }}
                          src={data.header_img}
                          alt=""
                          className="w-full m-auto object-cover object-center"
                        />
                        <h1 className="mt-4 text-black line-clamp-2">
                          {data.productName}
                        </h1>
                        <h1 className="mt-1 bottom-0 left-0 font-bold">
                          ${data.totalPrice ? data.totalPrice : data.price}
                        </h1>
                      </article>
                    ))
                  )
                )
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

CheckOut.propTypes = {
  product: PropTypes.node.isRequired,
  error: PropTypes.node.isRequired,
  loading: PropTypes.node.isRequired,
}
export default CheckOut;
