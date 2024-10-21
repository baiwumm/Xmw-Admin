/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-21 09:47:16
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-21 10:01:24
 * @Description: 方块
 */
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

import { map } from 'lodash-es';
import { FC } from 'react';
import { EffectCube, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getRandomImg } from '@/utils';

const CubeSwiper: FC = () => {
  const imgs = getRandomImg(8) as string[];
  return (
    <Swiper
      effect="cube"
      grabCursor
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      loop
      pagination={{
        clickable: true,
      }}
      modules={[EffectCube, Pagination]}
      style={{
        width: 320,
        height: 320,
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
export default CubeSwiper;
