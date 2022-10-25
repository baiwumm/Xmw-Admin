/*
 * @Description: 多标签页
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-19 19:53:48
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-25 10:01:53
 */
// 引入第三方库
import type { FC } from 'react'
import { useLocation, useIntl } from '@umijs/max'
import { ReloadOutlined, VerticalRightOutlined, VerticalLeftOutlined, PicCenterOutlined, createFromIconfontCN } from '@ant-design/icons' // antd 图标
import { message, Tabs, Badge, Dropdown, Menu, Button } from 'antd'; // antd 组件库
import { indexOf, slice, remove } from 'lodash'

const TabsLayout: FC<any> = ({ tabsProps: { isKeep, keepElements, navigate, dropByCacheKey, local, activeKey } }) => {
    const { formatMessage } = useIntl();
    // 获取当前路由信息
    const location = useLocation();
    // 使用 iconfont.cn 资源
    const IconFont = createFromIconfontCN({
        scriptUrl: process.env.ICONFONT_URL,
    });
    // 格式换多标签名称
    const formatMessagePath = (pathname: string) => {
        return (
            /* ***** 这里暂时获取不到每个tab对应的icon <IconFont type="icon-workbench" />  */
            <span>{formatMessage({id:'menu' + pathname.replace(/\//g, '.')})}</span>
        )
    }

    /**
     * @description: 操作多标签页 Tabs 操作
     * @param {string} type:操作类型，targetKey: 当前关闭的 tab
     * @return {*}
     * @author: Cyan
     */
    const handlerNavigateTabs = (type: string, targetKey?: any) => {
        // 获取当前 Tabs 上的全部路由
        const allTabsRoutes = Object.keys(keepElements.current)
        // 要重新导航到新 Tab 的路由
        let navigateRoute = activeKey
        // 当前点击的路由的索引
        const currentRouteKey = indexOf(allTabsRoutes, navigateRoute === targetKey ? navigateRoute : targetKey)
        switch (type) {
            // 点击当前刷新
            case 'reload':
                // 这里暂时没想到具体怎么实现，先暂时这样
                dropByCacheKey(targetKey)
                navigate(targetKey)
                break;
            // 关闭左侧标签
            case 'closeTabLeft':
            case 'closeTabRight':
                // 判断是点击关闭左侧还是关闭右侧
                const isCloseTabLeft = type === 'closeTabLeft'
                // 判断是否在最左侧
                if (currentRouteKey === (isCloseTabLeft ? 0 : allTabsRoutes.length - 1)) {
                    message.info(formatMessage({ id: `components.TabsLayout.message.${isCloseTabLeft ? 'closeTabLeft' : 'closeTabRight'}` }));
                } else {
                    // 获取当前 isCloseTabLeft 侧的全部路由
                    const allTabsRoutesOfLeft = isCloseTabLeft ? slice(allTabsRoutes, 0, currentRouteKey) : slice(allTabsRoutes, currentRouteKey + 1)
                    allTabsRoutesOfLeft.forEach(route => dropByCacheKey(route))
                }
                break;
            // 关闭其它标签
            case 'closeOthers':
                // 判断是否只有一个
                if (allTabsRoutes.length === 1) {
                    message.info(formatMessage({ id: 'components.TabsLayout.message.closeOthers' }))
                } else {
                    // 获取除了当前tab的全部标签
                    const othersTabsRoutes = remove(allTabsRoutes, route => route != targetKey)
                    othersTabsRoutes.forEach(route => dropByCacheKey(route))
                }
                break;
            // 点击关闭当前标签
            case 'close':
                // 当长度只有1，就不能关闭
                if (allTabsRoutes.length === 1) {
                    message.info(formatMessage({ id: 'components.TabsLayout.message.close' }));
                } else {
                    // 判断关闭的 tab 是不是当前路由
                    const isCloseRoute = navigateRoute === targetKey
                    // 如果超过1个，则判断当前关闭的路由的位置，
                    // 如果在最左侧，则向后移一位，如果在右侧，则向左移一位
                    if (isCloseRoute) {
                        // 如果是在最左侧,不是最左侧则往左移一位
                        navigateRoute = allTabsRoutes[currentRouteKey === 0?currentRouteKey + 1:currentRouteKey - 1]
                        // 定位导航到新的路由
                        navigate(navigateRoute);
                    }
                    // 销毁当前关闭的路由
                    dropByCacheKey(targetKey);
                }
                break;
        }

    /**
     * @description: 标签页右键菜单
     * @return {*}
     * @author: Cyan
     */
     const RightMenu = (pathname: string) => {
        return (
            <Menu
                items={[
                    {
                        label: <Button type="text" size="small" icon={<ReloadOutlined />} disabled={pathname !== location.pathname}>{formatMessage({id:'components.TabsLayout.reload'})}</Button>,
                        key: 'reload',
                    },
                    {
                        label: <Button type="text" size="small" icon={<PicCenterOutlined />}>{formatMessage({id:'components.TabsLayout.closeOthers'})}</Button>,
                        key: 'closeOthers',
                    },
                    {
                        type: 'divider',
                    },
                    {
                        label: <Button type="text" size="small" icon={<VerticalRightOutlined />} >{formatMessage({id:'components.TabsLayout.closeTabLeft'})}</Button>,
                        key: 'closeTabLeft',
                    },
                    {
                        label: <Button type="text" size="small" icon={<VerticalLeftOutlined />} >{formatMessage({id:'components.TabsLayout.closeTabRight'})}</Button>,
                        key: 'closeTabRight',
                    }
                ]}
                onClick={({ key }) => handlerNavigateTabs(key, pathname)}
            />
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
            <Dropdown overlay={RightMenu(pathname)} trigger={['contextMenu']}>
                <Badge status={activeKey === pathname ? 'processing' : 'success'} text={formatMessagePath(pathname)} />
            </Dropdown>
        )
    }

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
                onEdit={(targetKey: any) => handlerNavigateTabs('close', targetKey)}
                /* 这里拿到的是路由名称，想要国际化，我们把pathname转化一下 */
                items={Object.entries(keepElements.current).map(
                    ([pathname]: any) => (
                        // 渲染 Badge 标签
                        { label: TabsMenuRender(pathname), key: pathname }
                    ),
                )}
             />
        </div>
    );
}

export default TabsLayout