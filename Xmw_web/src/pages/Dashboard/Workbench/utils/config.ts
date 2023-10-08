/**
 * @description: 最新动态
 * @Author: 白雾茫茫丶
 */
type LatestNewsTypes = {
  title: string,
  content: string,
  link: string
}
export const latestNews: LatestNewsTypes[] = [
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

/**
 * @description: 项目主要技术栈
 * @author: 白雾茫茫丶
 */
export const technologyStack = [
  {
    title: 'React',
    value: 'React',
    description: '构建 Web 和原生交互界面的库',
    avatar: 'icon-react',
  },
  {
    title: 'Nest',
    value: 'Nest',
    description: 'Nest (NestJS) 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的开发框架。',
    avatar: 'icon-nest',
  },
  {
    title: 'Ant Design',
    value: 'Antd',
    description: '一套企业级 UI 设计语言和 React 组件库',
    avatar: 'icon-ant-design',
  },
  {
    title: 'Umi',
    value: 'Umi',
    description: 'Umi，中文发音为「乌米」，是可扩展的企业级前端应用框架。',
    avatar: 'icon-umi',
  },
]