/*
 * @Description: 国际化-表格列表
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-17 12:16:58
 */
// 引入第三方库
import { FC, useState, useRef } from 'react';
import { ProTable } from '@ant-design/pro-components' // antd 高级组件
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ClockCircleOutlined, EditOutlined, DeleteOutlined, DownOutlined, ClusterOutlined } from '@ant-design/icons' // antd 图标库
import { Tag, Space, Button, Modal, message, Dropdown, Menu } from 'antd' // antd 组件库
import moment from 'moment'

// 引入业务组件
import { getOrganizationList, delOrganization } from '@/services/administrative/organization' // 组织管理接口
import FormTemplate from './FormTemplate'  // 表单组件
import { TableItem } from '../utils/interface' //interface 接口
import { ORG_TYPE_TAGS } from '../utils/enum'

const TableTemplate: FC = () => {
    // 获取表格实例
    const tableRef = useRef<ActionType>();
    // 获取树形数据传递给drawerForm
    const [treeData, setTreeData] = useState<any>([])
    // 当前行数据
    const [record, setRecord] = useState<TableItem>()
    // 判断是否是添加子级
    const [parent_id, set_parent_id] = useState<string | undefined>('')
    // 手动触发刷新表格
    function reloadTable() {
        tableRef?.current?.reload()
    }
    // 删除列表
    const handlerDelete = async (org_id: string) => {
        Modal.confirm({
            title: '您确认要删除这条数据吗？',
            content: '删除后无法恢复，请谨慎操作',
            onOk: async () => {
                await delOrganization(org_id).then(res => {
                    if (res.resCode === 200) {
                        message.success(res.resMsg)
                        // 刷新表格
                        reloadTable()
                    }
                })
            }
        })

    }
    //    下拉框菜单渲染
    const DropdownMenu = (
        <Menu
            items={[
                {
                    label: <FormTemplate
                        treeData={treeData}
                        reloadTable={reloadTable}
                        parent_id={parent_id}
                        triggerDom={<Button type="text" size="small" icon={<ClusterOutlined />}>添加子级</Button>}
                    />,
                    key: 'addChild',
                },
                {
                    label: <FormTemplate
                        treeData={treeData}
                        reloadTable={reloadTable}
                        formData={record}
                        triggerDom={<Button type="text" size="small" icon={<EditOutlined />}>编辑</Button>}
                    />,
                    key: 'edit',
                },
                {
                    label: <Button type="text" size="small" icon={<DeleteOutlined />} onClick={() => handlerDelete(record?.org_id)} >删除</Button>,
                    key: 'delete',
                },
            ]}
        />
    );

    // 操作下拉框
    const dropdownMenuClick = (record: TableItem) => {
        setRecord(record)
        set_parent_id(record?.org_id)
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
            filters: true,
            onFilter: true,
            valueEnum: ORG_TYPE_TAGS,
            render: (_, record) => <Tag color={ORG_TYPE_TAGS[record.org_type].color}>{ORG_TYPE_TAGS[record.org_type].text}</Tag>
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 100,
            filters: true,
            onFilter: true,
            valueEnum: {
                0: { text: '禁用', status: 'Default' },
                1: { text: '正常', status: 'Success' },
            },
        },
        {
            title: '创建时间',
            dataIndex: 'created_time',
            valueType: 'date',
            hideInSearch: true,
            render: text => (
                <Space>
                    <ClockCircleOutlined /><span>{text}</span>
                </Space>
            )
        },
        {
            title: '创建时间',
            dataIndex: 'created_time',
            valueType: 'dateRange',
            hideInTable: true,
            search: {
                transform: (value) => {
                    return {
                        start_time: moment(value[0]._d).format('YYYY-MM-DD 00:00:00'),
                        end_time: moment(value[1]._d).format('YYYY-MM-DD 23:59:59'),
                    };
                },
            },
        },
        {
            title: '描述',
            dataIndex: 'describe',
            ellipsis: true,
            hideInSearch: true
        },
        {
            title: '操作',
            valueType: 'option',
            width: 120,
            align: 'center',
            key: 'option',
            render: (_, record) => [
                <Dropdown overlay={DropdownMenu} onOpenChange={() => dropdownMenuClick(record)} key="operation"><Button size="small">操作<DownOutlined /></Button></Dropdown>
            ]
        },
    ]

    return (
        <ProTable<TableItem>
            actionRef={tableRef}
            columns={columns}
            request={async params => {
                {
                    // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
                    // 如果需要转化参数可以在这里进行修改
                    const { resData, resCode } = await getOrganizationList(params)
                    setTreeData(resData)
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