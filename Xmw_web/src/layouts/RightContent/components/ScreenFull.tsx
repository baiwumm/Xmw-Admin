/*
 * @Description: 全屏放大按钮
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-07 14:29:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-07 15:03:47
 */
import { FC } from 'react'
import { useBoolean } from 'ahooks';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import screenfull from 'screenfull'

const ScreenFull: FC = () => {
    // 定义一个是否全屏的变量
    const [fullScreen, { toggle }] = useBoolean(false);
    // 定义一个全屏方法
    const setFullScreen = () => {
        screenfull.toggle()
        toggle()
    }
    return (
        <Tooltip title={fullScreen ? '退出全屏' : '全屏'}>
            {fullScreen ? <FullscreenExitOutlined onClick={() => {
                setFullScreen()
            }
            } /> : <FullscreenOutlined onClick={() => {
                setFullScreen()
            }
            } />}
        </Tooltip>
    )
}

export default ScreenFull