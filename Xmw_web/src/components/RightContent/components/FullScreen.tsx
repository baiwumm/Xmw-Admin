/*
 * @Description: 全屏
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2023-01-03 15:46:18
 * @LastEditors: Cyan
 * @LastEditTime: 2023-07-10 14:32:14
 */
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { useIntl } from '@umijs/max'
import { useFullscreen } from 'ahooks';
import { Tooltip } from 'antd'
import type { FC } from 'react'

type IProps = {
  actionClassName: string
}

const FullScreen: FC<IProps> = ({ actionClassName }) => {
  // 多语言函数
  const { formatMessage } = useIntl();
  const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(() => document.body);
  return (
    <>
      {
        isFullscreen ?
          <Tooltip title={formatMessage({ id: 'components.RightContent.ExitFullScreen' })}>
            <FullscreenExitOutlined onClick={exitFullscreen} className={actionClassName} />
          </Tooltip>
          :
          <Tooltip title={formatMessage({ id: 'components.RightContent.FullScreen' })}>
            <FullscreenOutlined onClick={enterFullscreen} className={actionClassName} />
          </Tooltip>
      }
    </>
  )
}

export default FullScreen