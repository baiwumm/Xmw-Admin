import { createFromIconfontCN } from '@ant-design/icons'; // antd 图标
// 使用 iconfont.cn 资源
const IconFont = createFromIconfontCN({
    scriptUrl: process.env.ICONFONT_URL,
});
// 跨站点导航列表
export const appList = [
    {
        icon: 'https://cdn.baiwumm.com/blog/avatar.jpg!baiwu',
        title: '白雾茫茫丶',
        desc: '好好吃饭🍣好好睡觉💤敲敲代码💻谈谈恋爱💑',
        url: 'https://baiwumm.com/',
        target: '_blank',
    },
    {
        icon: <IconFont type="icon-GitHub" style={{ fontSize: '40px' }} />,
        title: 'baiwumm',
        desc: '立志成为一名优秀的前端工程师',
        url: 'https://github.com/baiwumm/',
        target: '_blank',
    },
    {
        icon: <IconFont type="icon-gitee" style={{ fontSize: '40px' }} />,
        title: 'baiwumm',
        desc: '立志成为一名优秀的前端工程师',
        url: 'https://gitee.com/baiwumm/',
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
        icon: 'https://cdn.baiwumm.com/project/vue3-admin/logo.png!baiwu',
        title: 'Vue3 Admin',
        desc: '基于 Vue3.0 + TypeScript 的后台解决方案',
        url: 'https://vue3.baiwumm.com/',
        target: '_blank',
    },
    {
        icon: 'https://cdn.baiwumm.com/project/vue2-admin/logo.svg',
        title: 'Vue2 Admin',
        desc: '基于 Vue2.0 + ElementUI 的后台解决方案',
        url: 'https://vue2.baiwumm.com/',
        target: '_blank',
    },
    {
        icon: <IconFont type="icon-Vue" style={{ fontSize: '40px' }} />,
        title: 'vue3-element-table',
        desc: '基于 Vue3 + Element-plus 封装的 Table 组件',
        url: 'https://ele-plus-table.baiwumm.com/',
        target: '_blank',
    },
    {
        icon: <IconFont type="icon-Vue" style={{ fontSize: '40px' }} />,
        title: 'vue3-element-form',
        desc: '基于 Vue3 + Element-plus 封装的 Form 组件',
        url: 'https://ele-plus-form.baiwumm.com/',
        target: '_blank',
    },
]