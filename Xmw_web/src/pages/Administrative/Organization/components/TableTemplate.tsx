/*
 * @Description: 组织管理-表格列表
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-31 17:29:24
 */
// 引入第三方库
import type { FC } from 'react';
import { useState, useRef } from 'react';
import { useIntl, useModel } from '@umijs/max'
import { ProTable, TableDropdown } from '@ant-design/pro-components' // antd 高级组件
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ClockCircleOutlined, EditOutlined, DeleteOutlined, DownOutlined, ClusterOutlined, createFromIconfontCN } from '@ant-design/icons' // antd 图标库
import { Tag, Space, Button, Modal, message } from 'antd' // antd 组件库
import moment from 'moment'

// 引入业务组件
import { getOrganizationList, delOrganization } from '@/services/administrative/organization' // 组织管理接口
import FormTemplate from './FormTemplate'  // 表单组件
import { ORG_TYPE_TAGS } from '../utils/enum'
import type { ResData } from '@/global/interface'

const TableTemplate: FC = () => {
    const { formatMessage } = useIntl();
    // 初始化状态
    const { initialState } = useModel('@@initialState');
    // 使用 iconfont.cn 资源
    const IconFont = createFromIconfontCN({
        scriptUrl: process.env.ICONFONT_URL,
    });
    // 获取表格实例
    const tableRef = useRef<ActionType>();
    // 获取树形数据传递给drawerForm
    const [treeData, setTreeData] = useState<API.ORGANIZATION[]>([])
    // 当前行数据
    const [currentRecord, setCurrentRecord] = useState<API.ORGANIZATION>()
    // 判断是否是添加子级
    const [parent_id, set_parent_id] = useState<string | undefined>('')
    // 手动触发刷新表格
    function reloadTable() {
        tableRef?.current?.reload()
    }
    // 删除列表
    const handlerDelete = async (org_id: string | undefined) => {
        Modal.confirm({
            title: formatMessage({ id: 'global.message.delete.title' }),
            content: formatMessage({ id: 'global.message.delete.content' }),
            onOk: async () => {
                return new Promise<void>(async (resolve, reject): Promise<void> => {
                    if (org_id) {
                        await delOrganization(org_id).then(res => {
                            if (res.code === 200) {
                                message.success(res.msg)
                                // 刷新表格
                                reloadTable()
                                resolve()
                            }
                        })
                        reject()
                    }
                })

            }
        })

    }
    /**
    * @description: 渲染操作下拉菜单子项
    * @param {API} record
    * @return {*}
    * @author: Cyan
    */
    const DropdownMenu = (record: API.ORGANIZATION) => {
        return (
            [
                {
                    name: <FormTemplate
                        treeData={treeData}
                        reloadTable={reloadTable}
                        parent_id={parent_id}
                        triggerDom={
                            <Button
                                type="text"
                                size="small"
                                icon={<ClusterOutlined />}
                                block
                                onClick={() => set_parent_id(record?.org_id)}
                            >
                                {formatMessage({ id: 'menu.administrative.organization.add-child' })}
                            </Button>}
                    />,
                    key: 'addChild',
                },
                {
                    name: <FormTemplate
                        treeData={treeData}
                        reloadTable={reloadTable}
                        formData={currentRecord}
                        triggerDom={
                            <Button
                                type="text"
                                size="small"
                                icon={<EditOutlined />}
                                block
                                onClick={() => setCurrentRecord(record)}
                            >
                                {formatMessage({ id: 'menu.administrative.organization.edit' })}
                            </Button>}
                    />,
                    key: 'edit',
                },
                {
                    name: <Button
                        block
                        type="text"
                        size="small"
                        icon={<DeleteOutlined />} onClick={() => handlerDelete(record?.org_id)} >
                        {formatMessage({ id: 'menu.administrative.organization.delete' })}
                    </Button>,
                    key: 'delete',
                },
            ]
        );
    }

    /**
* @description: proTable columns 配置项
* @return {*}
* @author: Cyan
*/
    const columns: ProColumns<API.ORGANIZATION>[] = [
        {
            title: formatMessage({ id: 'pages.administrative.organization.org_name' }),
            dataIndex: 'org_name',
            ellipsis: true,
            render: text => <Space><IconFont type="icon-organization" style={{ color: initialState?.settings?.colorPrimary, fontSize: '16px' }} /><span>{text}</span></Space>
        },
        {
            title: formatMessage({ id: 'pages.administrative.organization.org_code' }),
            dataIndex: 'org_code',
            ellipsis: true,
            render: text => <Tag color="cyan">{text}</Tag>
        },
        {
            title: formatMessage({ id: 'pages.administrative.organization.org_type' }),
            dataIndex: 'org_type',
            filters: true,
            onFilter: true,
            valueEnum: ORG_TYPE_TAGS,
            render: (_, record) => <Tag color={ORG_TYPE_TAGS[record.org_type].color}>{ORG_TYPE_TAGS[record.org_type].text}</Tag>
        },
        {
            title: formatMessage({ id: 'global.status' }),
            dataIndex: 'status',
            width: 100,
            filters: true,
            onFilter: true,
            valueEnum: {
                disable: { text: formatMessage({ id: 'global.status.disable' }), status: 'Default' },
                normal: { text: formatMessage({ id: 'global.status.normal' }), status: 'Processing' },
            },
        },
        {
            title: formatMessage({ id: 'global.table.sort' }),
            dataIndex: 'sort',
            ellipsis: true,
            hideInSearch: true,
            width: 100,
            sorter: true,
            render: text => <Tag color="purple">{text}</Tag>
        },
        {
            title: formatMessage({ id: 'global.table.created_time' }),
            dataIndex: 'created_time',
            valueType: 'date',
            hideInSearch: true,
            sorter: true,
            render: text => (
                <Space>
                    <ClockCircleOutlined /><span>{text}</span>
                </Space>
            )
        },
        {
            title: formatMessage({ id: 'global.table.created_time' }),
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
            title: formatMessage({ id: 'global.table.describe' }),
            dataIndex: 'describe',
            ellipsis: true,
            hideInSearch: true
        },
        {
            title: formatMessage({ id: 'global.table.operation' }),
            valueType: 'option',
            width: 120,
            align: 'center',
            key: 'option',
            render: (_, record) => [
                <TableDropdown key="actionGroup" menus={DropdownMenu(record)}>
                    <Button size="small">
                        {formatMessage({ id: 'global.table.operation' })}
                        <DownOutlined />
                    </Button>
                </TableDropdown>,
            ]
        },
    ]

    return (
        <ProTable<API.ORGANIZATION>
            actionRef={tableRef}
            columns={columns}
            request={async params => {
                {
                    // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
                    // 如果需要转化参数可以在这里进行修改
                    let result: ResData = {}
                    await getOrganizationList(params).then(res => {
                        result = res
                        setTreeData(result.data)
                    })
                    return {
                        data: result.data,
                        // success 请返回 true，
                        // 不然 table 会停止解析数据，即使有数据
                        success: result.code === 200,
                        // 不传会使用 data 的长度，如果是分页一定要传
                        total: result.data?.length,
                    }
                }
            }
            }
            rowKey="org_id"
            pagination={false}
            // 工具栏
            toolBarRender={() => [
                <FormTemplate treeData={treeData} reloadTable={reloadTable} key="FormTemplate" />
            ]}
        />
    )
}
export default TableTemplate