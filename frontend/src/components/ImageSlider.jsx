import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const images = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1099&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const ImageSlider = () => {
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    })
    const prevSlide = () => {
        setCurrent((prev) => (prev == 0 ? images.length - 1 : prev - 1));
    };
    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % images.length)
    }
    return (
        <div className='relative w-full  shadow-lg overflow-hidden'>
            {/* slides */}
            <div className='flex  transition-transform duration-700 ease-in-out' style={{ transform: `translateX(-${current * 100}%)` }}>
                {images.map((image, index) => (
                    <img src={image} key={index} className='h-75 w-full md:h-112.5 object-cover shrink-0' />
                ))}
            </div>
            {/* previous */}
            <button onClick={prevSlide} className='absolute 
            bg-black/40 top-1/2 left-4 hover:bg-black/60 text-white p-2 rounded-full transition'>
                <ChevronLeft />
            </button >
            {/* next */}
            <button onClick={nextSlide} className='absolute bg-black/40 hover:bg-black/60 top-1/2 right-4 text-white p-2 rounded-full transition'>
                <ChevronRight />
            </button>

            <div className='absolute bottom-4 left-1/2 flex gap-2'>
                {images.map((_, index) => (
                    <button key={index} onClick={() => setCurrent(index)}
                        className={`h-2 rounded-full transition-all ${current === index ? "w-6 bg-white" : "w-2 bg-white/50"}`}
                    ></button>
                ))}
            </div>
        </div>
    )
}

export default ImageSlider