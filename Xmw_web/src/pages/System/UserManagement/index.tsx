/*
 * @Description: 系统设置-用户管理
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-08 14:51:18
 */
// 引入第三方库
import { FC } from 'react';
import { Button } from 'antd'; // antd 组件
import { formatMessage } from '@/utils' // 引入工具类

const UserManagement: FC = () => {
    return (
        <Button type="primary">{formatMessage('pages.setting.user-management')}</Button>
    )
}
export default UserManagement