import  { useState } from "react";
import {
  MapPinIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import CusLoaction from "../GooleMap/CusLoaction";

const CheckOut = ({product, error, loading}) => {
 
  const [isOpen, setIsOpen] = useState(false);
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
              <div className="w-2/3 max-lg:w-full h-56 bg-slate-200 rounded-sm">
                <CusLoaction/>
              </div>
              <div className="w-1/3 max-lg:w-full max-lg:mt-2 pr-2 ml-2">
                <div className="w-full flex items-center justify-between mb-2">
                  <p className="text-black font-semibold text-sm ">
                    Delivery Address
                  </p>
                  <button
                    onClick={() => setIsOpen(true)}
                    className=" top-0 right-0 text-black font-semibold underline text-xs"
                  >
                    Edits
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
                        <div className="w-full grid grid-cols-2 max-lg:grid-cols-1 gap-1">
                          <div className=" border rounded-sm p-2 mr-1 mb-2 flex items-center">
                            <MapPinIcon className="size-9 mx-2" />
                            <div>
                              <h1 className="text-base font-semibold mb-1">
                                Vanchay
                              </h1>
                              <h2 className="text-sm font-semibold mb-1">
                                Address:
                                <span className="text-xs font-normal ml-2">
                                  WW9V+QG7, Kampong Rou, Cambodia
                                </span>
                              </h2>
                              <h2 className="text-sm font-semibold mb-1">
                                Note:
                                <span className="text-xs font-normal ml-2">
                                  For my PC
                                </span>
                              </h2>
                            </div>
                          </div>
                          <div className=" border rounded-sm p-2 mr-1 mb-2 flex items-center">
                            <MapPinIcon className="size-9 mx-2" />
                            <div>
                              <h1 className="text-base font-semibold mb-1">
                                Vanchay
                              </h1>
                              <h2 className="text-sm font-semibold mb-1">
                                Address:
                                <span className="text-xs font-normal ml-2">
                                  WW9V+QG7, Kampong Rou, Cambodia
                                </span>
                              </h2>
                              <h2 className="text-sm font-semibold mb-1">
                                Note:
                                <span className="text-xs font-normal ml-2">
                                  For my PC
                                </span>
                              </h2>
                            </div>
                          </div>
                          <button className=" border rounded-sm p-2 mr-1 mb-2 flex items-center justify-center">
                          <PlusCircleIcon className="size-9 mr-1 "/>
                            <h1 className="text-base font-semibold ">
                              Create New
                            </h1>
                          </button>
                        </div>
                      </DialogPanel>
                    </div>
                  </Dialog>
                </div>
                <div className="flex items-center mb-2">
                  <MapPinIcon className="size-5 font-medium mr-1" />
                  <h1 className="w-[80%] text-base font-semibold">Vanchay</h1>
                </div>
                <h2 className="text-sm font-semibold mb-1">
                  Address:
                  <span className="text-xs font-normal ml-2">
                    WW9V+QG7, Kampong Rou, Cambodia
                  </span>
                </h2>
                <h2 className="text-sm font-semibold mb-1">
                  Note:
                  <span className="text-xs font-normal ml-2">For my PC</span>
                </h2>
              </div>
            </div>
            <div className="w-full h-20 py-1 mt-2 flex">
              {/* <div className="w-1/2 max-lg:w-full h-full border rounded-sm flex items-center p-2">
                <img
                  src="https://i.pinimg.com/originals/a5/53/5d/a5535ddefd7f764a991b91cb84e87758.png"
                  alt=""
                  className="w-1/4 items-center"
                />
                <div className="ml-2">
                  <h1 className="text-sm font-medium">ABA KHQR</h1>
                  <p className="text-xs ">Scan to pay with any banking app</p>
                </div>
              </div> */}
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
                          style={{ maxHeight: '120px',minHeight: "120px" }}
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
            {/* {KK[0].data.map((data) => (
              <article key={data.id} className="relative w-1/5 max-lg:w-1/3 max-sm:w-2/4 pb text-sm max-sm:text-xs mb-10 pr-3 overflow-hidden">
                <img
                  src="https://store-images.s-microsoft.com/image/apps.4720.14416131676512756.84314783-1c86-4403-b991-2e1da8525703.bf78340f-7059-4641-8d3f-8a7f740be8c0"
                  alt=""
                  className="w-full m-auto object-cover object-center"
                />
                <h1 className="mt-4 text-black line-clamp-2">
                  {data.productName}
                </h1>
                <h1 className="mt-1 mb-4 text-slate-600">{data.brand}</h1>
                <h1 className="absolute bottom-0 left-0 font-bold">
                  ${data.price}
                </h1>
              </article>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
