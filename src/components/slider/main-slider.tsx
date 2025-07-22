"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

const MainSlider = () => {
  const images = [
    "https://www.stanleyblackanddecker.com/sites/default/files/styles/dojo_16_9_ratio/public/2022-05/dewalt_tool.webp?h=d1cb525d&itok=h1B0QIlL",
    "https://www.stanleyblackanddecker.com/sites/default/files/styles/dojo_16_9_ratio/public/2025-03/sbd_ar24_0124.webp?h=d1cb525d&itok=t4UZCZhA",
    "https://www.stanleyblackanddecker.com/sites/default/files/styles/dojo_16_9_ratio/public/2022-06/13aqa1tla10_xt1lt50_env_2_1920x1080.webp?h=d1cb525d&itok=IeizxUnH",
    "https://www.stanleyblackanddecker.com/sites/default/files/styles/dojo_16_9_ratio/public/2022-06/home-hero-innovation.webp?h=d1cb525d&itok=HnS4iCqP",
    "https://www.stanleyblackanddecker.com/sites/default/files/styles/dojo_16_9_ratio/public/2025-01/gtt_2025_1920x1080_0.webp?h=d1cb525d&itok=6PGUgP92"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden rounded-2xl shadow-sm">
      <div className="relative h-120">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              unoptimized // Since these are external images
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MainSlider;