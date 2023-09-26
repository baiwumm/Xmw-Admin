/*
 * @Description: 多标签页配置
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-01-30 14:04:03
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-26 14:31:27
 */
import { FormattedMessage, useIntl } from '@umijs/max';
import { message, Space, Tabs, TabsProps } from 'antd';
import { findIndex, isString, last } from 'lodash-es'

import { IconFont } from '@/utils/const'

export const TabsLayout = () => {
  return ({
    isKeep,
    keepElements,
    navigate,
    dropByCacheKey,
    activeKey,
  }: any) => {
    // 国际化工具
    const { formatMessage } = useIntl();
    // Tabs 配置项
    const tabsItems: TabsProps['items'] = Object.entries(keepElements.current).map(
      ([pathname]) => {
        return {
          key: pathname,
          label: (
            <Space size={0}>
              <IconFont type={`icon-${last(pathname.split('/'))}`} />
              <FormattedMessage id={`menu${pathname.replaceAll('/', '.')}`} />
            </Space>
          ),
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
            // 如果只有一个 tabs ，不能关闭
            if (tabsItems.length <= 1) {
              message.info(formatMessage({ id: 'tabs.close' }))
              return
            }
            // 获取当前 tab 的索引
            const targetIndex: number = findIndex(tabsItems, (pane) => pane.key === targetKey)
            if (isString(targetKey)) {
              // 清空当前页面的状态保持
              dropByCacheKey(targetKey);
            }
            // 判断当前 tab 是否是最后一个，则向前进一位，否则向后进一位
            if (targetIndex === tabsItems.length - 1) {
              navigate(tabsItems[targetIndex - 1].key)
            } else {
              navigate(tabsItems[targetIndex + 1].key)
            }
          }}
          items={tabsItems}
          size="small"
        >
        </Tabs>
      </div>
    );
  }
}
