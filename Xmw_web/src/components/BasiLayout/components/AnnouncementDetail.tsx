/*
 * @Description: 活动公告详情
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-09-28 09:45:19
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-17 13:58:53
 */
import { useBoolean, useMount, useRequest, useUnmount } from 'ahooks'
import { Avatar, ConfigProvider, Drawer, List, Typography } from 'antd';
import { pick } from 'lodash-es'
import { FC, useState } from 'react'

import { announcementAlready } from '@/services/administrative/announcement'
import { isSuccess } from '@/utils'
import { EVENTBUS_TYPE } from '@/utils/enums'
import eventBus from '@/utils/eventBus'

const { Text } = Typography;

const AnnouncementDetail: FC = () => {
  // 保存当前数据
  const [currentRecord, setCurrentRecord] = useState<API.ANNOUNCEMENT>()
  // 是否显示 Drawer
  const [open, { setTrue: setOpenDrawerTrue, setFalse: setOpenDrawerFalse }] = useBoolean(false)
  /**
   * @description: 公告已读
   * @author: 白雾茫茫丶
   */
  const { runAsync: fetchAnnouncementAlready } = useRequest(async (params) => await announcementAlready(params), {
    manual: true,
  })

  /**
   * @description: 查看详情
   * @author: 白雾茫茫丶
   */
  const handleAnnouncementDetails = async (record: API.ANNOUNCEMENT, callback?: () => void) => {
    setCurrentRecord(record);
    setOpenDrawerTrue();
    await fetchAnnouncementAlready(pick(record, 'announcement_id')).then(({ code }) => {
      if (isSuccess(code)) {
        callback?.()
      }
    })
  }

  /**
   * @description: 退出详情
   * @author: 白雾茫茫丶
   */
  const handlerCancel = () => {
    setCurrentRecord(undefined);
    setOpenDrawerFalse();
  }

  useMount(() => {
    // 监听别的模块查看公告详情
    eventBus.on(EVENTBUS_TYPE.ANNOUNCEMENT, handleAnnouncementDetails)
  })

  useUnmount(() => {
    eventBus.off(EVENTBUS_TYPE.ANNOUNCEMENT, handleAnnouncementDetails)
  })
  return (
    <Drawer open={open} onClose={handlerCancel} width={450} zIndex={1060}>
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