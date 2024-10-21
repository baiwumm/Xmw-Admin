/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-21 09:16:00
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-21 13:58:22
 * @Description: Swiper
 */
import 'swiper/css';
import './index.less'

import { PageContainer } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max';
import { Card, Col, Row } from 'antd';
import { map } from 'lodash-es';
import { FC } from 'react';
import type { CreativeEffectOptions } from 'swiper/types';

import { formatPerfix } from '@/utils';
import { ROUTES } from '@/utils/enums'

import CardsSwiper from './components/CardsSwiper'; // 卡片特效
import CoverflowSwiper from './components/CoverflowSwiper'; // 3d 流翻转
import CreativeSwiper from './components/CreativeSwiper'; // 创意效果
import CubeSwiper from './components/CubeSwiper'; // 方块
import FlipSwiper from './components/FlipSwiper'; // 翻转
import ThumbnailSwiper from './components/ThumbnailSwiper'; // 缩略图
import VisualSwiper from './components/VisualSwiper'; // 横向循环焦点图片展示

const Swiper: FC = () => {
  const { formatMessage } = useIntl(); // 国际化工具

  // 国际化
  const renderMessage = (field: string) => formatMessage({ id: formatPerfix(ROUTES.SWIPER, field) });

  const creativeEffectOptions: CreativeEffectOptions[] = [
    {
      prev: {
        shadow: true,
        translate: [0, 0, -400],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    },
    {
      prev: {
        shadow: true,
        translate: ['-120%', 0, -500],
      },
      next: {
        shadow: true,
        translate: ['120%', 0, -500],
      },
    },
    {
      prev: {
        shadow: true,
        translate: ['-20%', 0, -1],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    },
    {
      prev: {
        shadow: true,
        translate: [0, 0, -800],
        rotate: [180, 0, 0],
      },
      next: {
        shadow: true,
        translate: [0, 0, -800],
        rotate: [-180, 0, 0],
      },
    },
    {
      prev: {
        shadow: true,
        translate: ['-125%', 0, -800],
        rotate: [0, 0, -90],
      },
      next: {
        shadow: true,
        translate: ['125%', 0, -800],
        rotate: [0, 0, 90],
      },
    },
    {
      prev: {
        shadow: true,
        origin: 'left center',
        translate: ['-5%', 0, -200],
        rotate: [0, 100, 0],
      },
      next: {
        origin: 'right center',
        translate: ['5%', 0, -200],
        rotate: [0, -100, 0],
      },
    },
  ];
  return (
    <PageContainer header={{ title: null }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Card bordered={false} title={renderMessage('cube')}>
            <CubeSwiper />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Card bordered={false} title={renderMessage('flip')}>
            <FlipSwiper />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Card bordered={false} title={renderMessage('card')}>
            <CardsSwiper />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card bordered={false} title={renderMessage('coverFlow')}>
            <CoverflowSwiper />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card bordered={false} title={renderMessage('thumbnail')}>
            <ThumbnailSwiper />
          </Card>
        </Col>
        <Col span={24}>
          <Card bordered={false} title={renderMessage('creative')}>
            {map(creativeEffectOptions, (option: CreativeEffectOptions, index: number) => (
              <Card.Grid key={index} hoverable={false}>
                <CreativeSwiper creativeEffect={option} />
              </Card.Grid>
            ))}
          </Card>
        </Col>
        <Col span={24}>
          <Card bordered={false} title={renderMessage('visual')}>
            <VisualSwiper />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  )
}
export default Swiper;