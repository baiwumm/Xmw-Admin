/*
 * @Description: 用户头像下拉操作
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-07 15:19:55
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-07 16:27:42
 */
import { FC } from 'react'
import { Dropdown, Menu, Space } from 'antd' // antd 组件
import { LogoutOutlined, LockOutlined, UserOutlined } from '@ant-design/icons' // antd 图标库
import { useSelector } from '@umijs/max' // umi hooks

import { formatMessage } from '@/utils' // 引入工具类

const AvatarActions: FC = () => {
    // 判断 layout 布局，显示下拉方向
    const layout = useSelector((state: any) => state.global.umi_layout.layout);
    // 定义下拉操作列表
    const dropDownMenu = (
        <Menu
            items={[
                {
                    key: 'PersonalCenter',
                    label: (
                        <Space>
                            <UserOutlined />
                            <span>{formatMessage('personalCenter')}</span>
                        </Space>
                    )
                },
                {
                    key: 'LockScreen',
                    label: (
                        <Space>
                            <LockOutlined />
                            <span>{formatMessage('lockScreen')}</span>
                        </Space>
                    )
                },
                {
                    key: 'Logout',
                    label: (
                        <Space>
                            <LogoutOutlined />
                            <span>{formatMessage('logout')}</span>
                        </Space>
                    )
                }
            ]}
        />
    )
    return (
        <Dropdown overlay={dropDownMenu} placement={layout === 'side' ? 'topLeft' : 'bottomRight'} arrow={{ pointAtCenter: true }}>
            <span>Cyan</span>
        </Dropdown>
    )
}
export default AvatarActions
