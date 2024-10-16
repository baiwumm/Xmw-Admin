/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-16 14:37:59
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-16 15:46:49
 * @Description: 图片预览
 */
import { PageContainer } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max';
import { useMount } from 'ahooks';
import { Button, Card } from 'antd';
import { map } from 'lodash-es';
import { FC, useState } from 'react';
import ImgViewer from 'react-viewer';

import { formatPerfix, getRandomImg } from '@/utils';
import { ROUTES } from '@/utils/enums'

type ViewerImageSize = {
  width: number;
  height: number;
}

type ImageDecorator = {
  src: string;
  alt?: string;
  downloadUrl?: string;
  defaultSize?: ViewerImageSize;
}

const Viewer: FC = () => {
  const { formatMessage } = useIntl(); // 国际化工具
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState<ImageDecorator[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // 图片列表
  const imgList = () => map(getRandomImg(20), (src: string) => ({
    src,
    downloadUrl: src,
  }));

  // 点击图片回调
  const handleClickImage = (index: number) => {
    setVisible(true)
    setActiveIndex(index)
  }

  useMount(() => {
    setImages(imgList())
  })
  return (
    <PageContainer header={{ title: null }}>
      <Card
        title={formatMessage({ id: formatPerfix(ROUTES.VIEWER, '', true) })}
        bordered={false}
        extra={(
          <Button
            type="primary"
            href="https://github.com/infeng/react-viewer"
            target="_blank"
          >
            react-viewer
          </Button>
        )}
      >
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {map(images, (item: ImageDecorator, i: number) => (
            <img
              key={item.src}
              src={item.src}
              onClick={() => handleClickImage(i)}
              style={{
                height: 250,
                width: '100%',
                cursor: 'pointer',
                objectFit: 'cover',
                borderRadius: 8,
              }}
            />
          ))}
        </div>
        {/* 图片预览 */}
        <ImgViewer
          visible={visible}
          onClose={() => setVisible(false)}
          images={images}
          activeIndex={activeIndex}
          downloadable
          downloadInNewWindow
        />
      </Card>
    </PageContainer>
  )
}
export default Viewer;
