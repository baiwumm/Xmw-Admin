/*
 * @Description: 表单公告项
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-09-19 17:06:11
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-25 13:54:58
 */
import {
  ProFormDigit,
  ProFormDigitProps,
  ProFormRadio,
  ProFormRadioGroupProps,
  ProFormSelect,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { TreeSelect } from 'antd'
import { get } from 'lodash-es'
import { FC } from 'react'

import { getUserList } from '@/services/system/user-management'
import { STATUS_OPTS } from '@/utils/const'
import { INTERNATION, STATUS } from '@/utils/enums'

/**
 * @description: 父级
 * @author: 白雾茫茫丶
 */
export const ProFormParent: typeof ProFormTreeSelect = ({ fieldProps, ...props }) => {
  const { formatMessage } = useIntl();
  return (
    <ProFormTreeSelect
      name="parent_id"
      label={formatMessage({ id: INTERNATION.PARENT_ID })}
      colProps={{ span: 24 }}
      tooltip={formatMessage({ id: INTERNATION.PARENT_ID_TIP })}
      fieldProps={{
        showSearch: true,
        allowClear: true,
        treeDefaultExpandAll: true,
        showCheckedStrategy: TreeSelect.SHOW_PARENT,
        placeholder: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
          formatMessage({ id: INTERNATION.PARENT_ID }),
        ...fieldProps,
      }}
      {...props}
    />
  )
}

/**
 * @description: 状态
 * @author: 白雾茫茫丶
 */
export const ProFormStatus: FC<ProFormRadioGroupProps> = (props) => {
  const { formatMessage } = useIntl();
  return (
    <ProFormRadio.Group
      name="status"
      colProps={{ span: 8 }}
      initialValue={STATUS.NORMAL}
      fieldProps={{
        buttonStyle: 'solid',
      }}
      label={formatMessage({ id: INTERNATION.STATUS })}
      options={STATUS_OPTS}
      {...props}
    />
  )
}

/**
 * @description: 负责人
 * @author: 白雾茫茫丶
 */
export const ProFormLeader: FC = () => {
  const { formatMessage } = useIntl();
  /**
   * @description: 获取用户列表
   * @author: 白雾茫茫丶
   */
  const { data: userList } = useRequest(async (params) => get(await getUserList(params), 'data.list', []), {
    defaultParams: [{ current: 1, pageSize: 9999 }],
  });
  return (
    <ProFormSelect
      name="leader"
      label={formatMessage({ id: INTERNATION.LEADER })}
      colProps={{ span: 24 }}
      placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
        formatMessage({ id: INTERNATION.LEADER })}
      options={userList?.map((u: API.USERMANAGEMENT) => ({ label: u.cn_name, value: u.user_id })) || []}
      fieldProps={{
        showSearch: true,
      }}
      rules={[{
        required: true, message: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
          formatMessage({ id: INTERNATION.LEADER }),
      }]}
    />
  )
}

/**
 * @description: 排序
 * @author: 白雾茫茫丶
 */
export const ProFormSort: FC<ProFormDigitProps> = (props) => {
  const { formatMessage } = useIntl();
  return (
    (
      <ProFormDigit
        label={formatMessage({ id: INTERNATION.SORT })}
        name="sort"
        colProps={{ span: 24 }}
        min={1}
        max={99}
        initialValue={1}
        tooltip={formatMessage({ id: INTERNATION.SORT_TIP })}
        fieldProps={{ precision: 0 }}
        {...props}
      />
    )
  )
}

/**
 * @description: 描述
 * @author: 白雾茫茫丶
 */
export const ProFormDescribe: FC = () => {
  const { formatMessage } = useIntl();
  return (
    <ProFormTextArea
      name="describe"
      label={formatMessage({ id: INTERNATION.DESCRIBE })}
      placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) + formatMessage({ id: INTERNATION.DESCRIBE })}
      colProps={{ span: 24 }}
      fieldProps={{
        showCount: true,
        maxLength: 200,
      }}
      rules={[{
        required: true,
      }]}
    />
  )
}