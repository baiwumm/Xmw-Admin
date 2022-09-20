/*
 * @Description: 多标签页
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-19 19:53:48
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-20 10:21:30
 */
// 引入第三方库
import { FC } from 'react'
import { ReloadOutlined, VerticalRightOutlined, VerticalLeftOutlined, createFromIconfontCN } from '@ant-design/icons' // antd 图标
import { message, Tabs, Badge, Dropdown, Menu, Button } from 'antd'; // antd 组件库

// 引入工具函数
import { formatMessage } from '@/utils' // 全局工具函数

const TabsLayout: FC<any> = ({ tabsConfig: { isKeep, keepElements, navigate, dropByCacheKey, local, activeKey } }) => {
    // 使用 iconfont.cn 资源
    const IconFont = createFromIconfontCN({
        scriptUrl: process.env.ICONFONT_URL,
    });
    /**
     * @description: 标签页右键菜单
     * @return {*}
     * @author: Cyan
     */
    const menu = (
        <Menu
            items={[
                {
                    label: <Button type="text" size="small" icon={<ReloadOutlined />} >刷新</Button>,
                    key: 'ReloadOutlined',
                },
                {
                    type: 'divider',
                },
                {
                    label: <Button type="text" size="small" icon={<VerticalRightOutlined />} >关闭左侧</Button>,
                    key: 'VerticalRightOutlined',
                },
                {
                    label: <Button type="text" size="small" icon={<VerticalLeftOutlined />} >关闭右侧</Button>,
                    key: 'VerticalLeftOutlined',
                }
            ]}
        />
    );
    // 格式换多标签名称
    const formatMessagePath = (pathname: string) => {
        return (
            <span><IconFont type="icon-workbench" />{formatMessage('menu' + pathname.replace(/\//g, '.'))}</span>
        )
    }

    /**
     * @description: 多标签 label 渲染
     * @param {string} pathname: 路由
     * @return {*}
     * @author: Cyan
     */
    const TabsMenuRender = (pathname: string) => {
        return (
            <Dropdown overlay={menu} trigger={['contextMenu']}>
                <Badge status={activeKey === pathname ? 'processing' : 'success'} text={formatMessagePath(pathname)} />
            </Dropdown>
        )
    }
    return (
        <div className="rumtime-keep-alive-tabs-layout" hidden={!isKeep}>
            <Tabs
                hideAdd
                onChange={(key: string) => {
                    navigate(key);
                }}
                activeKey={activeKey}
                type="editable-card"
                /* 删除路由标签页的回调 */
                onEdit={(targetKey: string) => {
                    console.log(targetKey)
                    let newActiveKey = activeKey;
                    let lastIndex = -1;
                    const newPanel = Object.keys(keepElements.current);
                    console.log(Object.values(keepElements.current))
                    console.log(newPanel)
                    for (let i = 0; i < newPanel.length; i++) {
                        if (newPanel[i] === targetKey) {
                            lastIndex = i - 1;
                        }
                    }
                    const newPanes = newPanel.filter((pane) => pane !== targetKey);
                    if (newPanes.length && newActiveKey === targetKey) {
                        if (lastIndex >= 0) {
                            newActiveKey = newPanes[lastIndex];
                        } else {
                            newActiveKey = newPanes[0];
                        }
                    }
                    if (lastIndex === -1 && targetKey === location.pathname) {
                        message.info('至少要保留一个窗口');
                    } else {
                        dropByCacheKey(targetKey);
                        if (newActiveKey !== location.pathname) {
                            navigate(newActiveKey);
                        }
                    }
                }}
                /* 这里拿到的是路由名称，想要国际化，我们把pathname转化一下 */
                items={Object.entries(keepElements.current).map(
                    ([pathname, element]: any) => (
                        // 渲染 Badge 标签
                        { label: TabsMenuRender(pathname), key: pathname }
                    ),
                )}
            >
            </Tabs>
        </div>
    );
}

export default TabsLayout