/*
 * @Description: 用户管理-表格列表
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-08 18:29:32
 */
// 引入第三方库
import { FC } from 'react';
import { ProTable } from '@ant-design/pro-components' // antd 高级组件
import { useRequest } from 'ahooks'
import { formatMessage } from '@/utils' // 引入工具类
import { getUserList } from '@/services/system/user-management'

const TableTemplate: FC = () => {
    const { data } = useRequest(getUserList, {
        manual: true
    });
    console.log(data)
    return (
        <ProTable >

        </ProTable>
    )
}
export default TableTemplate