/*
 * @Description: 项目技术栈
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-10-11 09:04:26
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-05 09:28:10
 */
import { CheckCard } from '@ant-design/pro-components';
import { Icon, useIntl } from '@umijs/max';
import { Avatar, Card, Col, Row } from 'antd';
import { FC, ReactNode } from 'react';

import { formatPerfix } from '@/utils';
import { ROUTES } from '@/utils/enums';
import type { UmiIcon } from '@/utils/types';

type TechnologyStackList = {
  title: string;
  value: string;
  description: string;
  avatar: UmiIcon;
};

type TechnologyStackProps = {
  renderSecondary: (content: string, row?: number) => ReactNode;
};

const TechnologyStack: FC<TechnologyStackProps> = ({ renderSecondary }) => {
  // 国际化工具
  const { formatMessage } = useIntl();
  /**
   * @description: 项目主要技术栈
   * @author: 白雾茫茫丶
   */
  const technologyStack: TechnologyStackList[] = [
    {
      title: 'React',
      value: 'React',
      description: '构建 Web 和原生交互界面的库',
      avatar: 'ri:reactjs-fill',
    },
    {
      title: 'Nest',
      value: 'Nest',
      description:
        'Nest (NestJS) 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的开发框架。',
      avatar: 'local:nest',
    },
    {
      title: 'Ant Design',
      value: 'Antd',
      description: '一套企业级 UI 设计语言和 React 组件库',
      avatar: 'local:ant-design',
    },
    {
      title: 'Umi',
      value: 'Umi',
      description: 'Umi，中文发音为「乌米」，是可扩展的企业级前端应用框架。',
      avatar: 'local:umi',
    },
  ];
  return (
    <Card title={formatMessage({ id: formatPerfix(ROUTES.WORKBENCH, 'technology-stack') })}>
      <CheckCard.Group>
        <Row gutter={16} justify="center">
          {technologyStack?.map((item) => {
            return (
              <Col key={item.value} xs={24} sm={24} md={24} lg={24} xl={12}>
                <CheckCard
                  title={item.title}
                  description={renderSecondary(item.description)}
                  avatar={<Avatar size="large" icon={<Icon icon={item.avatar} />} />}
                  value={item.value}
                  style={{ width: '100%' }}
                />
              </Col>
            );
          })}
        </Row>
      </CheckCard.Group>
    </Card>
  );
};
export default TechnologyStack;
