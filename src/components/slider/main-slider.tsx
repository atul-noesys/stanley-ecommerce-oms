"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
// import { observer } from 'mobx-react-lite';
import { useStore } from '@/store/store-context';
import Link from 'next/link';

const images = [
  {
    url: "https://www.stanleyblackanddecker.com/sites/default/files/styles/dojo_16_9_ratio/public/2022-05/dewalt_tool.webp?h=d1cb525d&itok=h1B0QIlL",
    title: "Premium Tools Collection",
    subtitle: "Professional grade for all your projects",
    buttonText: "Shop Now"
  },
  {
    url: "https://www.stanleyblackanddecker.com/sites/default/files/styles/dojo_16_9_ratio/public/2025-03/sbd_ar24_0124.webp?h=d1cb525d&itok=t4UZCZhA",
    title: "Innovative Solutions",
    subtitle: "Cutting-edge technology for modern needs",
    buttonText: "Explore"
  },
  {
    url: "https://www.stanleyblackanddecker.com/sites/default/files/styles/dojo_16_9_ratio/public/2022-06/13aqa1tla10_xt1lt50_env_2_1920x1080.webp?h=d1cb525d&itok=IeizxUnH",
    title: "Durable Equipment",
    subtitle: "Built to last in any environment",
    buttonText: "View Products"
  },
  {
    url: "https://www.stanleyblackanddecker.com/sites/default/files/styles/dojo_16_9_ratio/public/2022-06/home-hero-innovation.webp?h=d1cb525d&itok=HnS4iCqP",
    title: "Creative Possibilities",
    subtitle: "Unlock your potential with our tools",
    buttonText: "Get Inspired"
  },
  {
    url: "https://www.stanleyblackanddecker.com/sites/default/files/styles/dojo_16_9_ratio/public/2025-01/gtt_2025_1920x1080_0.webp?h=d1cb525d&itok=6PGUgP92",
    title: "Special Offers",
    subtitle: "Limited time deals on top products",
    buttonText: "See Offers"
  }
];

const images1 = [
  {
    url: "https://www.stanleyblackanddecker.com/sites/default/files/styles/half_spotlight/public/2022-05/u2mvfewfs0digcmd.jpeg?h=56d0ca2e&itok=uuJFeMGd",
    title: "Exclusive Hand Tools Collection",
    subtitle: "Well crafted as per your need",
    buttonText: "Promotions"
  },
  {
    url: "https://www.stanleyblackanddecker.com/sites/default/files/styles/half_spotlight/public/2022-05/drupal_medium-cm_v-seriesmechtoolsfamilyshot_g1.jpeg?h=06ac0d8c&itok=GGilhFA7",
    title: "Professional Series",
    subtitle: "Tools designed for experts",
    buttonText: "Promotions"
  },
  {
    url: "https://www.stanleyblackanddecker.com/sites/default/files/styles/tall_hero/public/2022-05/cmxpgra216_a2_1920x630.jpg?h=05edbc0f&itok=JulSf2AC&quot",
    title: "Exclusive Workspace Collection",
    subtitle: "Engineered for performance",
    buttonText: "Promotions"
  },
  {
    url: "https://www.stanleyblackanddecker.com/sites/default/files/styles/half_spotlight/public/2022-05/u2mvfewfs0digcmd.jpeg?h=56d0ca2e&itok=uuJFeMGd",
    title: "Exclusive Collection",
    subtitle: "Only for special members",
    buttonText: "Promotions"
  },
  {
    url: "https://www.stanleyblackanddecker.com/sites/default/files/styles/half_spotlight/public/2022-05/drupal_medium-cm_v-seriesmechtoolsfamilyshot_g1.jpeg?h=06ac0d8c&itok=GGilhFA7",
    title: "Professional Series",
    subtitle: "Tools designed for experts",
    buttonText: "Promotions"
  },
];

const MainSlider = () => {
  const { productStore } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Use images1 when name is "Olivia Bennett", otherwise use images
  const activeImages = productStore.userInfo.name === "Olivia Bennett" ? images1 : images;

  // Reset to first slide when user changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [productStore.userInfo.name]);

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === activeImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [activeImages , productStore.userInfo.name]); // Re-create interval when activeImages changes

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? activeImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === activeImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden shadow-sm mb-20">
      <div className="relative h-[75vh]">
        {activeImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.url}
              alt={`Slide ${index + 1}`}
              fill
              className="relative object-cover brightness-75"
              unoptimized
            />
            
            {/* Text and Button Overlay */}
            {productStore.userInfo.name === "Olivia Bennett" || productStore.userInfo.name === "Ethan Carter" ?
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/30 p-4">
                <div className="w-full mx-auto">
                  <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-md">
                    Hi, {productStore.userInfo.name}
                  </p>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                    {image.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-md">
                    {image.subtitle}
                  </p>
                  <Link href={"/promotions"}>
                  <button className="bg-primary text-gray-900 hover:bg-yellow-600 px-8 py-2 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    {image.buttonText}
                  </button>
                  </Link>
                </div>
              </div>
              : null 
            }   
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition z-10"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition z-10"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {activeImages.map((_, index) => (
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