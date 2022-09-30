/*
 * @Description: 岗位管理-表格列表
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-30 11:19:47
 */
// 引入第三方库
import type { FC } from 'react';
import { useState, useRef } from 'react';
import { useIntl, useRequest, useModel } from '@umijs/max'
import { ProTable } from '@ant-design/pro-components' // antd 高级组件
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ClockCircleOutlined, EditOutlined, DeleteOutlined, DownOutlined, ClusterOutlined, createFromIconfontCN } from '@ant-design/icons' // antd 图标库
import { Tag, Space, Button, Modal, message, Dropdown, Menu } from 'antd' // antd 组件库
import moment from 'moment'

// 引入业务组件
import { getJobsList, delJobs } from '@/services/administrative/jobs-management' // 岗位管理接口
import { getOrganizationList } from '@/services/administrative/organization' // 组织管理接口
import FormTemplate from './FormTemplate'  // 表单组件

const TableTemplate: FC = () => {
    const { formatMessage } = useIntl();
    // 初始化状态
    const { initialState } = useModel('@@initialState');
    // 使用 iconfont.cn 资源
    const IconFont = createFromIconfontCN({
        scriptUrl: process.env.ICONFONT_URL,
    });
    // 获取组织树形数据
    const { data: orgTree }: any = useRequest(getOrganizationList);
    // 获取表格实例
    const tableRef = useRef<ActionType>();
    // 获取树形数据传递给drawerForm
    const [treeData, setTreeData] = useState<API.JOBSMANAMENT[]>([])
    // 当前行数据
    const [currentRecord, setCurrentRecord] = useState<API.JOBSMANAMENT>()
    // 判断是否是添加子级
    const [parent_id, set_parent_id] = useState<string | undefined>('')
    // 手动触发刷新表格
    function reloadTable() {
        tableRef?.current?.reload()
    }
    // 删除列表
    const handlerDelete = async (jobs_id: string | undefined) => {
        Modal.confirm({
            title: formatMessage({ id: 'global.message.delete.title' }),
            content: formatMessage({ id: 'global.message.delete.content' }),
            onOk: async () => {
                if (jobs_id) {
                    await delJobs(jobs_id).then(res => {
                        if (res.resCode === 200) {
                            message.success(res.resMsg)
                            // 刷新表格
                            reloadTable()
                        }
                    })
                }
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
                        orgTree={orgTree}
                        triggerDom={<Button type="text" size="small" icon={<ClusterOutlined />} block>{formatMessage({ id: 'menu.administrative.jobs-management.add-child' })}</Button>}
                    />,
                    key: 'addChild',
                },
                {
                    label: <FormTemplate
                        treeData={treeData}
                        reloadTable={reloadTable}
                        formData={currentRecord}
                        orgTree={orgTree}
                        triggerDom={<Button type="text" size="small" icon={<EditOutlined />} block>{formatMessage({ id: 'menu.administrative.jobs-management.edit' })}</Button>}
                    />,
                    key: 'edit',
                },
                {
                    label: <Button
                        type="text"
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={() => handlerDelete(currentRecord?.jobs_id)}
                        block>
                        {formatMessage({ id: 'menu.administrative.jobs-management.delete' })}
                    </Button>,
                    key: 'delete',
                },
            ]}
        />
    );

    // 操作下拉框
    const dropdownMenuClick = (record: API.JOBSMANAMENT) => {
        setCurrentRecord(record)
        set_parent_id(record?.jobs_id)
    }
    /**
* @description: proTable columns 配置项
* @return {*}
* @author: Cyan
*/
    const columns: ProColumns<API.JOBSMANAMENT>[] = [
        {
            title: formatMessage({ id: 'pages.administrative.jobs-management.jobs_name' }),
            dataIndex: 'jobs_name',
            ellipsis: true,
            render: text => <Space><IconFont type="icon-jobs-management" style={{ color: initialState?.settings?.colorPrimary, fontSize: '16px' }} /><span>{text}</span></Space>
        },
        {
            title: formatMessage({ id: 'pages.administrative.jobs-management.org_name' }),
            dataIndex: 'org_id',
            ellipsis: true,
            valueType: 'treeSelect',
            fieldProps: {
                allowClear: true,
                fieldNames: {
                    label: 'org_name',
                    value: 'org_id'
                },
                options: orgTree,
                placeholder: formatMessage({ id: 'global.form.placeholder.seleted' })
            },
            render: (_, record) => <Tag color={initialState?.settings?.colorPrimary}>{record.org_name}</Tag>
        },
        {
            title: formatMessage({ id: 'global.table.sort' }),
            dataIndex: 'sort',
            ellipsis: true,
            hideInSearch: true,
            width: 100,
            render: text => <Tag color="purple">{text}</Tag>
        },
        {
            title: formatMessage({ id: 'global.table.created_time' }),
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
                <Dropdown
                    overlay={DropdownMenu}
                    onOpenChange={() => dropdownMenuClick(record)}
                    key="operation">
                    <Button size="small">
                        {formatMessage({ id: 'global.table.operation' })}
                        <DownOutlined />
                    </Button>
                </Dropdown>
            ]
        },
    ]

    return (
        <ProTable<API.JOBSMANAMENT>
            actionRef={tableRef}
            columns={columns}
            request={async params => {
                {
                    // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
                    // 如果需要转化参数可以在这里进行修改
                    let result: any = {}
                    await getJobsList(params).then(res => {
                        result = res
                        setTreeData(result.resData)
                    })
                    return {
                        data: result.resData,
                        // success 请返回 true，
                        // 不然 table 会停止解析数据，即使有数据
                        success: result.resCode === 200,
                        // 不传会使用 data 的长度，如果是分页一定要传
                        total: result.resData?.length,
                    }
                }
            }
            }
            rowKey="jobs_id"
            pagination={false}
            // 工具栏
            toolBarRender={() => [
                <FormTemplate treeData={treeData} reloadTable={reloadTable} orgTree={orgTree} key="FormTemplate" />
            ]}
        />
    )
}
export default TableTemplate