import React, { useState, useEffect } from 'react';
import BrandService from '../../../services/BrandService';

function BrandAdd({ isBrandAdd, setBrandAdd, fetchBrands }) {
    const [brand, setBrand] = useState({
        name: '',
        slug: '',
        description: '',
        thumbnail: null,
        sort_order: '1',
    });
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBrand({
            ...brand,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setBrand({
            ...brand,
            thumbnail: file,
        });

        // Tạo URL của ảnh để hiển thị trước
        setImagePreview(file ? URL.createObjectURL(file) : null);
    };

    const handleAddBrand = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', brand.name);
        formData.append('slug', brand.slug);
        formData.append('description', brand.description);
        if (brand.thumbnail) {
            formData.append('thumbnail', brand.thumbnail);
        }
        formData.append('sort_order', brand.sort_order);

        try {
            await BrandService.store(formData);
            setBrandAdd(false);
            fetchBrands();
            setBrand({
                name: '',
                slug: '',
                description: '',
                thumbnail: null,
                sort_order: '1',
            });
            setImagePreview(null); // Reset lại hình ảnh preview
        } catch (error) {
            setError('Có lỗi xảy ra khi thêm thương hiệu');
        }
    };

    useEffect(() => {
        if (!isBrandAdd) return;
    }, [isBrandAdd]);

    return (
        <div>
            <div className={`fixed inset-0 bg-gray-900 opacity-80 ${isBrandAdd ? 'block' : 'hidden'} transition-opacity`} aria-hidden="true"></div>
            <div className={`fixed top-0 right-0 z-40 w-full h-screen max-w-xs p-4 overflow-y-auto transition-transform ${isBrandAdd ? 'translate-x-0' : 'translate-x-full'} bg-white dark:bg-gray-800`} tabIndex={-1} aria-labelledby="drawer-label">
                <h5 className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">New Brand</h5>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <button onClick={() => setBrandAdd(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <form onSubmit={handleAddBrand} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên thương hiệu</label>
                        <input
                            value={brand.name}
                            onChange={handleInputChange}
                            type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Tên thương hiệu" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug</label>
                        <input
                            value={brand.slug}
                            onChange={handleInputChange}
                            type="text" name="slug" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Tên slug" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn ảnh</label>
                        <input
                            type="file"
                            name="image"
                            accept="images/brand/*"
                            onChange={handleFileChange} className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer p-2.5 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                        {imagePreview && (
                            <div className="mt-4">
                                <img src={imagePreview} alt="Brand Preview" className="max-w-full h-auto rounded-lg shadow-md" />
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
                        <textarea
                            name="description"
                            value={brand.description}
                            onChange={handleInputChange} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Mô tả thương hiệu" />
                    </div>
                    <div className="bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute">
                        <button type="submit" className="text-white w-full justify-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Add Brand
                        </button>
                        <button onClick={() => setBrandAdd(false)} type="button" className="inline-flex w-full justify-center text-gray-500 items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                            <svg aria-hidden="true" className="w-5 h-5 -ml-1 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BrandAdd;
