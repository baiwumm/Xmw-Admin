/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-21 11:08:12
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-21 11:12:34
 * @Description: 3d 流翻转
 */
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { map } from 'lodash-es';
import { FC } from 'react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getRandomImg } from '@/utils';

const CoverflowSwiper: FC = () => {
  const imgs = getRandomImg(8) as string[];
  return (
    <Swiper
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      loop
      pagination={{
        clickable: true,
      }}
      modules={[EffectCoverflow, Pagination]}
    >
      {
        map(imgs, (src: string) => (
          <SwiperSlide key={src} style={{
            width: 320,
            height: 320,
          }}>
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
export default CoverflowSwiper;