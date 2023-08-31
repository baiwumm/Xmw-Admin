/*
 * @Description: 表格操作下拉菜单
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-30 17:50:17
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-08-31 11:24:28
 */
import { ClusterOutlined, DeleteOutlined, DownOutlined, EditOutlined } from '@ant-design/icons' // antd 图标库
import { TableDropdown } from '@ant-design/pro-components'
import { Access, useAccess, useIntl } from '@umijs/max'
import { Button, Space } from 'antd'
import { get } from 'lodash-es'
import { FC } from 'react'

import { INTERNATION, OPERATION } from '@/enums'
import type { DropdownMenuTypes } from '@/types'
import permissions from '@/utils/permission'

type IProps = {
  formatPerfix: string; // 国际化前缀
  addChildCallback?: () => void; // 添加子级回调
  editCallback?: () => void; // 编辑回调
  deleteCallback?: () => void; // 删除回调
}

const DropdownMenu: FC<IProps> = ({ formatPerfix, addChildCallback, editCallback, deleteCallback }) => {
  // 国际化工具
  const { formatMessage } = useIntl();
  // 权限定义集合
  const access = useAccess();
  // 下拉菜单
  const menuItems: DropdownMenuTypes[] = [
    // 添加子级
    {
      name: <Access
        accessible={access.operationPermission(get(permissions, `${formatPerfix}.${OPERATION.ADDCHILD}`, ''))}
        fallback={null}>
        <Space size='small' onClick={() => addChildCallback?.()}>
          <ClusterOutlined />
          <span>{formatMessage({ id: `menu.${formatPerfix}.${OPERATION.ADDCHILD}` })}</span>
        </Space>
      </Access>,
      key: OPERATION.ADDCHILD,
    },
    // 编辑
    {
      name: <Access
        accessible={access.operationPermission(get(permissions, `${formatPerfix}.${OPERATION.EDIT}`, ''))}
        fallback={null}>
        <Space size='small' onClick={() => editCallback?.()}>
          <EditOutlined />
          <span>{formatMessage({ id: `menu.${formatPerfix}.${OPERATION.EDIT}` })}</span>
        </Space>
      </Access>,
      key: OPERATION.EDIT,
    },
    // 删除
    {
      name: <Access
        accessible={access.operationPermission(get(permissions, `${formatPerfix}.${OPERATION.DELETE}`, ''))}
        fallback={null}>
        <Space size='small' onClick={() => deleteCallback?.()}>
          <DeleteOutlined />
          <span>{formatMessage({ id: `menu.${formatPerfix}.${OPERATION.DELETE}` })}</span>
        </Space>
      </Access>,
      key: OPERATION.DELETE,
    },
  ]
  return (
    <TableDropdown menus={menuItems}>
      <Button size="small">
        {formatMessage({ id: INTERNATION.OPERATION })}
        <DownOutlined />
      </Button>
    </TableDropdown>
  )
}
export default DropdownMenu