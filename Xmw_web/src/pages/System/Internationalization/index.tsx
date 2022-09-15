/*
 * @Description: 系统设置-国际化
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 14:07:00
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-15 18:15:50
 */
import { FC } from 'react';
import { Button } from 'antd'; // antd 组件
import { formatMessage } from '@/utils' // 引入工具类

const Internationalization: FC = () => {
    return (
        <Button type="primary">{formatMessage('pages.setting.internationalization')}</Button>
    )
}
export default Internationalization