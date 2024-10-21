/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-21 11:13:43
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-21 11:26:10
 * @Description: 缩略图
 */
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { map } from 'lodash-es';
import { FC, useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper/types';

import { getRandomImg } from '@/utils';

const ThumbnailSwiper: FC = () => {
  const imgs = getRandomImg(20) as string[];
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

  const onThumbsSwiper = (swiper: SwiperClass) => {
    setThumbsSwiper(swiper)
  };
  return (
    <div style={{ height: 320 }}>
      <Swiper
        loop
        spaceBetween={10}
        navigation
        modules={[FreeMode, Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        style={{
          width: '100%',
          height: '80%',
        }}
      >
        {
          map(imgs, (src: string) => (
            <SwiperSlide key={src}>
              <img
                src={src}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }} />
            </SwiperSlide>
          ))
        }
      </Swiper>
      {/* 缩略图 */}
      <Swiper
        loop
        spaceBetween={10}
        slidesPerView={5}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumbs-swiper"
        onSwiper={onThumbsSwiper}
        style={{
          height: '20%',
          paddingTop: 10,
        }}
      >
        {
          map(imgs, (src: string) => (
            <SwiperSlide key={src}>
              <img
                src={src}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}
export default ThumbnailSwiper;