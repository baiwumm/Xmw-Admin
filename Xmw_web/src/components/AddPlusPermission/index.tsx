/*
 * @Description: 全局共用的新建按钮组件
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-12-05 14:11:26
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-05 14:48:05
 */
import type { FC } from 'react';
import { useIntl, useAccess, Access } from '@umijs/max'
import { PlusOutlined } from '@ant-design/icons';// antd 图标
import { Button } from 'antd'; // antd 组件库

// prop 参数类型定义
type IProps = {
  triggerDom: JSX.Element | undefined,
  permission: string;
  id: string;
}

const AddPlusPermission: FC<IProps> = ({ triggerDom, permission, id }) => {
  const { formatMessage } = useIntl();
  // 权限定义集合
  const access = useAccess();
  return (
    triggerDom ||
    <Access accessible={access.operationPermission(permission)} fallback={null}>
      <Button type="primary">
        <PlusOutlined />
        {formatMessage({ id })}
      </Button>
    </Access>
  )
}

export default AddPlusPermission