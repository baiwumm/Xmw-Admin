/*
 * @Description: 用户管理-表格列表
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-09 17:24:23
 */
// 引入第三方库
import { FC } from 'react';
import { request } from '@umijs/max'
import { ProTable } from '@ant-design/pro-components' // antd 高级组件
import { useRequest } from 'ahooks' // ahooks

// 引入业务组件
import { formatMessage } from '@/utils' // 引入工具类
import { getUserList } from '@/services/system/user-management' // 用户接口
import { TableItem } from '../utils/interface' //interface 接口
import { columns } from '../utils/config'

const TableTemplate: FC = () => {
    // const { data } = useRequest(getUserList);
    // console.log(data)
    return (
        <ProTable<TableItem>
            columns={columns}
            request={async (params = {}, sort, filter) => {
                {
                    // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
                    // 如果需要转化参数可以在这里进行修改
                    const result = await getUserList({
                        page: params.current,
                        pageSize: params.pageSize,
                    });
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
            rowKey="user_id"
            pagination={{
                pageSize: 5,
                onChange: (page) => console.log(page),
            }}
        >

        </ProTable>
    )
}
export default TableTemplate