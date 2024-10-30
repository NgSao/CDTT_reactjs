import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductService from './../../services/ProductService';
import { ImageApi } from './../../services/ApiImage';

function HomeTopSelling() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        (async () => {
            const limit = 5;
            const result = await ProductService.product_bestseller(limit);
            setItems(result.products);
        })();
    }, []);
    return (
        <div className='mt-10 mb-10'>
            <div className='flex flex-row justify-between items-center mb-4 bg-red-700 p-3 rounded-xl'>
                <div className='text-xl font-bold text-white cursor-pointer'>
                    Sản phẩm bán chạy
                </div>
                <div className="flex flex-row  cursor-pointer">
                    <div className='text-base text-white'>
                        Tất cả sản phẩm
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-white">
                        <path fillRule="evenodd" d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                    </svg>
                </div>

            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-5">

                {items && items.length > 0 && items.map((item, index) => {
                    return (
                        <Link to='/detail'>
                            <div key={index} className='border-2 border-gray-200 rounded-lg relative pb-4 bg-white cursor-pointer'>
                                <div className="flex flex-col items-center relative overflow-hidden ">
                                    <div className="flex flex-row justify-between items-center w-full p-2 absolute z-10">
                                        {/* <div className="bg-red-700 rounded-lg text-white p-1 px-2">
                                            -23%
                                        </div> */}
                                        <img src='https://minhtuanmobile.com/assets/front/img/apple-authorized-reseller.png' className='w-20' />
                                    </div>

                                    <div className="relative w-52 pt-6 overflow-hidden group">
                                        <img
                                            src={`${ImageApi}/images/product/${item.product_images[0]?.thumbnail}`}
                                            alt={item.name}
                                            className="transition-all w-full group-hover:scale-110 group-hover:duration-700 ease-in-out"
                                        />
                                    </div>


                                </div>
                                <div className="mx-3">
                                    <div className="text-base font-bold hover:text-red-700">{item.name}</div>
                                    <div className='flex flex-row justify-between mt-2'>
                                        <div className='text-base font-bold text-red-700'>{item.pricesale || item.pricebuy}đ</div>
                                        <div className='text-base font-medium line-through'>{item.pricebuy}đ</div>
                                    </div>
                                    <div className='mt-2 flex flex-row'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-500">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-500">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-500">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-500">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default HomeTopSelling
