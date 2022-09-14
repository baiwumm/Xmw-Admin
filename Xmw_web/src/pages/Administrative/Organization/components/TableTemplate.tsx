/*
 * @Description: 用户管理-表格列表
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-13 18:26:28
 */
// 引入第三方库
import { FC, useState, useRef } from 'react';
import { ProTable } from '@ant-design/pro-components' // antd 高级组件
import type { ActionType } from '@ant-design/pro-components'

// 引入业务组件
import { getOrganizationList } from '@/services/administrative/organization' // 组织管理接口
import FormTemplate from './FormTemplate'  // 表单组件
import { TableItem } from '../utils/interface' //interface 接口
import { columns } from '../utils/config'

const TableTemplate: FC = () => {
    // 获取表格实例
    const tableRef = useRef<ActionType>();
    // 获取树形数据
    const [treeData, setTreeData] = useState([])
    return (
        <ProTable<TableItem>
            actionRef={tableRef}
            columns={columns}
            request={async (params = {}) => {
                {
                    // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
                    // 如果需要转化参数可以在这里进行修改
                    const result = await getOrganizationList(params);
                    setTreeData(result.resData?.data)
                    return {
                        data: result.resData?.data,
                        // success 请返回 true，
                        // 不然 table 会停止解析数据，即使有数据
                        success: result.resCode === 200,
                        // 不传会使用 data 的长度，如果是分页一定要传
                        total: result.resData?.total,
                    }
                }
            }
            }
            rowKey="org_id"
            pagination={{
                pageSize: 5,
                onChange: (page) => console.log(page),
            }}
            // 工具栏
            toolBarRender={() => [
                <FormTemplate treeData={treeData} tableRef={tableRef} />
            ]}
        >

        </ProTable>
    )
}
export default TableTemplate