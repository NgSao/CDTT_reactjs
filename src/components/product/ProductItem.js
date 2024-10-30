import React, { useState } from 'react'
import { useEffect } from 'react';
import ProductService from '../../services/ProductService';
import { ImageApi } from './../../services/ApiImage';
import { formatCurrency } from './../../utils/utils';

function ProductItem({ categoryId, limit = 8 }) {


    const [products, setProducts] = useState([]);
    console.log("product", products);
    // useEffect(() => {
    //     (async () => {
    //         if (categoryId !== null) {
    //             const result = await ProductService.product_category(categoryId, limit);
    //             setProducts(result.products);
    //         } else {
    //             const result = await ProductService.products(limit);
    //             setProducts(result.products);
    //         }
    //     })();
    // }, [categoryId, limit]);


    useEffect(() => {
        (async () => {
            const result = await ProductService.products(limit);
            setProducts(result.products);

        })();
    }, []);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 items-center">
            {products && products.length > 0 && products.map((product, index) => {
                return (
                    <div key={index} className='border-2 border-gray-200 rounded-lg relative pb-4 bg-white cursor-pointer'>
                        <div className="flex flex-col items-center relative overflow-hidden ">
                            <div className="relative w-52 pt-6 overflow-hidden group">
                                <img src={`${ImageApi}/images/product/${product.image}`}
                                    className="transition-all w-full group-hover:scale-110 group-hover:duration-700 ease-in-out" />
                            </div>

                        </div>
                        <div className="mx-3">
                            <div className="text-base font-bold hover:text-red-700">{product.name}</div>
                            <div className='flex flex-row justify-between mt-2'>
                                <div className='text-base font-bold text-red-700'>{formatCurrency(product.pricebuy)}</div>
                                {/* <div className='text-base font-medium line-through'>{product.pricebuy}đ</div> */}
                            </div>

                        </div>
                    </div>
                )
            })}


        </div >
    )
}

export default ProductItem
