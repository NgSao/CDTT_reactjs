import React, { useState, useEffect } from 'react';
import ProductItemHot from './../product/ProductItemHot';
import ProductService from './../../services/ProductService';

function HomeHotDeal() {
    const [items, setItems] = useState([]);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        (async () => {
            const limit = 4;
            const result = await ProductService.product_sale(limit);
            setItems(result.products);

            if (result.products.length > 0 && result.products[0].dateend) {
                const endDate = new Date(result.products[0].dateend).getTime();
                startCountdown(endDate);
            }
        })();
    }, []);

    const startCountdown = (endDate) => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = endDate - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    };

    return (
        <div className="container mx-auto my-5">
            <div className="flex flex-row">
                <div className="basis-3/12 p-5 pb-28 border-2 border-gray-100">
                    <div className="text-2xl font-medium">Tri ân vàng</div>
                    <div className="text-xl">Nồng nàn yêu thương</div>
                    <div className="mt-5 flex flex-row">
                        <div className="bg-red-600 rounded-md p-3 flex flex-col items-center mr-4 w-16 overflow-hidden">
                            <div className="text-lg font-bold text-red-50">{timeLeft.days}</div>
                            <div className="text-base text-red-50">Ngày</div>
                        </div>
                        <div className="bg-red-600 rounded-md p-3 flex flex-col items-center mr-4 w-16 overflow-hidden">
                            <div className="text-lg font-bold text-red-50">{timeLeft.hours}</div>
                            <div className="text-base text-red-50">Giờ</div>
                        </div>
                        <div className="bg-red-600 rounded-md p-3 flex flex-col items-center mr-4 w-16 overflow-hidden">
                            <div className="text-lg font-bold text-red-50">{timeLeft.minutes}</div>
                            <div className="text-base text-red-50">Phút</div>
                        </div>
                        <div className="bg-red-600 rounded-md p-3 flex flex-col items-center mr-4 w-16 overflow-hidden">
                            <div className="text-lg font-bold text-red-50">{timeLeft.seconds}</div>
                            <div className="text-base text-red-50">Giây</div>
                        </div>
                    </div>
                </div>

                <div className="basis-9/12 pb-2 border-gray-100">
                    <ProductItemHot items={items} />
                </div>
            </div>
        </div>
    );
}

export default HomeHotDeal;
