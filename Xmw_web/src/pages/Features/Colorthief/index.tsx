/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-17 13:43:07
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-17 14:39:49
 * @Description: 图片取色盘
 */
import './index.less';

import { PageContainer, PageHeader, ProCard } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max';
import { useMount } from 'ahooks';
import ColorThief from 'colorthief';
import { map } from 'lodash-es';
import { FC, useRef, useState } from 'react';

import { formatPerfix, getRandomImg } from '@/utils';
import { ROUTES } from '@/utils/enums'

const Colorthief: FC = () => {
  const { formatMessage } = useIntl(); // 国际化工具
  // 国际化
  const renderMessage = (field: string) => formatMessage({ id: formatPerfix(ROUTES.COLORTHIEF, field) });

  const colorThiefRef = useRef<HTMLImageElement>(null);
  const colorThief = new ColorThief();

  const [hoverIndex, setHoverIndex] = useState<number>(-1);

  const [imgs, setImgs] = useState([])

  // 鼠标悬停回调
  const onMouseOver = (event: MouseEvent, i: number) => {
    setHoverIndex(i);
    const img = event.target as HTMLImageElement;
    let colors = colorThief.getPalette(img, 3);
    colors = map(colors, (c: string[]) => `rgb(${c[0]}, ${c[1]}, ${c[2]})`);
    if (colorThiefRef.current) {
      colorThiefRef.current.style.setProperty('--c1', colors[0]);
      colorThiefRef.current.style.setProperty('--c2', colors[1]);
      colorThiefRef.current.style.setProperty('--c3', colors[2]);
    }
  };

  // 鼠标移出回调
  const onMouseOut = () => {
    setHoverIndex(-1);
    if (colorThiefRef.current) {
      colorThiefRef.current.style.setProperty('--c1', '#fff');
      colorThiefRef.current.style.setProperty('--c2', '#fff');
      colorThiefRef.current.style.setProperty('--c3', '#fff');
    }
  };

  useMount(() => {
    setImgs(getRandomImg(8))
  })
  return (
    <PageContainer header={{ title: null }}>
      <ProCard bodyStyle={{ padding: '10px 10px 20px 10px' }}>
        <PageHeader title={formatMessage({ id: formatPerfix(ROUTES.COLORTHIEF, '', true) })}>
          {renderMessage('subTitle')}
        </PageHeader>
      </ProCard>
      <div
        ref={colorThiefRef}
        className="colorthief-container"
      >
        {
          map(imgs, (src: string, i: number) => (
            <div key={src} className="imgbox">
              <img
                src={src}
                className="color-img"
                style={{
                  opacity: hoverIndex === -1 ? 1 : hoverIndex === i ? 1 : 0.3,
                  filter: `blur(${hoverIndex === -1 ? '0px' : hoverIndex === i ? '0px' : '1px'})`,
                }}
                onMouseOver={(event) => onMouseOver(event, i)}
                onMouseOut={onMouseOut}
              />
            </div>
          ))
        }
      </div>
    </PageContainer>
  )
}
export default Colorthief;
