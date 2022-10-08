/*
 * @Description: 用户管理-表格列表
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-08 17:24:59
 */
// 引入第三方库
import type { FC } from 'react';
import { useState, useRef } from 'react';
import { useBoolean } from 'ahooks';
import { useIntl, useModel, useRequest } from '@umijs/max'
import { ProTable } from '@ant-design/pro-components' // antd 高级组件
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ClockCircleOutlined, EditOutlined, DeleteOutlined, DownOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons' // antd 图标库
import { Tag, Space, Button, Modal, message, Dropdown, Menu, Switch, Popconfirm } from 'antd' // antd 组件库
import moment from 'moment'

// 引入业务组件
import { getUserList, delUser, setUserStatus } from '@/services/system/user-management' // 用户管理接口
import { getRoleList } from '@/services/system/role-management' // 角色管理接口
import { getJobsList } from '@/services/administrative/jobs-management' // 岗位管理接口
import { getOrganizationList } from '@/services/administrative/organization' // 组织管理接口
import FormTemplate from './FormTemplate'  // 表单组件

const TableTemplate: FC = () => {
    const { formatMessage } = useIntl();
    // 初始化状态
    const { initialState } = useModel('@@initialState');
    // 获取表格实例
    const tableRef = useRef<ActionType>();
    // 当前行数据
    const [currentRecord, setCurrentRecord] = useState<API.USERMANAGEMENT>()
    // 获取角色数据传递给modalForm
    const [roleData, setRoleData] = useState<API.ROLEMANAGEMENT[]>([])
    // 获取岗位数据传递给modalForm
    const [jobsData, setJobsData] = useState<API.JOBSMANAGEMENT[]>([])
    // 获取组织数据传递给modalForm
    const [organizationData, setOrganizationData] = useState<API.ORGANIZATION[]>([])
    // 设置用户状态
    const [userLoading, { setTrue: setUserLoadingTrue, setFalse: setUserLoadingFalse }] = useBoolean(false);
    const [userId, setUserId] = useState<string>('')
    // Modal 框显隐
    const [modalVisible, { setTrue: setModalVisibleTrue, setFalse: setModalVisibleFalse }] = useBoolean(false);
    // 手动触发刷新表格
    function reloadTable() {
        tableRef?.current?.reload()
    }
    // 删除列表
    const handlerDelete = async (user_id: string | undefined) => {
        Modal.confirm({
            title: formatMessage({ id: 'global.message.delete.title' }),
            content: formatMessage({ id: 'global.message.delete.content' }),
            onOk: async () => {
                if (user_id) {
                    await delUser(user_id).then(res => {
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
                    label: <Button type="text" size="small" icon={<EditOutlined />} block>{formatMessage({ id: 'menu.system.user-management.edit' })}</Button>,
                    key: 'edit',
                },
                {
                    label: <Button
                        block
                        type="text"
                        size="small"
                        icon={<DeleteOutlined />} onClick={() => handlerDelete(currentRecord?.user_id)} >
                        {formatMessage({ id: 'menu.system.user-management.delete' })}
                    </Button>,
                    key: 'delete',
                },
            ]}
        />
    );

    // 设置用户状态
    const changeUserStatus = async ({ user_id, status }: API.USERMANAGEMENT) => {
        await setUserStatus({ user_id, status: status === '0' ? '1' : '0' }).then(result => {
            message.success(result.resMsg)
            reloadTable()
        }).finally(() => {
            setUserLoadingFalse()
        })
    }

    // 渲染设置角色状态
    const renderRoleStatus = (record: API.USERMANAGEMENT) => (
        <Popconfirm
            title="确认执行此操作吗?"
            open={userId === record.user_id && userLoading}
            onConfirm={() => changeUserStatus(record)}
            onCancel={() => setUserLoadingFalse()}
            key="popconfirm"
        ><Switch
                checkedChildren={formatMessage({ id: 'global.status.normal' })}
                unCheckedChildren={formatMessage({ id: 'global.status.disable' })}
                checked={record.status === '1'}
                loading={userId === record.user_id && userLoading}
                onChange={() => { setUserLoadingTrue(); setUserId(record.user_id) }}
            />
        </Popconfirm>
    );
    /**
* @description: proTable columns 配置项
* @return {*}
* @author: Cyan
*/
    const columns: ProColumns<API.USERMANAGEMENT>[] = [
        {
            title: formatMessage({ id: 'pages.system.user-management.user_name' }),
            dataIndex: 'user_name',
            ellipsis: true,
            render: text => <Space>
                <Tag
                    icon={<UserOutlined style={{ color: initialState?.settings?.colorPrimary, fontSize: '16px' }} />} >
                    {text}
                </Tag>
            </Space>
        },
        {
            title: formatMessage({ id: 'pages.system.user-management.cn_name' }),
            dataIndex: 'cn_name',
            hideInSearch: true,
            ellipsis: true,
        },
        {
            title: formatMessage({ id: 'pages.system.user-management.en_name' }),
            dataIndex: 'en_name',
            hideInSearch: true,
            ellipsis: true,
        },
        {
            title: formatMessage({ id: 'pages.system.user-management.work_no' }),
            dataIndex: 'work_no',
            hideInSearch: true,
            ellipsis: true,
        },
        /* 状态 */
        {
            title: formatMessage({ id: 'global.status' }),
            dataIndex: 'status',
            filters: true,
            onFilter: true,
            valueEnum: {
                0: { text: formatMessage({ id: 'global.status.disable' }), status: 'Default' },
                1: { text: formatMessage({ id: 'global.status.normal' }), status: 'Processing' },
            },
            render: (_, record) => renderRoleStatus(record)
        },
        {
            title: formatMessage({ id: 'global.table.sort' }),
            dataIndex: 'sort',
            ellipsis: true,
            hideInSearch: true,
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
            title: formatMessage({ id: 'global.table.operation' }),
            valueType: 'option',
            width: 120,
            align: 'center',
            key: 'option',
            render: (_, record) => [
                <Dropdown overlay={DropdownMenu} onOpenChange={() => setCurrentRecord(record)} key="operation">
                    <Button size="small">
                        {formatMessage({ id: 'global.table.operation' })}
                        <DownOutlined />
                    </Button>
                </Dropdown>
            ]
        },
    ]

    // 获取当前角色数据
    useRequest(async () => await getRoleList(), {
        onSuccess: (result: any) => {
            setRoleData(result)
        }
    })

    // 获取当前岗位数据
    useRequest(async () => await getJobsList(), {
        onSuccess: (result: any) => {
            setJobsData(result)
        }
    })

    // 获取当前组织数据
    useRequest(async () => await getOrganizationList(), {
        onSuccess: (result: any) => {
            setOrganizationData(result)
        }
    })

    return (
        <>
            <ProTable<API.USERMANAGEMENT>
                actionRef={tableRef}
                columns={columns}
                request={async params => {
                    {
                        // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
                        // 如果需要转化参数可以在这里进行修改
                        let result: any = {}
                        await getUserList(params).then(res => {
                            result = res
                        })
                        return {
                            data: result.resData.data,
                            // success 请返回 true，
                            // 不然 table 会停止解析数据，即使有数据
                            success: result.resCode === 200,
                            // 不传会使用 data 的长度，如果是分页一定要传
                            total: result.resData.total,
                        }
                    }
                }
                }
                rowKey="user_id"
                pagination={{
                    pageSize: 5,
                }}
                // 工具栏
                toolBarRender={() => [
                    <Button type="primary" key="add" onClick={() => setModalVisibleTrue()}>
                        <PlusOutlined />
                        {formatMessage({ id: 'menu.system.user-management.add' })}
                    </Button>
                ]}
            />
            {/* 分步表单 */}
            <FormTemplate
                reloadTable={reloadTable}
                roleData={roleData}
                formData={currentRecord}
                jobsData={jobsData}
                organizationData={organizationData}
                modalVisible={modalVisible}
                setModalVisibleFalse={setModalVisibleFalse}
                key="FormTemplate" />
        </>
    )
}
export default TableTemplate