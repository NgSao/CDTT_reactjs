import React, { useEffect, useState } from 'react'
import ProductReview from './../components/detail/ProductReview';
import ProductItem from './../components/product/ProductItem';
import ProductColor from './../components/detail/ProductColor';
import ProductSize from './../components/detail/ProductSize';
import { useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';
import { ImageApi } from './../services/ApiImage';
import { formatCurrency } from './../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './../reducer/CartReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Detail() {
    const { id } = useParams();
    console.log("id", id);
    const [product, setProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const fetchProduct = async () => {
        try {
            const response = await ProductService.show(id);
            setProduct(response.product[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchProductRelated = async () => {
        try {
            const response = await ProductService.product_related(id);
            setProducts(response.related_products);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProduct();
        fetchProductRelated();
    }, [id]);
    console.log("product", products);


    const [addedToCart, setAddedToCart] = useState(false);
    const dispatch = useDispatch();
    // const cart = useSelector((state) => state.cart.cart);
    // console.log("giỏ hàng", cart)


    const flag = true;
    const addItemToCart = async (item) => {
        setAddedToCart(true);
        if (flag) {
            dispatch(addToCart({
                ...item,
                quantity: item.qty
            }));
        } else {
            toast.error("Sản phẩm hết hàng! Vui lòng thử lại sau");
        }

        toast.success(`Đã thêm sản phẩm vào giỏ hàng!`);
        setTimeout(() => {
            setAddedToCart(false);
        }, 30000);
    };



    if (!product) {
        return <div>Loading...</div>;
    }
    return (
        <div >
            <div className='bg-gray-200 border-b-2 border-gray-300'>
                <div className='container mx-auto p-3 '>
                    <span>Trang chủ / </span>
                    <span>{product.name} </span>
                </div>
            </div>
            <ToastContainer />
            <div className='container mx-auto mt-5 flex flex-row '>
                <div className="basis-5/12 ">
                    <div className='flex flex-col justify-center items-center relative  overflow-hidden'>
                        {product.product_images && product.product_images.length > 0 && (
                            <img
                                src={`${ImageApi}/images/product/${product.product_images[0].thumbnail}`}
                                alt={product.name}
                                className='w-full'
                            />
                        )}
                        <div className='flex flex-row justify-center items-center cursor-pointer'>
                            {product.product_images?.map((image, index) => (
                                <div key={index} className='basis-20 overflow-hidden border-2 rounded-xl mx-3'>
                                    <img
                                        src={`${ImageApi}/images/product/${image.thumbnail}`}
                                        alt={`product image ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
                <div className="basis-5/12">
                    <div className='border-b-2 pb-10'>
                        <div className='text-2xl font-semibold'>{product.name}</div>
                        {/* <div className='mt-2 flex flex-row'>
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
                        </div> */}
                        <div className='mt-3 '>
                            <span className='text-2xl text-red-700 mr-10'>{formatCurrency(product.pricebuy)}</span>
                            {/* <span className='text-xl line-through'>19,090,000đ</span> */}
                        </div>
                        <div className='mt-3'>{product.content}</div>


                    </div>
                    {/* <div className='mt-3 mb-3'>
                        <div>Giá bán</div>
                        <span className='text-xl text-red-700 mr-5'>19,090,000đ</span>
                        <span className='line-through'>19,090,000đ</span>
                    </div>
                    <ProductSize />
                    <div className='mt-3 mb-3'>
                        <div className=' mb-3'>Màu sắc</div>
                        <ProductColor />

                    </div> */}
                    <div className="grid grid-cols-3 gap-10">
                        <div className='col-span-2 relative overflow-hidden cursor-pointer group'>
                            <div className='bg-red-700 my-5  h-16 rounded-xl hover:bg-black transition-transform transform  group-hover:-translate-y-1 group-hover:duration-700 ease-in-out'>
                                <div className='text-2xl font-bold text-white text-center p-5'>
                                    MUA NGAY
                                </div>
                            </div>
                        </div>

                        <div className='elative overflow-hidden cursor-pointer group'>
                            <div className='flex flex-col justify-center items-center h-16 my-5 border-2 border-red-700 rounded-xl hover:bg-red-700 transition-transform transform  group-hover:-translate-y-1 group-hover:duration-700 ease-in-out'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 text-red-700 group-hover:text-white">
                                        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                                    </svg>
                                </div>

                                <div onClick={() => addItemToCart(product)} className='text-base text-red-700 text-center group-hover:text-white'>
                                    {addedToCart ? (
                                        <p>Đã thêm giỏ hàng</p>
                                    ) : (
                                        <p>Thêm vào giỏ hàng</p>

                                    )}
                                </div>

                            </div>
                        </div>
                    </div>


                </div>
                <div className="basis-2/12 ml-10">
                    <div className='border-2 border-red-700 rounded-lg flex flex-col h-auto items-center p-5'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-16 text-red-700">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                        </svg>
                        <div className='text-red-700 text-base font-bold border-b-2 pb-4 border-black'>BẢO HÀNH CHÍNH HẢNG</div>
                        <div className='mt-5'>
                            <div className='flex flex-row mb-1'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                </div>
                                <span> Máy mới fullbox 100%</span>
                            </div>
                            <div className='flex flex-row mb-1'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                </div>
                                <span>Bảo hành chính hãng 12 tháng</span>
                            </div>

                            <div className='flex flex-row mb-1'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                </div>
                                <span>Được hỗ trợ 1 đổi 1 trong 30 ngày nếu có lỗi từ nhà sản xuất</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>



            <div className='container mx-auto mt-10 border-t-2 pt-5'>

                <ProductReview />
            </div>
            <div className='container mx-auto mt-10 border-t-2 pt-5 border-gray-400'>
                <div className='flex flex-row justify-between items-center mb-7'>
                    <div className='text-2xl font-medium '>Người dùng thường mua kèm</div>
                    <div className='flex flex-row items-center space-x-4'>
                        <div className='border-2 p-1 border-gray-500 cursor-pointer hover:border-red-700 group'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 group-hover:text-red-700">
                                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                            </svg>

                        </div>
                        <div className='border-2 p-1 border-gray-500 cursor-pointer hover:border-red-700 group'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5 group-hover:text-red-700">
                                <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                            </svg>
                        </div>

                    </div>
                </div>


                {/* Sản phẩm liên quan */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 items-center">
                    {products && products.length > 0 && products.map((product, index) => {
                        return (
                            <div key={index} className='border-2 border-gray-200 rounded-lg relative pb-4 bg-white cursor-pointer'>
                                <div className="flex flex-col items-center relative overflow-hidden ">
                                    <div className="relative w-52 pt-6 overflow-hidden group">
                                        <img src={`${product.thumbnail}`}
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
            </div>

        </div>
    )
}

export default Detail