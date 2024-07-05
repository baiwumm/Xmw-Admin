/*
 * @Description: 消息铃铛
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-10-08 15:26:07
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-05 11:00:29
 */
import { Icon, useIntl } from '@umijs/max';
import { useMount, useRequest, useUnmount } from 'ahooks';
import { Avatar, Badge, Card, ConfigProvider, List, Popover, Spin, Tabs } from 'antd';
import { get, map } from 'lodash-es';
import { FC, useState } from 'react';

import { getAnnouncementList, queryUnreadyCount } from '@/services/administrative/announcement';
import { formatPerfix } from '@/utils';
import { AnnouncementTypeEnum } from '@/utils/const';
import { ANNOUNCEMENT_TYPE, EVENTBUS_TYPE, ROUTES } from '@/utils/enums';
import eventBus from '@/utils/eventBus';
import type { PaginationParams } from '@/utils/types';
import type { AnnouncementType } from '@/utils/types/administrative/announcement';

const NoticeBell: FC = () => {
  // 国际化工具类
  const { formatMessage } = useIntl();
  // 当前激活 tab 面板的 key
  const [activeKey, setActiveKey] = useState<AnnouncementType>(ANNOUNCEMENT_TYPE.ANNOUNCEMENT);
  // 当前页码
  const [current, setCurrent] = useState<number>(1);
  // 分页参数
  const paginationParams: PaginationParams = { pageSize: 5, current };

  /**
   * @description: 获取活动公告列表
   * @author: 白雾茫茫丶
   */
  const {
    data: announcementList,
    loading: announcementListLoading,
    run: fetchAnnouncementList,
  } = useRequest(
    async () =>
      get(
        await getAnnouncementList({
          type: activeKey,
          unready: true,
          ...paginationParams,
        }),
        'data',
        {},
      ),
    {
      refreshDeps: [activeKey, current],
    },
  );

  /**
   * @description: 查询不同消息类型的未读条数
   * @author: 白雾茫茫丶
   */
  const {
    data: unreadyCount,
    loading: unreadyCountLoading,
    run: fetchUnreadyCount,
  } = useRequest(async () => get(await queryUnreadyCount(), 'data', {}), {
    onSuccess: () => {
      setCurrent(1);
      fetchAnnouncementList();
    },
  });

  /**
   * @description: 消息类型
   * @author: 白雾茫茫丶
   */
  const renderAnnouncementType = (
    <Tabs
      activeKey={activeKey}
      centered
      onChange={(key) => {
        setActiveKey(key);
        setCurrent(1);
      }}
      items={map(AnnouncementTypeEnum, (type: string, value: string) => ({
        label: `${formatMessage({ id: formatPerfix(ROUTES.ANNOUNCEMENT, `type.${type}`) })}
        (${get(unreadyCount, type, 0)})`,
        key: value,
      }))}
    />
  );

  /**
   * @description: 渲染消息内容
   * @author: 白雾茫茫丶
   */
  const renderContent = (
    <Card bordered={false} style={{ boxShadow: 'none' }} styles={{ body: { padding: 0 } }}>
      <List
        itemLayout="horizontal"
        dataSource={get(announcementList, 'list', [])}
        loading={announcementListLoading}
        pagination={{
          position: 'bottom',
          align: 'center',
          size: 'small',
          total: get(announcementList, 'total', 0),
          hideOnSinglePage: true,
          ...paginationParams,
          onChange: (page) => setCurrent(page),
        }}
        renderItem={(record: API.ANNOUNCEMENT) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={record.avatar_url} />}
              title={
                <Badge dot offset={[5, 5]}>
                  <a
                    onClick={() => {
                      eventBus.emit(EVENTBUS_TYPE.ANNOUNCEMENT, record, fetchUnreadyCount);
                    }}
                  >
                    {record.title}
                  </a>
                </Badge>
              }
              description={record.cn_name}
            />
          </List.Item>
        )}
      />
    </Card>
  );

  useMount(() => {
    eventBus.on(EVENTBUS_TYPE.UPDATEUNREADYCOUNT, fetchUnreadyCount);
  });

  useUnmount(() => {
    eventBus.off(EVENTBUS_TYPE.UPDATEUNREADYCOUNT, fetchUnreadyCount);
  });
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Popover: { titleMinWidth: 350 },
            Tabs: { horizontalMargin: '0' },
          },
        }}
      >
        <Popover title={renderAnnouncementType} content={renderContent}>
          <Badge count={get(unreadyCount, 'total', 0)} size="small">
            <Spin spinning={unreadyCountLoading} size="small">
              <Icon icon="ri:notification-line" />
            </Spin>
          </Badge>
        </Popover>
      </ConfigProvider>
    </>
  );
};
export default NoticeBell;
