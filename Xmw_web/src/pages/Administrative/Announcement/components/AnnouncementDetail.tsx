/*
 * @Description: 活动公告详情
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-09-28 09:45:19
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-08 14:50:29
 */
import { useBoolean } from 'ahooks'
import { Avatar, ConfigProvider, Drawer, List, Typography } from 'antd';
import React, { FC, RefObject, useImperativeHandle, useState } from 'react'

import type { AnnouncementDetailRefsProps } from '@/utils/types/administrative/announcement'

const { Text } = Typography;

type AnnouncementDetailProps = {
  onRef: RefObject<AnnouncementDetailRefsProps>,
}

const AnnouncementDetail: FC<AnnouncementDetailProps> = ({ onRef }) => {
  // 保存当前数据
  const [currentRecord, setCurrentRecord] = useState<API.ANNOUNCEMENT>()
  // 是否显示 Drawer
  const [open, { setTrue: setOpenDrawerTrue, setFalse: setOpenDrawerFalse }] = useBoolean(false)

  /**
   * @description: 退出详情
   * @author: 白雾茫茫丶
   */
  const handlerCancel = () => {
    setCurrentRecord(undefined);
    setOpenDrawerFalse();
  }

  // 将方法通过 useImperativeHandle 暴露给父组件
  useImperativeHandle(onRef, () => ({ setCurrentRecord, setOpenDrawerTrue }))
  return (
    <Drawer open={open} onClose={handlerCancel} width={450}>
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
          dataSource={currentRecord ? [currentRecord] : []}
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
export default AnnouncementDetail