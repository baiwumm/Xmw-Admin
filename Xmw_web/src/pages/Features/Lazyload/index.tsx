/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-16 17:58:16
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-17 11:31:43
 * @Description: 懒加载
 */
import 'react-lazy-load-image-component/src/effects/blur.css';

import { PageContainer, PageHeader, ProCard } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max';
import { Button, Skeleton, Typography } from 'antd';
import { map } from 'lodash-es';
import { FC, MutableRefObject, useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { formatPerfix, getRandomImg } from '@/utils';
import { ROUTES } from '@/utils/enums'

const { Title } = Typography;

const Lazyload: FC = () => {
  const { formatMessage } = useIntl(); // 国际化工具
  const scrollRef = useRef() as MutableRefObject<HTMLImageElement>;
  // 国际化
  const renderMessage = (field: string) => formatMessage({ id: formatPerfix(ROUTES.LAZYLOAD, field) });
  return (
    <PageContainer header={{ title: null }}>
      <ProCard
        title={
          (
            <Title level={4}>{formatMessage({ id: formatPerfix(ROUTES.LAZYLOAD, '', true) })}</Title>
          )
        }
        bodyStyle={{ padding: '10px 10px 20px 10px' }}
        extra={(
          <Button
            type="primary"
            href="https://github.com/Aljullu/react-lazy-load-image-component"
            target="_blank"
          >
            react-lazy-load-image-component
          </Button>
        )}
      >
        <PageHeader >
          {renderMessage('subTitle')}
        </PageHeader>
      </ProCard>
      <div
        ref={scrollRef}
        style={{
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          marginTop: 20,
        }}>
        {map([...getRandomImg(20), ...getRandomImg(20)], (src: string, index: number) => (
          <LazyLoadImage
            key={`${src}${index}`}
            effect="blur"
            placeholder={<Skeleton.Image active />}
            src={src}
            threshold={0}
            height={250}
            width='100%'
            style={{
              borderRadius: 8,
              objectFit: 'cover',
            }}
            wrapperProps={{
              style: { transitionDelay: '.25s' },
            }}
          />
        ))}
      </div>
    </PageContainer>
  )
}
export default Lazyload;
