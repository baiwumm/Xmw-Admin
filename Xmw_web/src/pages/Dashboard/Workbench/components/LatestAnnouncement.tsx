/*
 * @Description: 最新公告
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-10-11 09:48:13
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-04 10:04:47
 */
import { useIntl } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Avatar, Card, List, Tag } from 'antd';
import { get } from 'lodash-es';
import { FC } from 'react';

import { getAnnouncementList } from '@/services/administrative/announcement';
import { formatPerfix, randomTagColor } from '@/utils';
import { AnnouncementTypeEnum } from '@/utils/const';
import { EVENTBUS_TYPE, ROUTES } from '@/utils/enums';
import eventBus from '@/utils/eventBus';

const LatestAnnouncement: FC = () => {
  // 国际化工具
  const { formatMessage } = useIntl();
  /**
   * @description: 获取最新公告列表
   * @author: 白雾茫茫丶
   */
  const { data: announcementList, loading: announcementListLoading } = useRequest(
    async (params) => get(await getAnnouncementList(params), 'data.list', []),
    {
      defaultParams: [{ current: 1, pageSize: 5 }],
    },
  );
  return (
    <Card
      title={formatMessage({ id: formatPerfix(ROUTES.WORKBENCH, 'latest-announcement') })}
      loading={announcementListLoading}
      styles={{ body: { padding: '5px 24px' } }}
    >
      <List
        itemLayout="horizontal"
        dataSource={announcementList}
        renderItem={(record: API.ANNOUNCEMENT) => (
          <List.Item
            actions={[
              <Tag color={randomTagColor()} key="type">
                {formatMessage({
                  id: formatPerfix(
                    ROUTES.ANNOUNCEMENT,
                    `type.${AnnouncementTypeEnum[record.type]}`,
                  ),
                })}
              </Tag>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={record.avatar_url} />}
              title={
                <a onClick={() => eventBus.emit(EVENTBUS_TYPE.ANNOUNCEMENT, record)}>
                  {record.title}
                </a>
              }
              description={record.cn_name}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};
export default LatestAnnouncement;
