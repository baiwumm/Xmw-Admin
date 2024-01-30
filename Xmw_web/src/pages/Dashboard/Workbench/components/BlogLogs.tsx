/*
 * @Description: 博客日志
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-10-11 10:02:20
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-01-29 09:29:15
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
      link: 'https://baiwumm.com/p/cy55lsqi',
    },
    {
      title: '基于 Vue2.0 + Egg.js 的后台应用',
      content: 'Vue2 Admin 是一个后台管理系统解决方案，采用前后端分离技术开发。它使用了最新的技术栈，提供了丰富的功能组件，希望本项目可以帮助到您。',
      link: 'https://baiwumm.com/p/umcaj6q8',
    },
    {
      title: 'JS 中的二进制散列值和权限设计',
      content: '这篇文章介绍了在JavaScript中使用二进制散列值和位运算符来实现权限设计。作者讨论了权限控制的场景和常见的权限类型，并介绍了JavaScript中提供的进制表示方法和位运算符的应用。作者还提到了位运算符在传统权限系统中解决权限关联和组合的优势，并给出了使用按位或、按位与和按位非来添加、校验和剔除权限的示例。文章提到了位运算符方案的前提条件。',
      link: 'https://baiwumm.com/p/ts9wfscw',
    },
    {
      title: '箭头函数的意义和函数的二义性',
      content: '这篇文章介绍了箭头函数的特点以及与普通函数的区别。它指出了箭头函数没有this、arguments对象和prototype原型的特点，因此不能作为构造函数使用。文章还解释了函数的二义性问题，即函数可以有多种调用方式，这在JS设计上存在缺陷。最后，文章指出箭头函数不再依赖面向对象的概念，因此没有this和原型的概念。',
      link: 'https://baiwumm.com/p/gar7jcvz',
    },
    {
      title: '对象解构与迭代器的猫腻？',
      content: '这篇文章介绍了变量的解构赋值技巧在前端开发中的常用性，包括对象解构和数组解构。文章中给出了一些代码示例，解释了可迭代对象的概念以及如何使用迭代协议来实现数组解构。此外，文章还介绍了生成器的概念并提供了代码示例。作者建议对这些概念不熟悉的读者可以查阅ES6的文档来更好地理解。',
      link: 'https://baiwumm.com/p/ek5luclv',
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