"use client";

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from 'next/image';

function Slider({ imageList }) {
  console.log(imageList);

  return (
    <div>
      {imageList ? (
        <Carousel>
          <CarouselContent>
            {imageList.map((item, index) => (
              <CarouselItem key={item.id || index} className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
                <Image
                  src={item.url}
                  alt="image"
                  fill  // ✅ Usar fill, NO width/height fijos
                  className="object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className='w-full aspect-[16/9] bg-slate-200 animate-pulse rounded-lg'></div>
      )}
    </div>
  );
}

export default Slider;
