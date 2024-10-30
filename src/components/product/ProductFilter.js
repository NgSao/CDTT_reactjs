


import React, { useEffect, useState } from 'react';
import CategoryService from './../../services/CategoryService';
import BrandService from './../../services/BrandService';
import ProductService from '../../services/ProductService';
import { ImageApi } from './../../services/ApiImage';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from './../../utils/utils';

function ProductFilter() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedBrandId, setSelectedBrandId] = useState(null);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [flag, setFlag] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCategoriesAndBrands = async () => {
            const categoryResult = await CategoryService.getList();
            setCategories(categoryResult.categorys);

            const brandResult = await BrandService.getList();
            setBrands(brandResult.brands);
        };

        fetchCategoriesAndBrands();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            let productResult;
            if (!selectedCategoryId && !selectedBrandId && !priceRange.min && !priceRange.max) {
                productResult = await ProductService.getList();
                setFlag(true);

            } else {
                productResult = await ProductService.product_all(selectedCategoryId, selectedBrandId, priceRange.min, priceRange.max);
                setFlag(false);

            }

            setProducts(productResult.products);
        };
        fetchProducts();
    }, [selectedCategoryId, selectedBrandId, priceRange]);

    const handleCategoryChange = (id) => {
        setSelectedCategoryId(id === selectedCategoryId ? null : id);
    };

    const handleBrandChange = (id) => {
        setSelectedBrandId(id === selectedBrandId ? null : id);
    };

    const handlePriceChange = (e) => {
        setPriceRange({
            ...priceRange,
            [e.target.name]: e.target.value,
        });
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(products.length / productsPerPage);
    const handleProductClick = (productId) => {
        navigate(`/detail/${productId}`);
    };
    return (
        <div>
            <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
                <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden hidden md:block">
                    <div className="divide-y divide-gray-200 space-y-5">
                        <div>
                            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Danh mục</h3>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <div key={category.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategoryId === category.id}
                                            onChange={() => handleCategoryChange(category.id)}
                                            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                        />
                                        <label className="text-gray-600 ml-3 cursor-pointer">
                                            {category.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4">
                            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Thương hiệu</h3>
                            <div className="space-y-2">
                                {brands.map((brand) => (
                                    <div key={brand.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedBrandId === brand.id}
                                            onChange={() => handleBrandChange(brand.id)}
                                            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                        />
                                        <label className="text-gray-600 ml-3 cursor-pointer">
                                            {brand.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4">
                            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Giá</h3>
                            <div className="mt-4 flex items-center">
                                <input
                                    type="text"
                                    name="min"
                                    value={priceRange.min}
                                    onChange={handlePriceChange}
                                    className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                                    placeholder="Giá nhỏ"
                                />
                                <span className="mx-3 text-gray-500">-</span>
                                <input
                                    type="text"
                                    name="max"
                                    value={priceRange.max}
                                    onChange={handlePriceChange}
                                    className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                                    placeholder="Giá lớn"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 items-center">
                        {currentProducts.length > 0 ? currentProducts.map((product, index) => (
                            <div key={index} onClick={() => handleProductClick(product.id)} className='border-2 border-gray-200 rounded-lg relative pb-4 bg-white cursor-pointer'>
                                <div className="flex flex-col items-center relative overflow-hidden">
                                    <div className="relative w-52 pt-6 overflow-hidden group">
                                        {flag ? (
                                            <img src={`${ImageApi}/images/product/${product.image}`} className="transition-all w-full group-hover:scale-110 group-hover:duration-700 ease-in-out" />

                                        ) : (
                                            <img src={`${ImageApi}/images/product/${product.product_images[0].thumbnail}`} className="transition-all w-full group-hover:scale-110 group-hover:duration-700 ease-in-out" />

                                        )}

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
                        )) : (
                            <div className="col-span-4 text-center">Không có sản phẩm nào phù hợp.</div>
                        )}
                    </div>
                    <div className="flex justify-center mt-6">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={`mx-1 px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-red-700 text-white' : 'bg-white text-black'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductFilter;
