import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../services/UserService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setErrorMessage('Vui lòng nhập tên đăng nhập và mật khẩu.');
            return;
        }

        try {
            const response = await UserService.login({ username, password });
            const token = response.token;
            const userId = response.user.id;
            const name = response.user.name;
            console.log(response)

            localStorage.setItem('authToken', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('name', name);
            window.location.href = '/';
        } catch (error) {
            setErrorMessage('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div>
            <div className='bg-gray-200 border-b-2 border-gray-300'>
                <div className='container mx-auto p-3'>
                    <span>Trang chủ / </span>
                    <span>Khách hàng thân thiết </span>
                </div>
            </div>
            <div className='container mx-auto mt-10'>
                <div className='flex-col flex gap-4 justify-center items-center mb-10'>
                    <img src='https://minhtuanmobile.com/assets/front/img/khthanthiet-no-user-tuoi-20.png' className='w-40' alt="Logo" />
                    <p className='text-2xl font-medium'>Đăng nhập <span>SN Mobile</span></p>
                </div>

                {errorMessage && (
                    <div className='bg-red-200 text-red-800 p-3 rounded mb-4 text-center'>
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6 font-[sans-serif] max-w-md mx-auto border-b-2 pb-6 border-gray-300">
                    <div>
                        <label htmlFor="username" className="block">Số điện thoại của bạn</label>
                        <input
                            id="username"
                            type="tel"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-2 px-4 py-3 bg-white border-gray-300 w-full text-sm outline-none focus:border-red-700 rounded border-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block">Mật khẩu</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="px-4 py-3 bg-white border-2 border-gray-300 w-full text-sm outline-none focus:border-red-700 rounded"
                        />
                    </div>

                    <div className="flex">
                        <input type="checkbox" className="w-4" />
                        <label className="text-sm ml-2">Ghi nhớ</label>
                    </div>

                    <button type="submit" className="!mt-4 w-full px-4 py-3 mx-auto block text-lg bg-red-700 rounded-lg text-white font-bold hover:bg-red-800">ĐĂNG NHẬP</button>
                </form>

                <div className='max-w-md mx-auto'>
                    <Link to='/register'>
                        <button type="button" className="!mt-4 px-4 py-3 w-full mx-auto block text-lg border-2 border-red-950 bg-white rounded-lg text-red-950 font-bold hover:bg-red-950 hover:text-white">ĐĂNG KÝ THÀNH VIÊN</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
