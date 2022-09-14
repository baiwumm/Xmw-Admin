/*
 * @Description: 智能行政-组织管理-配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-09 16:58:55
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-13 11:03:28
 */
import type { ProColumns } from '@ant-design/pro-components';
import { TableItem } from './interface'

/**
 * @description: proTable columns 配置项
 * @return {*}
 * @author: Cyan
 */
export const columns: ProColumns<TableItem>[] = [
    {
        title: '组织名称',
        dataIndex: 'org_name',
        copyable: true,
        ellipsis: true,
    }
]