
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CategoryService from './../../services/CategoryService';
import { ImageApi } from './../../services/ApiImage';
function CategoryItem() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategory = async () => {
            const result = await CategoryService.getList();
            setCategories(result.categorys);
        };
        fetchCategory();
    }, []);
    return (
        <div className="bg-red-700 p-1">
            <div className="container mx-auto flex flex-row items-center">
                <ul className="flex flex-row py-2 cursor-pointer">
                    <li className="flex flex-row items-center relative mr-14 hover:duration-300 group">
                        <Link to='/products'>
                            <div className="text-base ml-1 text-white">Tất cả sản phẩm</div>
                        </Link>
                    </li>
                    {categories.map(category => (
                        <li key={category.id} className="flex flex-row items-center relative mr-14 hover:duration-300 group">
                            <img src={`${ImageApi}/images/category/${category.thumbnail}`} className="w-7 h-auto" />
                            {/* <Link to={`/products/category/${category.id}`}> */}
                            <div className="text-base ml-1 text-white">{category.name}</div>
                            {/* </Link> */}
                        </li>
                    ))}

                </ul>


            </div>

        </div>

    )
}

export default CategoryItem
