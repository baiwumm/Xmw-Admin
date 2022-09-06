/*
 * @Description: 菜单图标渲染
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-05 14:05:26
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-06 16:08:31
 */
import { FC } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

// 引入 iconFont 资源路劲
const IconFont = createFromIconfontCN({
    scriptUrl: process.env.ICONFONT_URL,
});

// 定义接口
interface IProps {
    iconName: any
}

const IconFontLayout: FC<IProps> = ({ iconName }) => {
    return <IconFont type={iconName} style={{ fontSize: '24px' }} />
}
export default IconFontLayout
