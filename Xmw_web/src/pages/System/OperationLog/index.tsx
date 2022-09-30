/*
 * @Description: 系统设置-操作日志
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 14:07:00
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-30 10:21:57
 */
import type { FC } from 'react';
import { useIntl } from '@umijs/max'
import { Button } from 'antd'; // antd 组件

const OperationLog: FC = () => {
    const { formatMessage } = useIntl();
    return (
        <Button type="primary">{formatMessage({ id: 'pages.system.operation-log' })}</Button>
    )
}
export default OperationLog