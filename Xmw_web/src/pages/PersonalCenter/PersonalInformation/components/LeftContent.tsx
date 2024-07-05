/*
 * @Description: 左侧个人信息
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-01-17 10:02:38
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-05 09:49:55
 */
import { Icon, useModel } from '@umijs/max';
import { Avatar, Col, Divider, Space, Typography } from 'antd';
import { codeToText } from 'element-china-area-data';
import { forEach } from 'lodash-es';
import type { FC } from 'react';

import FigureLabels from '@/components/FigureLabels'; // 标签
const { Title, Paragraph } = Typography;

const LeftContent: FC = () => {
  // 获取全局状态
  const { initialState } = useModel('@@initialState');
  const { avatar_url, cn_name, motto, role_name, org_name, jobs_name, address, tags, city } =
    initialState?.CurrentUser || {};
  // 获取省市区名称
  const getAreaName = () => {
    let result: string = '';
    forEach(city, (code: string) => {
      result += codeToText[code];
    });
    return <span>{result}</span>;
  };
  return (
    <>
      <Space direction="vertical" style={{ display: 'flex', textAlign: 'center' }}>
        <Avatar src={avatar_url} size={120} />
        <Title level={3} style={{ marginBottom: 0 }}>
          {cn_name}
        </Title>
        {motto ? <Paragraph copyable>{motto}</Paragraph> : null}
      </Space>
      <Space direction="vertical" style={{ display: 'flex' }}>
        <Space>
          <Icon icon="ri:exchange-2-line" />
          {role_name}
        </Space>
        <Space>
          <Icon icon="ri:contacts-book-3-line" />
          {`${org_name}-${jobs_name}`}
        </Space>
        <Space>
          <Icon icon="ri:map-pin-line" />
          {getAreaName()}
          {address}
        </Space>
      </Space>
      <Divider dashed style={{ margin: '12px 0' }} />
      <div>
        <Col>
          <Title level={4}>标签</Title>
        </Col>
        <FigureLabels value={tags} canCallback />
      </div>
    </>
  );
};

export default LeftContent;
