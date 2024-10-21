/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-21 13:52:53
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-21 14:02:43
 * @Description: 横向循环焦点图片展示
 */
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { map } from 'lodash-es';
import { FC } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper/types';

import { getRandomImg } from '@/utils';

const VisualSwiper: FC = () => {
  const imgs = getRandomImg(20) as string[];

  // 事件将在Swiper进度更改时激发，作为参数，它接收的进度始终从0到1
  const onProgress = (swiper: SwiperClass) => {
    for (let i = 0; i < swiper.slides.length; i += 1) {
      const slide = swiper.slides[i];
      const slideProgress = slide.progress;
      let modify = 1;
      if (Math.abs(slideProgress) > 1) {
        modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
      }
      const translate = `${slideProgress * modify * 260}px`;
      const scale = 1 - Math.abs(slideProgress) / 5;
      const zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
      slide.style.transform = `translateX(${translate}) scale(${scale})`;
      slide.style.zIndex = `${zIndex}`;
      slide.style.opacity = '1';
      if (Math.abs(slideProgress) > 3) {
        slide.style.opacity = '0';
      }
    }
  };

  // 事件将在每次swiper启动动画时触发。接收当前转换持续时间（以ms为单位）作为参数
  const setTransition = (swiper: SwiperClass, transition: number) => {
    for (let i = 0; i < swiper.slides.length; i += 1) {
      const slide = swiper.slides[i];
      slide.style.transition = `${transition}ms`;
    }
  };
  return (
    <Swiper
      watchSlidesProgress
      slidesPerView="auto"
      centeredSlides
      loop
      loopAdditionalSlides={5}
      autoplay
      navigation
      modules={[Navigation, Autoplay, Pagination]}
      pagination={{
        clickable: true,
      }}
      onProgress={onProgress}
      onSetTransition={setTransition}
      style={{
        paddingBottom: 40,
      }}
    >
      {
        map(imgs, (src: string) => (
          <SwiperSlide key={src} style={{ width: 600, height: 450 }}>
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
  )
}
export default VisualSwiper;