/*
 * @Description: 项目推荐
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-10-19 14:56:08
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-26 17:43:50
 */
import { Icon, useIntl } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Avatar, Image, List, Space, Tag, Tooltip, Typography } from 'antd';
import { map } from 'lodash-es';
import { FC } from 'react';

import { formatPerfix, isSuccess, randomTagColor } from '@/utils';
import { ROUTES } from '@/utils/enums';
import type { UmiIcon } from '@/utils/types';

const { Text } = Typography;

type IconTextProps = {
  icon: UmiIcon;
  text?: string;
  url: string;
  title: string;
};

const ProjectRecommend: FC = () => {
  const { formatMessage } = useIntl();
  /**
   * @description: 请求开源仓库信息
   * @author: 白雾茫茫丶
   */
  const { data: repositoryList, loading: repositoryListLoading } = useRequest(async () => {
    const response = await fetch(
      'https://api.github.com/users/baiwumm/repos?sort=updated&page=1&per_page=5',
    );
    if (isSuccess(response.status)) {
      const result = await response.json();
      return result;
    }
    return [];
  });

  /**
   * @description: 底部操作栏
   * @author: 白雾茫茫丶
   */
  const IconText = ({ icon, text, url, title }: IconTextProps) => (
    <Tooltip title={title}>
      <a href={url} target="_blank">
        <Space size="small">
          <Text type="secondary">
            <Icon icon={icon} />
          </Text>
          {text && <Text type="secondary">{text}</Text>}
        </Space>
      </a>
    </Tooltip>
  );
  return (
    <List
      itemLayout="vertical"
      dataSource={repositoryList || []}
      loading={repositoryListLoading}
      renderItem={(item: any) => (
        <List.Item
          key={item.name}
          actions={[
            <IconText
              icon="ri:star-line"
              text={item.stargazers_count}
              url={item.html_url}
              title="stars"
              key="stars"
            />,
            <IconText
              icon="ri:git-fork-line"
              text={item.forks}
              url={item.html_url}
              title="forks"
              key="forks"
            />,
            <IconText
              icon="ri:eye-line"
              text={item.watchers_count}
              url={item.html_url}
              title="watch"
              key="watch"
            />,
            <IconText
              icon="ri:share-box-line"
              url={item.homepage}
              title={formatMessage({ id: formatPerfix(ROUTES.PERSONALINFOMATION, 'preview') })}
              key="preview"
            />,
          ]}
          extra={<Image src="https://picsum.photos/200/120" width={200} />}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.owner.avatar_url} />}
            title={
              <Space>
                <a href={item.html_url} target="_blank">
                  {item.name}
                </a>
                <Tag>{item.language}</Tag>
              </Space>
            }
            description={item.description}
          />
          <Space wrap size={[0, 8]}>
            {map(item.topics, (tag: string) => (
              <Tag color={randomTagColor()} key={tag}>
                {tag}
              </Tag>
            ))}
          </Space>
        </List.Item>
      )}
    />
  );
};
export default ProjectRecommend;
