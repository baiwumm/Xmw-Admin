/*
 * @Description: 活动公告详情
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-09-28 09:45:19
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 13:42:13
 */
import { Avatar, ConfigProvider, Drawer, List, Typography } from 'antd';
import React, { FC } from 'react'

import type { DetailDrawerProps } from '@/utils/types/administrative/announcement'

const { Text } = Typography;

const DetailDrawer: FC<DetailDrawerProps> = ({ data, open, onCalcel }) => {
  return (
    <Drawer open={open} onClose={onCalcel}>
      <ConfigProvider theme={{
        components: {
          List: {
            titleMarginBottom: 0,
          },
        },
      }}>
        <List
          itemLayout="vertical"
          size="small"
          pagination={false}
          dataSource={data ? [data] : []}
          renderItem={(item) => (
            <List.Item
              key={item?.announcement_id}
            >
              <List.Item.Meta
                avatar={<Avatar src={item?.avatar_url} />}
                title={<Text ellipsis={{ tooltip: item?.title }}>{item?.title}</Text>}
                description={item?.cn_name}
              />
              <div dangerouslySetInnerHTML={{ __html: item?.content }} />
            </List.Item>
          )}
        />
      </ConfigProvider>
    </Drawer>
  )
}
export default DetailDrawer