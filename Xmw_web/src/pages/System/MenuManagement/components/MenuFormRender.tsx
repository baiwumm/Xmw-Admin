import { ProFormRadio, ProFormSelect } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max'
import { Divider, Typography } from 'antd'
import type { FC } from 'react'

import { formatPerfix } from '@/utils'
import { FLAG_OPTS, LAYOUT_TYPE_OPTS, NAV_THEME_OPTS, TARGET_TYPE_OPTS } from '@/utils/const'
import { FLAG, LAYOUT_TYPE, MENU_THEME, ROUTES, TARGET_TYPE } from '@/utils/enums'

const { Title } = Typography;

const MenuFormRender: FC = () => {
	const { formatMessage } = useIntl();
	return (
		<>
			<Divider orientation="left" style={{ marginTop: 0, marginBottom: 24 }}>
				<Title level={4} style={{ marginBottom: 0 }}>
					{formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.route-config` })}
				</Title>
			</Divider>
			{/* 显示layout布局 */}
			<ProFormSelect
				name="layout"
				colProps={{ span: 12 }}
				initialValue={LAYOUT_TYPE.SIDE}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.layout` })}
				tooltip={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.layout.tooltip` })}
				options={LAYOUT_TYPE_OPTS}
				fieldProps={{
					allowClear: false,
				}}
			/>
			{/* 菜单主题 */}
			<ProFormSelect
				name="navTheme"
				colProps={{ span: 12 }}
				initialValue={MENU_THEME.LIGHT}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.navTheme` })}
				options={NAV_THEME_OPTS}
				fieldProps={{
					allowClear: false,
				}}
			/>
			{/* 顶部导航的主题，mix 模式生效 */}
			<ProFormSelect
				name="headerTheme"
				colProps={{ span: 12 }}
				initialValue={'light'}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.headerTheme` })}
				options={NAV_THEME_OPTS}
				fieldProps={{
					allowClear: false,
				}}
			/>
			{/* 窗口打开方式 */}
			<ProFormSelect
				name="target"
				colProps={{ span: 12 }}
				initialValue={TARGET_TYPE.BLANK}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.target` })}
				tooltip={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.target.tooltip` })}
				options={TARGET_TYPE_OPTS}
				fieldProps={{
					allowClear: false,
				}}
			/>
			{/* 隐藏子路由 */}
			<ProFormRadio.Group
				name="hideChildrenInMenu"
				colProps={{ span: 8 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.hideChildrenInMenu` })}
				radioType="button"
				initialValue={FLAG.NO}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={FLAG_OPTS}
			/>
			{/* 隐藏菜单 */}
			<ProFormRadio.Group
				name="hideInMenu"
				colProps={{ span: 8 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.hideInMenu` })}
				radioType="button"
				initialValue={FLAG.NO}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={FLAG_OPTS}
			/>
			{/* 在面包屑中隐藏 */}
			<ProFormRadio.Group
				name="hideInBreadcrumb"
				colProps={{ span: 8 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.hideInBreadcrumb` })}
				radioType="button"
				initialValue={FLAG.NO}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={FLAG_OPTS}
			/>
			{/* 显示顶栏 */}
			<ProFormRadio.Group
				name="headerRender"
				colProps={{ span: 8 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.headerRender` })}
				radioType="button"
				initialValue={FLAG.YES}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={FLAG_OPTS}
			/>
			{/* 显示页脚 */}
			<ProFormRadio.Group
				name="footerRender"
				colProps={{ span: 8 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.footerRender` })}
				radioType="button"
				initialValue={FLAG.YES}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={FLAG_OPTS}
			/>
			{/* 显示菜单 */}
			<ProFormRadio.Group
				name="menuRender"
				colProps={{ span: 8 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.menuRender` })}
				radioType="button"
				initialValue={FLAG.YES}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={FLAG_OPTS}
			/>
			{/* 显示菜单顶栏 */}
			<ProFormRadio.Group
				name="menuHeaderRender"
				colProps={{ span: 8 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.menuHeaderRender` })}
				radioType="button"
				initialValue={FLAG.YES}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={FLAG_OPTS}
			/>
			{/* 子项往上提 */}
			<ProFormRadio.Group
				name="flatMenu"
				colProps={{ span: 8 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.flatMenu` })}
				radioType="button"
				initialValue={FLAG.NO}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={FLAG_OPTS}
			/>
			{/* 固定顶栏 */}
			<ProFormRadio.Group
				name="fixedHeader"
				colProps={{ span: 8 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.fixedHeader` })}
				radioType="button"
				initialValue={FLAG.YES}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={FLAG_OPTS}
			/>
			{/* 固定菜单 */}
			<ProFormRadio.Group
				name="fixSiderbar"
				colProps={{ span: 8 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.fixSiderbar` })}
				radioType="button"
				initialValue={FLAG.YES}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={FLAG_OPTS}
			/>
		</>
	)
}

export default MenuFormRender