import React from 'react';
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { incementQuantity, decrementQuantity, removeFromCart } from './../../reducer/CartReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatCurrency } from './../../utils/utils';
import { ImageApi } from '../../services/ApiImage';

function CartItem() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    console.log("Cartne", cart);
    const total = cart.reduce((curr, item) => curr + (item.pricebuy * item.quantity), 0);
    const flag = true;
    const navigate = useNavigate();

    const increaseQuantity = (item) => {
        if (flag) {
            dispatch(incementQuantity(item));
        } else {
            toast.error("Sản phẩm hết hàng");
        }
    };

    const decreaseQuantity = (item) => {
        if (item.quantity > 0) {
            dispatch(decrementQuantity(item));
        } else {
            toast.error("Số lượng không thể giảm xuống dưới 0!");
        }
    };

    const deleteItem = (item) => {
        dispatch(removeFromCart(item));
        toast.success("Sản phẩm đã được xóa khỏi giỏ hàng!");
    };

    const handleProductClick = (productId) => {
        navigate(`/detail/${productId}`);
    };

    return (
        <div className='flex flex-col'>
            <ToastContainer />

            {cart.length === 0 ? (
                <p className='text-lg'>Giỏ hàng của bạn trống!</p>
            ) : (
                <>
                    <p className='text-xl mb-5'>Đơn hàng của bạn</p>

                    {cart.map((product, index) => (
                        <div key={index} className='flex flex-row border-gray-300 border-2 rounded-2xl p-2 justify-between mb-8'>
                            <div onClick={() => handleProductClick(product.id)} className='flex flex-row'>
                                <div className='w-28 h-auto overflow-hidden cursor-pointer'>
                                    <img src={`${ImageApi}/images/product/${product.product_images[0].thumbnail}`} alt='Product' />
                                </div>
                                <div className='flex flex-col ml-2'>
                                    <p className='text-base font-semibold mb-3'>{product.name}</p>
                                    <div className='mt-5'>
                                        <span className='font-medium text-red-700'>{formatCurrency(product.pricebuy)} </span>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col justify-between items-end'>
                                <div className='border-2 rounded-lg p-2 group hover:bg-red-700 cursor-pointer' onClick={() => deleteItem(product)}>
                                    <FaTrash className='group-hover:text-white' />
                                </div>
                                <div className='border-2 rounded-full p-2'>
                                    <div className='flex flex-row justify-center items-center cursor-pointer'>
                                        <div onClick={() => decreaseQuantity(product)}>
                                            <FaMinus />

                                        </div>
                                        <input type='number' className='ml-2 w-16 h-full text-center' value={product.quantity} readOnly />
                                        <div onClick={() => increaseQuantity(product)}>
                                            <FaPlus />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}

            <div className='flex flex-row justify-between items-center'>
                <p className='text-lg'>Tạm tính</p>
                <p className='text-xl text-red-700 font-medium'>{formatCurrency(total)}</p>
            </div>
            <Link to='/cart/customer'>
                <button type="button"
                    className="!mt-4 w-full py-3 mx-auto block text-lg bg-red-700 rounded-lg text-white font-bold hover:bg-red-950">MUA HÀNG</button>
            </Link>
        </div>
    );
}

export default CartItem;
