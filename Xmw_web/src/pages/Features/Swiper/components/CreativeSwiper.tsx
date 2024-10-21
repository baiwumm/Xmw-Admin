/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-21 13:44:36
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-21 13:44:54
 * @Description: 创意效果
 */
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';

import { map } from 'lodash-es';
import { FC } from 'react';
import { EffectCreative, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { CreativeEffectOptions } from 'swiper/types';

import { getRandomImg } from '@/utils';

type CreativeSwiperProps = {
  creativeEffect: CreativeEffectOptions;
}

const CreativeSwiper: FC<CreativeSwiperProps> = ({ creativeEffect = {} }) => {
  const imgs = getRandomImg(8) as string[];
  return (
    <Swiper
      effect="creative"
      grabCursor
      centeredSlides
      loop
      creativeEffect={creativeEffect}
      pagination={{
        clickable: true,
      }}
      modules={[EffectCreative, Pagination]}
      style={{
        width: 320,
        height: 240,
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
  )
}
export default CreativeSwiper;