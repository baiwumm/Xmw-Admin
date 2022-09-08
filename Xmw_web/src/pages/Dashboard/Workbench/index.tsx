/*
 * @Description: Dashboard-工作台
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-08 15:27:25
 */
// 引入第三方库
import { FC } from 'react';
import { Button } from 'antd'; // antd 组件
import { formatMessage } from '@/utils' // 引入工具类

const Workbench: FC = () => {
    return (
        <Button type="primary">{formatMessage('pages.dashboard.work-bench')}</Button>
    )
}
export default Workbench