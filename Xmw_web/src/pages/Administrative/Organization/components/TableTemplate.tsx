/*
 * @Description: 用户管理-表格列表
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-14 17:59:25
 */
// 引入第三方库
import { FC, useState, useRef } from 'react';
import { ProTable } from '@ant-design/pro-components' // antd 高级组件
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ClockCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons' // antd 图标库
import { Tag, Space, Button, Popconfirm, message } from 'antd' // antd 组件库

// 引入业务组件
import { getOrganizationList, delOrganization } from '@/services/administrative/organization' // 组织管理接口
import FormTemplate from './FormTemplate'  // 表单组件
import { TableItem } from '../utils/interface' //interface 接口
import { ORG_TYPE_TAGS } from '../utils/enum'

const TableTemplate: FC = () => {
    // 获取表格实例
    const tableRef = useRef<ActionType>();
    // 获取树形数据传递给drawerForm
    const [treeData, setTreeData] = useState([])
    // 判断是否显示drawerForm，用于编辑操作
    // const [drawerVisit, setDrawerVisit] = useState(false);
    // 手动触发刷新表格
    function reloadTable() {
        tableRef.current.reload()
    }
    // 定义表格操作组件
    const deleteOrganization = (record: any) => (
        <Popconfirm title="你确认要删除吗" onConfirm={e => handlerDelete(record.org_id)} okText="是" cancelText="否">
            <Button key="delete" type="link" size="small" icon={<DeleteOutlined />} danger>删除</Button>
        </Popconfirm>
    );
    // 删除列表
    const handlerDelete = async (org_id: string | undefined) => {
        if (org_id) {
            await delOrganization(org_id).then(res => {
                if (res.resCode === 200) {
                    message.success(res.resMsg)
                    // 刷新表格
                    reloadTable()
                }
            })
        }
    }
    /**
 * @description: proTable columns 配置项
 * @return {*}
 * @author: Cyan
 */
    const columns: ProColumns<TableItem>[] = [
        {
            title: '组织名称',
            dataIndex: 'org_name',
            ellipsis: true,
            render: text => <Tag color="processing">{text}</Tag>
        },
        {
            title: '组织编码',
            dataIndex: 'org_code',
            ellipsis: true,
            render: text => <Tag color="cyan">{text}</Tag>
        },
        {
            title: '组织类型',
            dataIndex: 'org_type',
            render: (_, record) => <Tag color={ORG_TYPE_TAGS[record.org_type].color}>{ORG_TYPE_TAGS[record.org_type].text}</Tag>
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 80,
            valueEnum: {
                0: { text: '禁用', status: 'Default' },
                1: { text: '正常', status: 'Success' },
            },
        },
        {
            title: '创建时间',
            dataIndex: 'created_time',
            valueType: 'date',
            render: text => (
                <Space>
                    <ClockCircleOutlined /><span>{text}</span>
                </Space>
            )
        },
        {
            title: '操作',
            valueType: 'option',
            width: 150,
            key: 'option',
            render: (_, record) => [
                <FormTemplate treeData={treeData} reloadTable={reloadTable} formData={record} triggerDom={<Button key="edit" type="link" size="small" icon={<EditOutlined />}>编辑</Button>} />,
                deleteOrganization(record)
            ],
        },
    ]

    return (
        <ProTable<TableItem>
            actionRef={tableRef}
            columns={columns}
            request={async (params = {}) => {
                {
                    // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
                    // 如果需要转化参数可以在这里进行修改
                    const { resData, resCode } = await getOrganizationList(params);
                    resData && setTreeData(resData)
                    return {
                        data: resData,
                        // success 请返回 true，
                        // 不然 table 会停止解析数据，即使有数据
                        success: resCode === 200,
                        // 不传会使用 data 的长度，如果是分页一定要传
                        total: resData?.length,
                    }
                }
            }
            }
            rowKey="org_id"
            pagination={false}
            // 工具栏
            toolBarRender={() => [
                <FormTemplate treeData={treeData} reloadTable={reloadTable} />
            ]}
        >

        </ProTable>
    )
}
export default TableTemplate