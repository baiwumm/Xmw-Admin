/*
 * @Description: 博客日志
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-10-11 10:02:20
 * @LastEditors: 白雾茫茫丶<843348394@qq.com>
 * @LastEditTime: 2023-12-01 09:15:46
 */
import { useIntl } from '@umijs/max'
import { Avatar, Card, List, Tooltip } from 'antd'
import { FC, ReactNode } from 'react'

import { formatPerfix } from '@/utils'
import { ROUTES } from '@/utils/enums'

type LatestNewsTypes = {
  title: string,
  content: string,
  link: string
}

type BlogLogsProps = {
  renderSecondary: (content: string, row?: number) => ReactNode;
}

const BlogLogs: FC<BlogLogsProps> = ({ renderSecondary }) => {
  // 国际化工具
  const { formatMessage } = useIntl();
  /**
 * @description: 最新动态
 * @Author: 白雾茫茫丶
 */
  const latestNews: LatestNewsTypes[] = [
    {
      title: '基于 Vue3 + TypeScript + Vite + Egg.js 开发的后台应用',
      content: 'Vue3 Admin 基于 Vben Admin 二次开发，它使用了全新的技术栈：Vue3、Vite、TypeScript等，提供了完善的前后端权限管理方案，丰富的主题配置及黑暗主题适配，对日常使用频率较高的组件二次封装,满足基础工作需求，希望本项目可以帮助到您。',
      link: 'https://baiwumm.com/post/ee4e2857.html',
    },
    {
      title: '基于 Vue2.0 + Egg.js 的后台应用',
      content: 'Vue2 Admin 是一个后台管理系统解决方案，采用前后端分离技术开发。它使用了最新的技术栈，提供了丰富的功能组件，希望本项目可以帮助到您。',
      link: 'https://baiwumm.com/post/5b5885ee.html',
    },
    {
      title: 'JS 中的二进制散列值和权限设计',
      content: '这篇文章介绍了在JavaScript中使用二进制散列值和位运算符来实现权限设计。作者讨论了权限控制的场景和常见的权限类型，并介绍了JavaScript中提供的进制表示方法和位运算符的应用。作者还提到了位运算符在传统权限系统中解决权限关联和组合的优势，并给出了使用按位或、按位与和按位非来添加、校验和剔除权限的示例。文章提到了位运算符方案的前提条件。',
      link: 'https://baiwumm.com/post/32205ec4.html',
    },
    {
      title: '为博客添加 Algolia 全局搜索',
      content: 'Algolia 是一个数据库实时搜索服务，能够提供毫秒级的数据库搜索服务，并且其服务能以 API 的形式方便地布局到网页、客户端、APP 等多种场景。',
      link: 'https://baiwumm.com/post/3871aa5b.html',
    },
    {
      title: '在 vite 中使用 glob 实现约定式路由',
      content: '约定式路由也叫文件路由，就是不需要手写配置，文件系统即路由，通过目录和文件及其命名分析出路由配置。使用过 React 的同学应该都接触过 Umi 约定式路由 。',
      link: 'https://baiwumm.com/post/50b97751.html',
    },
  ]
  return (
    <Card title={formatMessage({ id: formatPerfix(ROUTES.WORKBENCH, 'blog-log') })}>
      <List
        pagination={{ position: 'bottom', align: 'start' }}
        dataSource={latestNews}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Tooltip title={formatMessage({ id: formatPerfix(ROUTES.WORKBENCH, 'blog-tip') })}>
                  <a href="https://baiwumm.com/" target='_blank'>
                    <Avatar src='https://cdn.baiwumm.com/avatar.jpg' />
                  </a>
                </Tooltip>
              }
              title={<a href={item.link} target='_blank'>{item.title}</a>}
              description={renderSecondary(item.content, 2)}
            />
          </List.Item>
        )}
      />
    </Card>
  )
}
export default BlogLogs