/*
 * @Description: SSE 事件推送
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-10-16 13:36:33
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-24 15:13:33
 */
import { useIntl } from '@umijs/max';
import { App, Avatar, Button } from 'antd';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { isEmpty } from 'lodash-es';
import { FC, useEffect } from 'react';

import { formatPerfix, getLocalStorageItem } from '@/utils';
import { AnnouncementTypeEnum } from '@/utils/const';
import { BASEURL, EVENTBUS_TYPE, LOCAL_STORAGE, ROUTES } from '@/utils/enums';
import eventBus from '@/utils/eventBus';

const EventSourceNotice: FC = () => {
  // 国际化工具
  const { formatMessage } = useIntl();
  // hooks 调用
  const { notification } = App.useApp();

  useEffect(() => {
    // 获取 ACCESS_TOKEN
    const ACCESS_TOKEN = getLocalStorageItem<string>(LOCAL_STORAGE.ACCESS_TOKEN)
    // 创建 EventSource 实例
    const eventSource = new EventSourcePolyfill(`${BASEURL.API}${ROUTES.ANNOUNCEMENT}/sse`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      heartbeatTimeout: 60 * 60 * 1000, // 这是自定义配置请求超时时间  默认是45000ms
    });
    // 监听事件
    eventSource.addEventListener('message', ({ data }) => {
      // 解析数据
      const record = JSON.parse(data);
      // 如果返回的是空对象，则代表的时删除，否则是新增
      if (!isEmpty(record)) {
        const { title, avatar_url, cn_name, type }: API.ANNOUNCEMENT = record;
        // 格式化类型
        const typeName = formatMessage({
          id: formatPerfix(ROUTES.ANNOUNCEMENT, `type.${AnnouncementTypeEnum[type]}`),
        });
        // 弹窗提醒
        notification.open({
          message: `${cn_name}发布了一条新${typeName}`,
          description: title,
          icon: <Avatar src={avatar_url} />,
          btn: (
            <Button
              type="primary"
              onClick={() => eventBus.emit(EVENTBUS_TYPE.ANNOUNCEMENT, record)}
            >
              查看
            </Button>
          ),
        });
      }
      // 刷新未读消息
      eventBus.emit(EVENTBUS_TYPE.UPDATEUNREADYCOUNT);
    });
    return () => {
      // 关闭
      eventSource.close();
    };
  }, [formatMessage, notification]);
  return null;
};
export default EventSourceNotice;
