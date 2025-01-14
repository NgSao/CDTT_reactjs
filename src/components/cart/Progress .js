import React from 'react';
import { MdOutlinePayment } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";

function Progress({ step }) {
    const getProgressWidth = (currentStep) => {
        return step >= currentStep ? '100%' : '0%';
    };
    return (
        <div className="max-w-xl mx-auto mt-8 pb-4">
            <div className="flex pb-3">
                <div className="flex-1"></div>
                <div className="flex-1">
                    <div className="w-10 h-10 mx-auto flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10 text-red-700">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </div>
                </div>

                <div className="w-1/6 flex items-center">
                    <div className="w-full bg-gray-300 rounded">
                        <div className="bg-red-700 text-xs py-1 rounded" style={{ width: getProgressWidth(1) }}></div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="w-10 h-10 mx-auto flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-red-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>
                </div>

                <div className="w-1/6 flex items-center">
                    <div className="w-full bg-gray-300 rounded">
                        <div className="bg-red-700 text-xs py-1 rounded" style={{ width: getProgressWidth(2) }}></div>
                    </div>
                </div>


                <div className="flex-1">
                    <div className="w-10 h-10 mx-auto flex items-center justify-center">
                        <MdOutlinePayment className="size-10 text-red-700" />

                    </div>
                </div>


                <div className="w-1/6 flex items-center">
                    <div className="w-full bg-gray-300 rounded">
                        <div className="bg-red-700 text-xs py-1 rounded" style={{ width: getProgressWidth(3) }}></div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="w-10 h-10 mx-auto flex items-center justify-center">
                        <FaRegCheckCircle className="size-10 text-red-700" />
                    </div>
                </div>

                <div className="flex-1"></div>
            </div>

            <div className="flex text-xs text-center space-x-5">
                <div className="w-1/4 text-sm text-red-700">Kiểm tra giỏ hàng</div>
                <div className="w-1/4 text-sm text-red-700">Thông tin mua hàng</div>
                <div className="w-1/4 text-sm text-red-700">Hình thức thanh toán</div>
                <div className="w-1/4 text-sm text-red-700">Đặt hàng thành công</div>
            </div>
        </div>
    );
}

export default Progress;
