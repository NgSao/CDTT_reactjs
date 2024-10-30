import React, { useState, useEffect } from 'react';
import BannerService from './../../services/BannerService';

function BannerItem() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [banners, setBanners] = useState([]);

    const baseImageUrl = 'http://127.0.0.1:8000/images/banner/';
    useEffect(() => {
        (async () => {
            try {
                const result = await BannerService.getList();
                if (result.banners) {
                    setBanners(result.banners);
                }
            } catch (error) {
                console.error("Error fetching banners: ", error);
            }
        })();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [banners.length]);

    return (
        <div className="flex justify-center w-full md:w-full lg:w-full sm:w-full mb-4">
            {banners.length > 0 && (
                <img
                    src={`${baseImageUrl}${banners[currentImageIndex].image}`} // Combine base URL and image field
                    alt={`Banner ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                />
            )}
        </div>
    );
}

export default BannerItem;
