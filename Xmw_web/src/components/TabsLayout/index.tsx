/*
 * @Description: 多标签页配置
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2023-01-30 14:04:03
 * @LastEditors: Cyan
 * @LastEditTime: 2023-03-16 15:56:44
 */
import { Tabs, message } from 'antd';
import type { TabsProps } from 'antd';
import { useIntl } from '@umijs/max';
import { findIndex, isString } from 'lodash'

type IProps = {
  isKeep: boolean;
  keepElements: React.MutableRefObject<any>;
  navigate: (targetKey: string) => void;
  dropByCacheKey: (targetKey: string) => void;
  activeKey: string;
  dropLeftTabs: (path: string) => void,
  dropRightTabs: (path: string) => void,
  dropOtherTabs: (path: string) => void,
  refreshTab: (path: string) => void
}

export const TabsLayout = () => {
  return ({
    isKeep,
    keepElements,
    navigate,
    dropByCacheKey,
    activeKey
  }: IProps) => {
    const { formatMessage } = useIntl();
    // Tabs 配置项
    const tabsItems: TabsProps['items'] = Object.entries(keepElements.current).map(
      ([pathname, element]: any) => {
        return {
          key: pathname,
          label:
            <span>
              {element.icon}
              {formatMessage({ id: `menu${pathname.replaceAll('/', '.')}` })}
            </span>
          ,
        }
      }
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
          onEdit={(targetKey: React.MouseEvent | React.KeyboardEvent | string) => {
            // 如果只有一个 tabs ，不能关闭
            if (tabsItems.length <= 1) {
              message.info('至少要保留一个窗口')
              return
            }
            // 获取当前 tab 的索引
            const targetIndex = findIndex(tabsItems, (pane) => pane.key === targetKey)
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
        >
        </Tabs>
      </div>
    );
  }
}
