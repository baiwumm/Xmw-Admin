/*
 * @Description: 全屏
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-01-03 15:46:18
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-05 10:58:55
 */
import { Icon, useIntl } from '@umijs/max';
import { useFullscreen } from 'ahooks';
import { Tooltip } from 'antd';
import type { FC } from 'react';

import { INTERNATION } from '@/utils/enums';

const FullScreen: FC = () => {
  // 多语言函数
  const { formatMessage } = useIntl();
  const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(() => document.body);
  return (
    <>
      {isFullscreen ? (
        <Tooltip title={formatMessage({ id: `${INTERNATION.BASICLAYOUT}.ExitFullScreen` })}>
          <Icon icon="ri:fullscreen-exit-line" onClick={exitFullscreen} />
        </Tooltip>
      ) : (
        <Tooltip title={formatMessage({ id: `${INTERNATION.BASICLAYOUT}.FullScreen` })}>
          <Icon icon="ri:fullscreen-line" onClick={enterFullscreen} />
        </Tooltip>
      )}
    </>
  );
};

export default FullScreen;
