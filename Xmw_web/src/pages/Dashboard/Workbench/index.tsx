/*
 * @Description: Dashboard-工作台
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-30 10:37:34
 */
// 引入第三方库
import type { FC } from 'react';
import { useIntl } from '@umijs/max'
import { Button } from 'antd'; // antd 组件

const Workbench: FC = () => {
    const { formatMessage } = useIntl();
    return (
        <Button type="primary">{formatMessage({ id: 'pages.dashboard.work-bench' })}</Button>
    )
}
export default Workbench