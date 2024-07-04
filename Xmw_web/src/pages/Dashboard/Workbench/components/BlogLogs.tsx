/*
 * @Description: 博客日志
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-10-11 10:02:20
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-04 11:00:18
 */
import { useIntl } from '@umijs/max';
import { Avatar, Card, List, Tooltip } from 'antd';
import { FC, ReactNode } from 'react';

import { formatPerfix } from '@/utils';
import { ROUTES } from '@/utils/enums';

type LatestNewsTypes = {
  title: string;
  content: string;
  link: string;
};

type BlogLogsProps = {
  renderSecondary: (content: string, row?: number) => ReactNode;
};

const BlogLogs: FC<BlogLogsProps> = ({ renderSecondary }) => {
  // 国际化工具
  const { formatMessage } = useIntl();
  /**
   * @description: 最新动态
   * @Author: 白雾茫茫丶
   */
  const latestNews: LatestNewsTypes[] = [
    {
      title: 'Nuxt3 实战 (一)：初始化项目',
      content:
        '这篇文章介绍了Nuxt框架的基本信息，包括什么是Nuxt以及Nuxt3的优点。文章还介绍了Nuxt3的一些特点，如服务端渲染和静态站点生成、模块化、文件系统路由等。此外，文章还提供了项目安装的步骤和目录结构。最后，文章提到了下一步计划，即配置 Eslint、Prettier、Husky、lint-staged、commitlit项目提交规范的过程。',
      link: 'https://baiwumm.com/p/ttshhdhg',
    },
    {
      title: 'Nuxt3 实战 (二)：配置 Eslint、Prettierrc、Husky等项目提交规范',
      content:
        '这篇文章介绍了项目规范的重要性和如何配置一些工具来提高代码质量、团队协作、降低维护成本、提升软件可靠性和促进项目管理。工具介绍了Eslint和Prettier，并且提供了安装和配置的步骤。文章还提到了如何配置Husky和Commitlint来检查提交风格的规范性，并最后提到了需要使用 release-it 自动管理版本号和生成 CHANGELOG 的任务。',
      link: 'https://baiwumm.com/p/drggt0zp',
    },
    {
      title: 'Nuxt3 实战 (三)：使用 release-it 自动管理版本号和生成 CHANGELOG',
      content:
        '这篇文章介绍了如何使用release-it工具实现以下功能：增加版本号并提交Git、生成变更日志（Changelog）并提交到Git、创建Git标签并推送到远程仓库、发布到npm等软件仓库、在GitHub、GitLab等平台创建发行版。文章还提到了前置知识，介绍了SemVer规范的内容和安装依赖的步骤。在文章的最后，展示了使用release-it生成的效果预览、git打的标签Tag以及待办事项（Todo）。最后还提到了安装NuxtUI。',
      link: 'https://baiwumm.com/p/hb2w09qj',
    },
    {
      title: 'Nuxt3 实战 (四)：安装 Nuxt UI 和配置 Typescript 类型检查',
      content:
        '这篇文章介绍了在项目中安装和配置Nuxt UI以及TypeScript的步骤。作者在前言中提到考虑了AntDesignVue和Element-Plus，但最终选择了NuxtUI，因为它更适合年轻化的项目，并且与Nuxt兼容。安装Nuxt UI需要执行一系列命令，同时会自动安装一些相关模块。然后，可以在Nuxt应用中使用Nuxt UI的所有组件和可组合函数。此外，还介绍了如何添加图标库和配置TypeScript。',
      link: 'https://baiwumm.com/p/z4wjhf1e',
    },
    {
      title: 'Nuxt3 实战 (五)：Header 头部布局',
      content:
        '这篇文章介绍了作者忙于公司系统迭代需求，但抽空完成了布局的Header部分。文章提到了需求的拆分，布局的组件拆分，并介绍了Nuxt框架以及安装和启用插件的步骤。还提到了白天暗黑模式切换组件和SVG跟随模式的组件的创建。最后，文章提到了PC端和移动端的最终实现效果，并给出了Github仓库和在线预览链接。',
      link: 'https://baiwumm.com/p/a644p9n3',
    },
    {
      title: 'Nuxt3 实战 (六)：Footer 底部布局',
      content:
        '这篇文章介绍了开发项目的Footer布局，参考了Nuxt-UI官网的布局。文章从需求拆分开始，讲解了准备工作和组件开发的过程。最后展示了最终效果，并进行了简单的总结，指出下一篇将讨论主体内容的开发。文末提供了Github仓库和线上预览的链接。',
      link: 'https://baiwumm.com/p/vtntq2kn',
    },
    {
      title: 'Nuxt3 实战 (七)：配置 Supabase 数据库',
      content:
        '这篇文章介绍了如何为Nuxt项目集成Supabase数据库。文章首先阐述了选择Supabase作为Nuxt项目的数据库的理由，包括其良好的网络评价、与Nuxt的良好集成以及对用户认证和身份鉴权的支持。接着，文章详细介绍了Supabase的特点，如使用PostgreSQL作为数据库、提供完整的认证系统、支持实时数据同步和提供对象存储服务等。然后，文章指导读者如何在Nuxt项目中安装和配置Supabase，包括设置重定向策略和获取数据库访问密钥。最后，文章强调了在开发环境和生产环境中使用不同密钥的重要性。',
      link: 'https://baiwumm.com/p/t5lnhnr4',
    },
    {
      title: 'Nuxt3 实战 (八)：优雅的实现暗黑主题模式',
      content:
        '这篇文章介绍了在Nuxt3中实现暗黑模式的过程。首先推荐使用color-mode库来轻易实现暗黑模式切换，并通过pnpm命令安装@nuxtjs/color-mode依赖。然后在nuxt.config.ts配置文件中注入依赖，并根据项目实际情况自定义配置。接着通过toggleDark函数实现切换动画，并在需要的地方加载组件<ColorMode/>，从而达到最终效果。',
      link: 'https://baiwumm.com/p/7id8e17v',
    },
    {
      title: 'Nuxt3 实战 (九)：使用 Supabase 实现 Github 认证鉴权',
      content:
        '这篇文章介绍了如何在Supabase中使用Github授权登录并实现用户身份验证。文章首先说明了Supabase采用postgresql的Row Level Security（RLS）机制来控制不同用户对数据表访问权限的重要性，然后详细介绍了配置Github OAuth Apps的过程，包括创建新的OAuth应用、填写项目信息、设置回调URL等步骤。接着，文章展示了在Nuxt3中实现登录界面的代码示例，最后总结了通过本教程可以学习到的技能，并预告了下一篇文章将介绍如何在Nuxt3中创建RESTful风格API并结合Supabase数据库完成CURD操作。',
      link: 'https://baiwumm.com/p/vd00ymbl',
    },
    {
      title: 'Nuxt3 实战 (十)：使用 Supabase 实现 RESTful 风格 API 接口',
      content:
        '这篇文章介绍了如何使用Supabase实现RESTful风格的API接口，用于网站分类和子站点的增删改查（CURD）功能。文章首先阐述了表设计，包括ds_categorys和ds_websites两张表的列名、类型和用途，并提到了为每张表添加的user_id和email字段以支持用户身份识别。接着，文章描述了接口设计，以ds_websites表为例，说明了如何通过RESTful API实现CURD功能，并给出了使用SupabaseClient实现插入数据的相关代码。文章最后提供了项目效果预览和总结，指出学习了Nuxt3创建接口及调用Supabase数据库操作，并强调了项目框架搭建完成后，需要添加数据、完善优化以及根据个人喜好添加额外功能。同时，提供了一个Github仓库链接和一个线上预览地址。',
      link: 'https://baiwumm.com/p/o9ai07iz',
    },
    {
      title: 'Nuxt3 实战 (十一)：添加路由 Transition 过渡效果和 Loading 动画',
      content:
        '这篇文章介绍了Nuxt3框架中页面和布局的过渡效果设置方法，以及首屏加载动画的添加。通过配置nuxt.config.ts文件和添加CSS样式，可以实现页面过渡效果。同时，文章也提到了在页面中设置不同的过渡效果和为布局和页面同时设置过渡效果的方法。最后，文章以一个Github仓库链接和一个线上预览地址作为总结，表示遵循官方文档操作即可完成相关设置。',
      link: 'https://baiwumm.com/p/p4ys3wys',
    },
    {
      title: 'Nuxt3 实战 (十二)：SEO 搜索引擎优化指南',
      content:
        '这篇文章介绍了如何为Nuxt.js项目添加favicon图标和TDK（标题、描述、关键词），安装@nuxtjs/seo模块，以及如何设置Robots、Sitemap、OG Image、Schema.org、Experiments等。文章还提到了添加Google Analytics、Microsoft Clarity和Umami统计代码的方法。文章最后总结称，Nuxt.js 3集成了很多SEOModules，使开发者能够更加高效便捷地做好搜索引擎方面的优化。',
      link: 'https://baiwumm.com/p/elqpq1v2',
    },
  ];
  return (
    <Card title={formatMessage({ id: formatPerfix(ROUTES.WORKBENCH, 'blog-log') })}>
      <List
        pagination={{ position: 'bottom', align: 'start', pageSize: 5 }}
        dataSource={latestNews}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Tooltip title={formatMessage({ id: formatPerfix(ROUTES.WORKBENCH, 'blog-tip') })}>
                  <a href="https://baiwumm.com/" target="_blank">
                    <Avatar src="https://cdn.baiwumm.com/avatar.jpg" />
                  </a>
                </Tooltip>
              }
              title={
                <a href={item.link} target="_blank">
                  {item.title}
                </a>
              }
              description={renderSecondary(item.content, 2)}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};
export default BlogLogs;
