import { createFromIconfontCN } from '@ant-design/icons'; // antd 图标
// 使用 iconfont.cn 资源
const IconFont = createFromIconfontCN({
    scriptUrl: process.env.ICONFONT_URL,
});
// 跨站点导航列表
export const appList = [
    {
        icon: 'https://cyan-blog.oss-cn-shenzhen.aliyuncs.com/global/avatar.jpg',
        title: '白雾茫茫丶',
        desc: '好好吃饭🍣好好睡觉💤敲敲代码💻谈谈恋爱💑',
        url: 'https://xmwpro.com/',
        target: '_blank',
    },
    {
        icon: <IconFont type="icon-GitHub" style={{ fontSize: '40px' }} />,
        title: 'Cyan-Xmw',
        desc: '立志成为一名优秀的前端工程师',
        url: 'https://github.com/Cyan-Xmw/',
        target: '_blank',
    },
    {
        icon: <IconFont type="icon-gitee" style={{ fontSize: '40px' }} />,
        title: 'Cyan-Xmw',
        desc: '立志成为一名优秀的前端工程师',
        url: 'https://gitee.com/Cyan-Xmw/',
        target: '_blank',
    },
    {
        icon: <IconFont type="icon-juejin" style={{ fontSize: '40px' }} />,
        title: '白雾茫茫丶',
        desc: '星光不问赶路人，岁月不负有心人',
        url: 'https://juejin.cn/user/1917147257534279/',
        target: '_blank',
    },
    {
        icon: 'https://xmwpro.oss-cn-beijing.aliyuncs.com/vue-admin-xmw-pro/logo.svg',
        title: 'vue3-admin-xmw',
        desc: '基于 Vue3.0 + TypeScript 的后台解决方案',
        url: 'http://vue3.xmwpro.com/',
        target: '_blank',
    },
    {
        icon: 'https://xmwpro.oss-cn-beijing.aliyuncs.com/vue-admin-xmw-pro/logo.svg',
        title: 'vue2-admin-xmw',
        desc: '基于 Vue2.0 + ElementUI 的后台解决方案',
        url: 'http://vue2.xmwpro.com/',
        target: '_blank',
    },
    {
        icon: <IconFont type="icon-Vue" style={{ fontSize: '40px' }} />,
        title: 'vue3-element-table',
        desc: '基于 Vue3 + Element-plus 封装的 Table 组件',
        url: 'https://ele-plus-table.xmwpro.com/',
        target: '_blank',
    },
    {
        icon: <IconFont type="icon-Vue" style={{ fontSize: '40px' }} />,
        title: 'vue3-element-form',
        desc: '基于 Vue3 + Element-plus 封装的 Form 组件',
        url: 'https://ele-plus-form.xmwpro.com/',
        target: '_blank',
    },
]