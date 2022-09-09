/*
 * @Description: 系统设置-用户管理-配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-09 16:58:55
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-09 18:00:02
 */
import type { ProColumns } from '@ant-design/pro-components';
import { TableItem } from './interface'
import { USER_STATUS } from './enum'

/**
 * @description: proTable columns 配置项
 * @return {*}
 * @author: Cyan
 */
export const columns: ProColumns<TableItem>[] = [
    {
        title: '用户名',
        dataIndex: 'user_name',
        copyable: true,
        ellipsis: true,
    },
    {
        title: '状态',
        dataIndex: 'status',
        filters: true,
        onFilter: true,
        ellipsis: true,
        valueType: 'select',
        valueEnum: {
            1: {
                text: '正常',
                status: 'Success',
            },
            2: {
                text: '禁用',
                status: 'Default',
            }
        },
    },
]