import { CheckIcon, TicketIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTrackOrder } from '../context/TrackOrderContext';

const TrackOrder = () => {

    const { trackOrderView, setTrackorderView, ordersData, error, loading, requestComplete, cancelOrder, completeOrder } = useTrackOrder();
    const [onActive, setOnActive] = useState(0);

    const changeOrderView = (key) => {
        setTrackorderView(ordersData[key]);
        setOnActive(key);
    }

    if (error) return <>{error}</>;
    if (loading) return <>Loading</>;

    return (
        <div className="bg-white p-8 rounded-md w-full">
            <div className="flex items-center justify-between pb-6">
                <div>
                    <h2 className="text-gray-600 font-semibold">Product Orders</h2>
                    <span className="text-xs">All product items</span>
                </div>
                {
                    trackOrderView && (<Progress trackOrderView={trackOrderView} />)
                }
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow-sm rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th className="px-1 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Order date
                                </th>
                                <th className="px-1 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Total products
                                </th>
                                <th className="px-1 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Total items
                                </th>
                                <th className="px-1 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Total payment
                                </th>
                                <th className="px-1 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Verify
                                </th>
                                {/* <th className="px-1 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Pay
                                </th> */}
                                <th className="px-1 text-center py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Option
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ordersData && (
                                    ordersData.map((order, key) => (
                                        <tr key={key} onClick={() => changeOrderView(key)} className='max-h-1'>
                                            <td className="cursor-pointer px-5 py-3 border-b border-gray-200 bg-white text-sm relative items-center">
                                                {
                                                    onActive == key && (<div className='w-4 h-4 mr-1 rounded-full bg-blue-500 absolute left-4 top-[38%]'></div>)
                                                }
                                                <p className="text-gray-900 whitespace-no-wrap">{order.id}</p>
                                            </td>
                                            <td className="px-1 py-3 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{order.created_at}</p>
                                            </td>
                                            <td className="px-1 py-3 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{order.totalProducts}</p>
                                            </td>
                                            <td className="px-1 py-3 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{order.totalItems}</p>
                                            </td>
                                            <td className="px-1 py-3 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">${order.totalPayment}</p>
                                            </td>
                                            <td className="px-1 py-3 border-b border-gray-200 bg-white text-sm">
                                                <StatusBadge status={order.verify} />
                                            </td>
                                            {/* <td className="px-1 py-3 border-b border-gray-200 bg-white text-sm">
                                                <StatusBadge status={order.pay} />
                                            </td> */}
                                            <td className="px-1 py-3 border-b border-gray-200 bg-white text-sm text-center">
                                                {
                                                    order.verify < 1 ? (
                                                        <button onClick={() => cancelOrder(order.id)} className='bg-green-200 px-2 p-1 rounded-md '>Cancel</button>
                                                    ) : (
                                                        order.verify < 2 ? (
                                                            <button disabled className='bg-gray-100 px-2 p-1 rounded-md '>Cancel</button>
                                                        ) : (
                                                            order.verify >= 3 ?
                                                                (
                                                                    <CheckIcon className='size-6 m-auto bg-gray-200 rounded-lg p-1' />
                                                                ) : (
                                                                    <button onClick={() => completeOrder(order.id)} className='bg-green-200 px-2 p-1 rounded-md '>Complete</button>
                                                                )
                                                        )
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                    </table>
                    {/* <Pagination /> */}
                </div>
            </div>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const statusClasses = {
        3: 'bg-gray-200 text-gray-900',
        2: 'bg-green-200 text-green-900',
        1: 'bg-orange-200 text-orange-900',
        0: 'bg-red-200 text-red-900',
    };
    const statusName = {
        3: 'Success',
        2: 'Paid',
        1: 'Verified',
        0: 'Ordering',
    };

    return (
        <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${statusClasses[status]}`}>
            <span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${statusClasses[status]}`}></span>
            <span className="relative">{statusName[status]}</span>
        </span>
    );
};

const Pagination = () => {
    return (
        <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
            <span className="text-xs xs:text-sm text-gray-900">Showing 1 to 4 of 50 Entries</span>
            <div className="inline-flex mt-2 xs:mt-0">
                <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                    Prev
                </button>
                <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                    Next
                </button>
            </div>
        </div>
    );
};

const Progress = ({ trackOrderView }) => {

    let style1 = '0%';
    let style2 = '0%';
    let style3 = '0%';
    if (trackOrderView) {
        if (trackOrderView.verify == 0) {
            style1 = '20%';
        }
        else if (trackOrderView.verify == 1) {
            style1 = '100%';
            style2 = '20%';
        }
        else if (trackOrderView.verify == 2) {
            style1 = '100%';
            style2 = '100%';
            style3 = '20%';
        }
        else if (trackOrderView.verify == 3) {
            style3 = '100%';
            style1 = '100%';
            style2 = '100%';
        }
    }

    return (
        <div className="max-w-xl mx-auto my-4">
            <div className="flex pb-3">
                <div className="flex-1">
                </div>
                <div className="flex-1">
                    {
                        trackOrderView && (trackOrderView.verify >= 0 ? (
                            <div className="w-10 h-10 bg-green-400 mx-auto rounded-full text-lg text-dark flex items-center">
                                <span className="text-dark text-center w-full text-white"><i className="fa fa-check w-full fill-current white"></i>1</span>
                            </div>) : (
                            <div className="w-10 h-10 bg-white border-2 border-grey-light mx-auto rounded-full text-lg text-dark flex items-center">
                                <span className="text-grey-darker text-center w-full">1</span>
                            </div>))
                    }
                </div>
                <div className="w-[50px] align-center items-center align-middle content-center flex">
                    <div className="w-full bg-gray-300 rounded items-center align-middle align-center flex-1">
                        <div className="bg-green-400 text-xs leading-none py-1 text-center text-grey-darkest rounded " style={{ width: style1 }}></div>
                    </div>
                </div>
                <div className="flex-1">
                    {
                        trackOrderView && (trackOrderView.verify >= 1 ? (
                            <div className="w-10 h-10 bg-green-400 mx-auto rounded-full text-lg text-dark flex items-center">
                                <span className="text-dark text-center w-full text-white"><i className="fa fa-check w-full fill-current white"></i>2</span>
                            </div>) : (
                            <div className="w-10 h-10 bg-white border-2 border-grey-light mx-auto rounded-full text-lg text-dark flex items-center">
                                <span className="text-grey-darker text-center w-full">2</span>
                            </div>))
                    }
                </div>
                <div className="w-[50px] align-center items-center align-middle content-center flex">
                    <div className="w-full bg-gray-300 rounded items-center align-middle align-center flex-1">
                        <div className="bg-green-400 text-xs leading-none py-1 text-center text-grey-darkest rounded " style={{ width: style2 }}></div>
                    </div>
                </div>
                <div className="flex-1">
                    {
                        trackOrderView && (trackOrderView.verify >= 2 ? (
                            <div className="w-10 h-10 bg-green-400 mx-auto rounded-full text-lg text-dark flex items-center">
                                <span className="text-dark text-center w-full text-white"><i className="fa fa-check w-full fill-current white"></i>3</span>
                            </div>) : (
                            <div className="w-10 h-10 bg-white border-2 border-grey-light mx-auto rounded-full text-lg text-dark flex items-center">
                                <span className="text-grey-darker text-center w-full">3</span>
                            </div>))
                    }
                </div>
                <div className="w-[50px] align-center items-center align-middle content-center flex">
                    <div className="w-full bg-gray-300 rounded items-center align-middle align-center flex-1">
                        <div className="bg-green-400 text-xs leading-none py-1 text-center text-grey-darkest rounded " style={{ width: style3 }}></div>
                    </div>
                </div>
                <div className="flex-1">
                    {
                        trackOrderView && (trackOrderView.verify >= 3 ? (
                            <div className="w-10 h-10 bg-green-400 mx-auto rounded-full text-lg text-dark flex items-center">
                                <span className="text-dark text-center w-full text-white"><i className="fa fa-check w-full fill-current white"></i>4</span>
                            </div>) : (
                            <div className="w-10 h-10 bg-white border-2 border-grey-light mx-auto rounded-full text-lg text-dark flex items-center">
                                <span className="text-grey-darker text-center w-full">4</span>
                            </div>))
                    }
                </div>
                <div className="flex-1">
                </div>
            </div>
            <div className="flex text-xs content-center text-center">
                <div className="w-[100px]">
                    Ordering
                </div>
                <div className="w-[100px]">
                    Verified
                </div>
                <div className="w-[100px]">
                    Paid
                </div>
                <div className="w-[100px]">
                    Successfully order
                </div>
            </div>
        </div>
    )
}

export default TrackOrder;
