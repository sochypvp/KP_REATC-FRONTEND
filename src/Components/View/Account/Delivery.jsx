import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import DeliveryLocation from "../GooleMap/DeliveryLocation";

const Delivery = () => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const { user, error, loading, addDeliveryAddress, updateDeliveryAddress, deleteDeliveryAddress } = useUser();
  //======== Google map API =================================
  let initialCenter = {
    lat: 11.082832479596043,// Latitude for Svay Rieng, Cambodia
    lng: 105.79927160482406 // Longitude for Svay Rieng, Cambodia
  };
  const [locationId, setLocationId] = useState(null);
  const [label, setLabel] = useState('');
  const [note, setNote] = useState('');
  const handleLabelChange = (e) => {
    e.preventDefault();
    setLabel(e.target.value);
  }
  const handleNoteChange = (e) => {
    e.preventDefault();
    setNote(e.target.value);
  }
  const [markerPosition, setMarkerPosition] = useState(initialCenter);
  const [address, setAddress] = useState('');
  const getAddress = (address) => {
    setAddress(address);
  };
  const getMarkLocation = (markLocation) => {
    setMarkerPosition(markLocation);
  };
  useEffect(() => {
    if (user) {
      if (user.customer_address && user.customer_address.length) {
        setAddress(user.customer_address[0].address);
        initialCenter.lat = user.customer_address[0].lat;
        initialCenter.lng = user.customer_address[0].lng;
      }
    }
  }, [user]);

  const saveSave = async (e) => {
    e.preventDefault();
    const data = {
      label: label,
      address: address,
      lat: markerPosition.lat,
      lng: markerPosition.lng,
      note: note,
    }
    const sendBack = await addDeliveryAddress(data);
    if (sendBack.status) {
      alert(sendBack.message);
      setIsOpenCreate(false);
    }
  }
  // ======= Edit location ===================================
  const showLocation = (lat, lng)=>{
    setMarkerPosition({
      lat: lat,
      lng: lng,
    });
  }
  const editLocation = async () => {
    const data = {
      id: locationId,
      label: label,
      address: address,
      lat: markerPosition.lat,
      lng: markerPosition.lng,
      note: note,
    }
    const sendBack = await updateDeliveryAddress(data);
    if (sendBack.status) {
      alert(sendBack.message);
      setIsOpenEdit(false);
    }
  }
  const removeLoction = async (id)=>{
    const sendBack = await deleteDeliveryAddress(id);
    if (sendBack.status) {
      alert(sendBack.message);
    }
  }
  //======== Google map API ==================================
  if (error) return <>{error}</>;
  if (loading) return <>Loading..</>;
  return (
    <article className="min-h-[43vh]">
      <p className="text-black uppercase font-extrabold text-lg max-md:text-base">
        Delivery Address
      </p>
      <hr className="my-3" />
      <div className="w-full flex flex-wrap justify-start ">
        {
          user && (
            user.customer_address && (
              user.customer_address.map((items, index) => (
                <div key={index} className="w-1/3 max-lg:w-1/2 max-sm:w-full h-28 pr-2 mb-2">
                  <div className="w-full h-full border-2 rounded-sm flex flex-col justify-center p-2">
                    <div className="flex relative items-center justify-between mb-1">
                      <h1 className="text-base font-semibold flex items-center">
                        <MapPinIcon className="size-5 mr-1" />
                        {items.label}
                      </h1>
                      <div className="absolute top-[-15px] right-1">
                        <button
                          onClick={() => { setIsOpenEdit(true), setLocationId(items.id), showLocation(items.lat,items.lng) }}
                          className=" text-black font-semibold underline text-xs"
                          data-value={items.id}
                        >
                          Edits
                        </button>
                        <button onClick={()=>removeLoction(items.id)} className="text-black ml-3 font-semibold underline text-xs">Remove</button>
                      </div>
                    </div>
                    <h2 className="text-sm font-semibold mb-1">
                      Address:
                      <span className="text-xs font-normal ml-2">
                        {items.address}
                      </span>
                    </h2>
                    <h2 className="text-sm font-semibold mb-1">
                      Note:
                      <span className="text-xs font-normal ml-2">{items.note}</span>
                    </h2>
                  </div>
                </div>
              ))
            )
          )
        }


        <div className="w-1/3 max-lg:w-1/2 max-sm:w-full h-28 pr-2 mb-2">
          <button
            onClick={() => setIsOpenCreate(true)}
            className="w-full h-full border-dashed border-2 rounded-sm p-2 mr-1 mb-2 flex items-center justify-center"
          >
            <PlusCircleIcon className="size-9 mr-1 " />
            <h1 className="text-base font-semibold ">Create New</h1>
          </button>
        </div>
      </div>
      {/* Dialog for Edit Delivery Address */}
      <Dialog
        open={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        className="relative z-50 "
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center md:p-4 max-md:p-0 z-50">
          <DialogPanel className="w-8/12 max-xl:w-10/12 max-lg:w-11/12 max-md:w-full max-md:h-full space-y-2 border rounded-sm bg-white p-4 shadow-[0px_0px_150px_rgba(0,0,0,0.0)] shadow-gray-700 overflow-hidden ">
            <DialogTitle className="font-bold flex items-center justify-between">
              <h1>Delivery Address</h1>
              <button onClick={() => setIsOpenEdit(false)}>
                <XMarkIcon className="size-6" />
              </button>
            </DialogTitle>
            <div className="w-full flex max-md:flex-col ">
              <div className="w-2/3 max-md:w-full pr-5 max-md:pr-0">
                <div className="relative md:my-4 max-md:my-2 ">
                  <div className="relative h-10 bg-gray-500">
                    <MagnifyingGlassIcon className="absolute size-4 top-3 left-2" />
                    <input
                      type="text"
                      name="Search"
                      // value={}
                      id=""
                      // onChange={}
                      className="block w-full shadow-sm border border-b-black h-full pl-8 pr-3 bg-white text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      placeholder="Search..."
                    />
                  </div>
                </div>
                <div className="w-full h-80 max-md:h-60 bg-slate-200 rounded-sm">
                  <DeliveryLocation getMarkLocation={getMarkLocation} getAddress={getAddress} initialCenter={markerPosition} />
                </div>
              </div>
              <div className="w-1/3 max-md:w-full">
                <div className="relative my-2 ">
                  <label htmlFor="Label" className="py-2 text-sm font-medium">
                    Label
                  </label>
                  <div className="relative h-10 bg-gray-500">
                    <input
                      type="text"
                      name="Label"
                      value={label}
                      id=""
                      onChange={handleLabelChange}
                      className="block w-full shadow-sm border border-b-black h-full pl-3 pr-3 bg-white text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      placeholder="Label"
                    />
                  </div>
                </div>
                <div className="relative my-2 ">
                  <label htmlFor="Note" className="py-2 text-sm font-medium">
                    Note
                  </label>
                  <div className="relative h-52 max-md:h-32 bg-gray-500">
                    <textarea
                      name=""
                      value={note}
                      onChange={handleNoteChange}
                      id=""
                      placeholder="Note"
                      className="block w-full shadow-sm border border-b-black h-full p-2 bg-white text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    ></textarea>
                  </div>
                </div>
                <div className="relative mt-2 ">
                  {
                    isOpenCreate && (
                      <button onClick={saveSave} className="w-full h-12 border bg-black hover:bg-opacity-90 border-b-black text-sm font-medium text-white">
                        Save
                      </button>
                    )
                  }
                  {
                    isOpenEdit && (
                      <button onClick={editLocation} className="w-full h-12 border bg-black hover:bg-opacity-90 border-b-black text-sm font-medium text-white">
                        Save Edit
                      </button>
                    )
                  }
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      {/* Dialog for Create Delivery Address */}
      <Dialog
        open={isOpenCreate}
        onClose={() => setIsOpenCreate(false)}
        className="relative z-50 "
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center md:p-4 max-md:p-0 z-50">
          <DialogPanel className="w-8/12 max-xl:w-10/12 max-lg:w-11/12 max-md:w-full max-md:h-full space-y-2 border rounded-sm bg-white p-4 shadow-[0px_0px_150px_rgba(0,0,0,0.0)] shadow-gray-700 overflow-hidden ">
            <DialogTitle className="font-bold flex items-center justify-between">
              <h1>Create New Address</h1>
              <button onClick={() => setIsOpenCreate(false)}>
                <XMarkIcon className="size-6" />
              </button>
            </DialogTitle>
            <div className="w-full flex max-md:flex-col ">
              <div className="w-2/3 max-md:w-full pr-5 max-md:pr-0">
                <div className="relative md:my-4 max-md:my-2 ">
                  <div className="relative h-10 bg-gray-500">
                    <MagnifyingGlassIcon className="absolute size-4 top-3 left-2" />
                    <input
                      type="text"
                      name="Search"
                      // value={}
                      id=""
                      // onChange={}
                      className="block w-full shadow-sm border border-b-black h-full pl-8 pr-3 bg-white text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      placeholder="Search..."
                    />
                  </div>
                </div>
                <div className="w-full h-80 max-md:h-60 bg-slate-200 rounded-sm">
                  <DeliveryLocation getMarkLocation={getMarkLocation} getAddress={getAddress} initialCenter={markerPosition} />
                </div>
              </div>
              <div className="w-1/3 max-md:w-full">
                <div className="relative my-2 ">
                  <label htmlFor="Label" className="py-2 text-sm font-medium">
                    Label
                  </label>
                  <div className="relative h-10 bg-gray-500">
                    <input
                      type="text"
                      name="Label"
                      value={label}
                      id=""
                      onChange={handleLabelChange}
                      className="block w-full shadow-sm border border-b-black h-full pl-3 pr-3 bg-white text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      placeholder="Label"
                    />
                  </div>
                  <label htmlFor="Label" className="w-full py-2 text-sm font-medium">
                    Address : {address && address}
                  </label>
                  <label htmlFor="Label" className="w-full py-2 text-sm font-medium">
                    Location : {markerPosition.lat} , {markerPosition.lng}
                  </label>
                </div>
                <div className="relative my-2 ">
                  <label htmlFor="Note" className="py-2 text-sm font-medium">
                    Note
                  </label>
                  <div className="relative h-52 max-md:h-32 bg-gray-500">
                    <textarea
                      name=""
                      value={note}
                      onChange={handleNoteChange}
                      id=""
                      placeholder="Note"
                      className="block w-full shadow-sm border border-b-black h-full p-2 bg-white text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    ></textarea>
                  </div>
                </div>
                <div className="relative mt-2 ">
                  {
                    isOpenCreate && (
                      <button onClick={saveSave} className="w-full h-12 border bg-black hover:bg-opacity-90 border-b-black text-sm font-medium text-white">
                        Save
                      </button>
                    )
                  }
                  {
                    isOpenEdit && (
                      <button onClick={editLocation} className="w-full h-12 border bg-black hover:bg-opacity-90 border-b-black text-sm font-medium text-white">
                        Save Edit
                      </button>
                    )
                  }
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </article>
  );
};

export default Delivery;
