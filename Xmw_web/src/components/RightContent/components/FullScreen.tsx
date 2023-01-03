import type { FC } from 'react'
import { Tooltip } from 'antd'
import { useFullscreen } from 'ahooks';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import { useIntl } from '@umijs/max'

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