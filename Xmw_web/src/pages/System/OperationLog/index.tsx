/*
 * @Description: 系统设置-操作日志
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 14:07:00
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-08 15:25:59
 */
import { FC } from 'react';
import { Button } from 'antd'; // antd 组件
import { formatMessage } from '@/utils' // 引入工具类

const OperationLog: FC = () => {
    return (
        <Button type="primary">{formatMessage('pages.setting.operation-log')}</Button>
    )
}
export default OperationLog