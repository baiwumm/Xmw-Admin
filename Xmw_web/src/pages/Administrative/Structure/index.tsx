/*
 * @Description: 
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-24 11:16:36
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-30 11:12:27
 */
import type { FC } from 'react';
import { useState } from 'react'
import { useIntl } from '@umijs/max'
import { Space, Checkbox, Select } from 'antd'
// import { useRequest } from '@umijs/max'
import { useBoolean } from 'ahooks';
import { PageContainer, ProCard } from '@ant-design/pro-components' // antd 高级组件
import OrgTree from 'react-org-tree';
// import { getJobsList } from '@/services/administrative/jobs-management' // 岗位管理接口
// import { getOrganizationList } from '@/services/administrative/organization' // 组织管理接口
import styles from './index.less'

const Structure: FC = () => {
    const { formatMessage } = useIntl();
    const labelClassNameItem = [
        { value: 'bg-primary', label: '主题背景' },
        { value: 'bg-white', label: '洁白无瑕' },
        { value: 'bg-orange', label: '金橙' },
        { value: 'bg-gold', label: '金光灿灿' },
        { value: 'bg-gray', label: '珊瑚灰' },
        { value: 'bg-lightpink', label: '姹紫嫣红' },
        { value: 'bg-chocolate', label: '黑朱古力' },
        { value: 'bg-tomato', label: '红彤彤' }
    ]
    // 获取组织树形数据
    // const { data:orgTree} = useRequest(getOrganizationList);
    // // 获取岗位树形数据
    // const { data:jobsTree} = useRequest(getJobsList);
    const data = {
        id: 0,
        label: 'XXX股份有限公司',
        children: [{
            id: 1,
            label: '技术部',
            children: [{
                id: 4,
                label: '后端工程师'
            }, {
                id: 5,
                label: '前端工程师'
            }, {
                id: 6,
                label: '运维工程师'
            }]
        }, {
            id: 2,
            label: '人事部'
        }, {
            id: 3,
            label: '销售部'
        }]
    }
    // true：纵向  false：横向
    const [horizontal, { set: setHorizontal }] = useBoolean(false);
    // true：可折叠 false：不可折叠
    const [collapsable, { set: setCollapsable }] = useBoolean(true);
    // true: 全部展开 false：全部折叠 
    const [expandAll, { set: setExpandAll }] = useBoolean(true);
    const [labelClassName, setLabelClassName] = useState('bg-primary')
    return (
        <PageContainer title={formatMessage({ id: 'pages.administrative.structure' })}>
            <ProCard layout="center" direction="column">
                <Space>
                    <Checkbox checked={horizontal} onChange={e => setHorizontal(e.target.checked)}>垂直展示</Checkbox>
                    <Checkbox checked={collapsable} onChange={e => setCollapsable(e.target.checked)}>折叠节点</Checkbox>
                    <Checkbox checked={expandAll} onChange={e => setExpandAll(e.target.checked)}>全部展开</Checkbox>
                    <Select defaultValue={labelClassName} options={labelClassNameItem} onChange={value => setLabelClassName(value)} />
                </Space>
                <OrgTree
                    data={data}
                    horizontal={horizontal}
                    collapsable={collapsable}
                    expandAll={expandAll}
                    labelClassName={styles[labelClassName]}
                    props={{ label: 'org_name', children: 'children' }}
                />
            </ProCard>
        </PageContainer>
    )
}

export default Structure