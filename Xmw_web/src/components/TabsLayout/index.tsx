/*
 * @Description: 自定义多标签页
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-01-30 14:04:03
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-25 15:35:42
 */
import { PicCenterOutlined, ReloadOutlined, VerticalLeftOutlined, VerticalRightOutlined } from '@ant-design/icons'
import { FormattedMessage, useIntl } from '@umijs/max';
import { App, Dropdown, MenuProps, Space, Tabs, TabsProps } from 'antd';
import { eq, keys, last } from 'lodash-es'
import { FC, MutableRefObject, ReactNode, useCallback } from 'react'

import { IconFont } from '@/utils/const'
import { TABSLAYOUT } from '@/utils/enums'
import type { EnumValues } from '@/utils/types'

export type TabsLayoutProps = {
  isKeep: boolean;
  keepElements: MutableRefObject<any>;
  navigate: (path: string) => void;
  dropByCacheKey: (path: string) => void;
  dropLeftTabs: (path: string) => void;
  dropRightTabs: (path: string) => void;
  dropOtherTabs: (path: string) => void;
  refreshTab: (path: string) => void;
  updateTab: (path: string, config: TabsProps) => void;
  closeTab: (path: string) => void;
  activeKey: string;
}

const TabsLayout: FC<TabsLayoutProps> = ({
  isKeep,
  keepElements,
  navigate,
  dropByCacheKey,
  dropLeftTabs,
  dropRightTabs,
  dropOtherTabs,
  refreshTab,
  activeKey,
}) => {
  const prefix = 'components.TabsLayout.'
  // 国际化工具
  const { formatMessage } = useIntl();
  // hooks 调用
  const { message } = App.useApp();
  /**
   * @description: 点击菜单回调
   */
  const handleClickMenu = useCallback((key: string) => {
    const pathName = location.pathname?.toLowerCase();
    switch (key) {
      case TABSLAYOUT.REFRESH:
        refreshTab(pathName);
        break;
      case TABSLAYOUT.RIGHT:
        dropRightTabs(pathName);
        break;
      case TABSLAYOUT.LEFT:
        dropLeftTabs(pathName);
        break;
      case TABSLAYOUT.OTHERS:
        dropOtherTabs(pathName);
        break;
    }
  }, [location.pathname])
  /**
   * @description: 右键菜单配置项
   */
  const renderMenuItem = (key: EnumValues<typeof TABSLAYOUT>, icon: ReactNode) => ({
    label: formatMessage({ id: `${prefix}${key}` }),
    icon,
    key: key,
  })
  const menuItems: MenuProps['items'] = [
    // 重新加载
    renderMenuItem(TABSLAYOUT.REFRESH, <ReloadOutlined />),
    { type: 'divider' },
    // 关闭右侧
    renderMenuItem(TABSLAYOUT.RIGHT, <VerticalLeftOutlined />),
    // 关闭左侧
    renderMenuItem(TABSLAYOUT.LEFT, <VerticalRightOutlined />),
    { type: 'divider' },
    // 关闭其它
    renderMenuItem(TABSLAYOUT.OTHERS, <PicCenterOutlined />),
  ];
  /**
   * @description: Tabs 配置项
   */
  const tabsItems: TabsProps['items'] = keys(keepElements.current).map(
    (pathname: string) => {
      // 只有当前活跃的标签页才能操作
      const dom = (
        <Space size={0}>
          <IconFont type={`icon-${last(pathname.split('/'))}`} />
          <FormattedMessage id={`menu${pathname.replaceAll('/', '.')}`} />
        </Space>
      )
      return {
        key: pathname,
        label: eq(activeKey, pathname) ? (
          <Dropdown menu={{ items: menuItems, onClick: ({ key }) => handleClickMenu(key) }} trigger={['contextMenu']}>
            {dom}
          </Dropdown>
        ) : dom,
      }
    },
  );
  return (
    <div className="rumtime-keep-alive-tabs-layout" hidden={!isKeep}>
      <Tabs
        hideAdd
        onChange={(key: string) => {
          navigate(key);
        }}
        activeKey={activeKey}
        type="editable-card"
        onEdit={(targetKey) => {
          // 获取当前所有 Tab 标签页的路由
          const pathNameList = keys(keepElements.current)
          // 如果只有一个 tabs ，不能关闭
          if (pathNameList.length <= 1) {
            message.info(formatMessage({ id: `${prefix}${TABSLAYOUT.CLOSE}` }))
            return
          }
          // 获取当前 tab 的索引
          const targetIndex: number = pathNameList.indexOf(targetKey)
          // 清空当前页面的状态保持
          if (typeof targetKey === 'string') {
            dropByCacheKey(targetKey);
          }
          // 判断当前 tab 是否是最后一个，则向前进一位，否则向后进一位
          navigate(pathNameList[eq(targetIndex, 0) ? targetIndex + 1 : targetIndex - 1])
        }}
        items={tabsItems}
        size="small"
      >
      </Tabs>
    </div>
  );
}
export default TabsLayout
