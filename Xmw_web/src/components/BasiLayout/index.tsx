/*
 * @Description: 入口文件-全局 layout 配置
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-19 20:39:53
 * @LastEditors: Cyan
 * @LastEditTime: 2023-08-11 17:58:55
 */
// 引入第三方库
import { createFromIconfontCN } from '@ant-design/icons'; // antd 图标
import { SettingDrawer, Settings as LayoutSettings } from '@ant-design/pro-components'; // 高级组件
import { history, KeepAliveContext, Link, useIntl } from '@umijs/max';
import { useLocalStorageState } from 'ahooks'; // ahook 函数
import { Space } from 'antd' // antd 组件库
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { cloneDeep, isEmpty, last } from 'lodash-es' // lodash 工具库
import React from 'react'

import Footer from '@/components/Footer'; // 全局底部版权组件
// 引入业务组件
import RightContent from '@/components/RightContent'
import type { AppLocalCacheModel, InitialStateModel } from '@/global/interface'
import { CACHE_KEY, getItemByIdInTree } from '@/utils' // 全局工具函数
import routerConfig from '@/utils/routerConfig' // 路由配置

import { appList } from './config'

export const BasiLayout = ({ initialState, setInitialState }: any) => {
	const { formatMessage } = useIntl();
	// 使用 iconfont.cn 资源
	const IconFont = createFromIconfontCN({
		scriptUrl: process.env.ICONFONT_URL,
	});
	// 获取 localstorage key
	const [appCache, setappCache] = useLocalStorageState<AppLocalCacheModel | undefined>(CACHE_KEY);
	// 多标签切换
	const { updateTab } = React.useContext(KeepAliveContext);
	return {
		/* 菜单图标使用iconfont */
		iconfontUrl: process.env.ICONFONT_URL,
		/* 右侧工具栏 */
		rightContentRender: () => <RightContent />,
		/* 水印 */
		waterMarkProps: {
			content: initialState?.CurrentUser?.cn_name,
		},
		/* 底部版权 */
		footerRender: () => <Footer />,
		/* 页面切换时触发 */
		onPageChange: (location: Location) => {
			// 如果没有登录，重定向到 login
			if (isEmpty(initialState?.CurrentUser) && location.pathname !== routerConfig.LOGIN) {
				history.push(routerConfig.LOGIN);
			} else if (initialState?.RouteMenu && initialState?.Locales) {
				// 获取当前路由信息
				const currentRouteInfo = cloneDeep(
					getItemByIdInTree<API.MENUMANAGEMENT>(initialState?.RouteMenu, location.pathname, 'path', 'routes'))
				// 有父级才做跳转
				if (currentRouteInfo?.icon && currentRouteInfo.parent_id) {
					updateTab(location.pathname, {
						icon: <IconFont type={currentRouteInfo.icon} />,
						name: formatMessage({ id: `menu${location.pathname.replaceAll('/', '.')}` }),
						closable: true,
					});
				}
			}
		},
		menu: {
			request: async () => initialState?.RouteMenu,
		},
		/* 自定义面包屑 */
		breadcrumbProps: {
			itemRender: (route: ItemType) => {
				// 获取当前路由信息
				const currentRouteInfo = cloneDeep(
					getItemByIdInTree<API.MENUMANAGEMENT>(initialState?.RouteMenu, route.linkPath, 'path', 'routes'))
				const linkPath = route.linkPath || ''
				const renderName = () => {
					return (
						<Space>
							<IconFont type={`icon-${last(linkPath.split('/'))}`} />
							<span>{route.breadcrumbName}</span>
						</Space>
					)
				}
				return (
					currentRouteInfo?.parent_id ? <Link to={linkPath} >
						{renderName()}
					</Link> : renderName()
				)
			},
		},
		/* 自定义菜单项的 render 方法 */
		menuItemRender: (menuItemProps: any, defaultDom: React.ReactNode) => {
			return (
				/* 渲染二级菜单图标 */
				<Link to={menuItemProps.path} style={{ display: 'flex', alignItems: 'center' }}>
					{/* 分组布局不用渲染图标，避免重复 */}
					{!(appCache?.UMI_LAYOUT?.siderMenuType === 'group') &&
						menuItemProps.pro_layout_parentKeys?.length &&
						<IconFont type={menuItemProps.icon} style={{ marginRight: 10 }} />}
					{defaultDom}
				</Link>
			);
		},
		// 跨站点导航列表
		appList,
		// 增加一个 loading 的状态
		childrenRender: (children: JSX.Element) => {
			return (
				<>
					{children}
					<SettingDrawer
						disableUrlParams
						enableDarkTheme
						settings={appCache?.UMI_LAYOUT}
						onSettingChange={(settings: LayoutSettings) => {
							setappCache({ ...appCache, UMI_LAYOUT: { ...initialState.Settings, ...settings } })
							setInitialState((preInitialState: InitialStateModel) => ({
								...preInitialState,
								settings,
							}));
						}}
					/>
				</>
			);
		},
		...appCache?.UMI_LAYOUT,
	};
}