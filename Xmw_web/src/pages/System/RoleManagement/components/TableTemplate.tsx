/*
 * @Description: 角色管理-表格列表
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-08 13:48:56
 */
// 引入第三方库
import type { FC } from 'react';
import { useState, useRef } from 'react';
import { useBoolean } from 'ahooks';
import { useIntl, useModel, useRequest } from '@umijs/max'
import { ProTable } from '@ant-design/pro-components' // antd 高级组件
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ClockCircleOutlined, EditOutlined, DeleteOutlined, DownOutlined, createFromIconfontCN } from '@ant-design/icons' // antd 图标库
import { Tag, Space, Button, Modal, message, Dropdown, Menu, Switch, Popconfirm } from 'antd' // antd 组件库
import moment from 'moment'

// 引入业务组件
import { getRoleList, delRole, setRoleStatus } from '@/services/system/role-management' // 角色管理接口
import { getMenuList } from '@/services/system/menu-management' // 菜单管理接口
import FormTemplate from './FormTemplate'  // 表单组件

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
    // 当前行数据
    const [currentRecord, setCurrentRecord] = useState<API.ROLEMANAGEMENT>()
    // 获取树形数据传递给modalForm
    const [menuData, setMenuData] = useState<any>([])
    const [roleLoading, { setTrue: setRoleLoadingTrue, setFalse: setRoleLoadingFalse }] = useBoolean(false);
    const [roleId, setRoleId] = useState<string>('')
    // 手动触发刷新表格
    function reloadTable() {
        tableRef?.current?.reload()
    }
    // 删除列表
    const handlerDelete = async (role_id: string | undefined) => {
        Modal.confirm({
            title: formatMessage({ id: 'global.message.delete.title' }),
            content: formatMessage({ id: 'global.message.delete.content' }),
            onOk: async () => {
                if (role_id) {
                    await delRole(role_id).then(res => {
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
                        reloadTable={reloadTable}
                        formData={currentRecord}
                        menuData={menuData}
                        triggerDom={<Button type="text" size="small" icon={<EditOutlined />} block>{formatMessage({ id: 'menu.system.role-management.edit' })}</Button>}
                    />,
                    key: 'edit',
                },
                {
                    label: <Button
                        block
                        type="text"
                        size="small"
                        icon={<DeleteOutlined />} onClick={() => handlerDelete(currentRecord?.role_id)} >
                        {formatMessage({ id: 'menu.system.role-management.delete' })}
                    </Button>,
                    key: 'delete',
                },
            ]}
        />
    );

    // 操作下拉框
    const dropdownMenuClick = (record: API.ROLEMANAGEMENT) => {
        setCurrentRecord(record)
    }

    // 设置角色状态
    const changeRoleStatus = async ({ role_id, status }: API.ROLEMANAGEMENT) => {
        await setRoleStatus({ role_id, status: status === '0' ? '1' : '0' }).then(result => {
            message.success(result.resMsg)
            reloadTable()
        }).finally(() => {
            setRoleLoadingFalse()
        })
    }

    // 渲染设置角色状态
    const renderRoleStatus = (record: API.ROLEMANAGEMENT) => (
        <Popconfirm
            title="确认执行此操作吗?"
            open={roleId === record.role_id && roleLoading}
            onConfirm={() => changeRoleStatus(record)}
            onCancel={() => setRoleLoadingFalse()}
            key="popconfirm"
        ><Switch
                checkedChildren={formatMessage({ id: 'global.status.normal' })}
                unCheckedChildren={formatMessage({ id: 'global.status.disable' })}
                checked={record.status === '1'}
                loading={roleId === record.role_id && roleLoading}
                onChange={() => { setRoleLoadingTrue(); setRoleId(record.role_id) }}
            />
        </Popconfirm>
    );
    /**
* @description: proTable columns 配置项
* @return {*}
* @author: Cyan
*/
    const columns: ProColumns<API.ROLEMANAGEMENT>[] = [
        {
            title: formatMessage({ id: 'pages.system.role-management.role_name' }),
            dataIndex: 'role_name',
            ellipsis: true,
            render: text => <Space>
                <Tag
                    icon={<IconFont type="icon-role-management" style={{ color: initialState?.settings?.colorPrimary, fontSize: '16px' }} />} >
                    {text}
                </Tag>
            </Space>
        },
        {
            title: formatMessage({ id: 'pages.system.role-management.role_code' }),
            dataIndex: 'role_code',
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
                <Dropdown overlay={DropdownMenu} onOpenChange={() => dropdownMenuClick(record)} key="operation">
                    <Button size="small">
                        {formatMessage({ id: 'global.table.operation' })}
                        <DownOutlined />
                    </Button>
                </Dropdown>
            ]
        },
    ]

    // 获取当前菜单数据
    useRequest(async () => await getMenuList({ isPremission: true }), {
        onSuccess: (result) => {
            setMenuData(result)
        }
    })

    return (
        <ProTable<API.ROLEMANAGEMENT>
            actionRef={tableRef}
            columns={columns}
            request={async params => {
                {
                    // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
                    // 如果需要转化参数可以在这里进行修改
                    let result: any = {}, mainData: any = []
                    await getRoleList(params).then(res => {
                        result = res
                        // 将查询回来的menu_permission对象数组转成menu_id数组
                        mainData = result.resData.data.map((element: any) => Object.assign(element, { menu_permission: element.menu_permission?.map((per: any) => per?.menu_id) }))
                    })
                    return {
                        data: mainData,
                        // success 请返回 true，
                        // 不然 table 会停止解析数据，即使有数据
                        success: result.resCode === 200,
                        // 不传会使用 data 的长度，如果是分页一定要传
                        total: result.resData.total,
                    }
                }
            }
            }
            rowKey="role_id"
            pagination={{
                pageSize: 5,
            }}
            // 工具栏
            toolBarRender={() => [
                <FormTemplate reloadTable={reloadTable} menuData={menuData} key="FormTemplate" />
            ]}
        />
    )
}
export default TableTemplate