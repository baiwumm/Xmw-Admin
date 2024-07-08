/*
 * @Description: 博客日志
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-10-11 10:02:20
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-08 15:40:42
 */
import { Icon, useIntl } from '@umijs/max';
import { useMount, useRequest } from 'ahooks';
import { Avatar, Card, Flex, List, Space, Tag, Tooltip } from 'antd';
import { get, map, take, toString } from 'lodash-es';
import { FC, ReactNode } from 'react';

import { getJuejinArticleList } from '@/services/common';
import { formatPerfix } from '@/utils';
import { ROUTES } from '@/utils/enums';
import type { UmiIcon } from '@/utils/types';

type BlogLogsProps = {
  renderSecondary: (content: string, row?: number) => ReactNode;
};

const BlogLogs: FC<BlogLogsProps> = ({ renderSecondary }) => {
  // 国际化工具
  const { formatMessage } = useIntl();
  /**
   * @description: 请求掘金文章列表
   * @author: 白雾茫茫丶
   */
  const {
    data: articleList,
    loading: articleLoading,
    run: fetchArticleList,
  } = useRequest(async (params) => get(await getJuejinArticleList(params), 'data', {}), {
    manual: true,
  });

  /**
   * @description: 渲染图标
   */
  const renderIconText = (icon: UmiIcon, value: number, key: string) => (
    <Space size={4} key={key}>
      <Icon icon={icon} />
      {value}
    </Space>
  );

  useMount(() => {
    fetchArticleList({
      sort_type: 2,
      user_id: '1917147257534279',
      cursor: '0',
    });
  });
  return (
    <Card title={formatMessage({ id: formatPerfix(ROUTES.WORKBENCH, 'blog-log') })}>
      <List
        itemLayout="vertical"
        pagination={{
          position: 'bottom',
          align: 'start',
          pageSize: 5,
          showSizeChanger: false,
          total: get(articleList, 'total', 0),
          onChange: (page, pageSize) => {
            fetchArticleList({
              sort_type: 2,
              user_id: '1917147257534279',
              cursor: toString(pageSize * (page - 1)),
            });
          },
        }}
        dataSource={take(get(articleList, 'list', []), 5)}
        loading={articleLoading}
        renderItem={({ article_id, article_info, tags = [] }) => (
          <List.Item
            key={article_id}
            actions={[
              renderIconText('ri:eye-line', article_info.view_count, 'view'),
              renderIconText('ri:thumb-up-line', article_info.digg_count, 'star'),
              renderIconText('ri:star-line', article_info.collect_count, 'collect'),
              renderIconText('ri:message-2-line', article_info.comment_count, 'comment'),
            ]}
          >
            <List.Item.Meta
              avatar={
                <Tooltip title={formatMessage({ id: formatPerfix(ROUTES.WORKBENCH, 'blog-tip') })}>
                  <a href="https://baiwumm.com/" target="_blank">
                    <Avatar src="https://cdn.baiwumm.com/avatar.jpg" />
                  </a>
                </Tooltip>
              }
              title={
                <a href={`https://juejin.cn/post/${article_id}`} target="_blank">
                  {article_info.title}
                </a>
              }
              description={
                <Flex gap="4px 0" wrap>
                  {map(tags, ({ tag_id, tag_name }) => (
                    <Tag bordered={false} key={tag_id}>
                      {tag_name}
                    </Tag>
                  ))}
                </Flex>
              }
            />
            {renderSecondary(article_info.brief_content, 2)}
          </List.Item>
        )}
      />
    </Card>
  );
};
export default BlogLogs;
