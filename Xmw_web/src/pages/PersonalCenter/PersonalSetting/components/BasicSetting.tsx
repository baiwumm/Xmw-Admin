/*
 * @Description: 基本设置
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-01-13 09:26:44
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-07 15:55:21
 */
import { ProForm } from '@ant-design/pro-components'; // antd 高级组件
import { useIntl, useModel } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Divider, message, Row } from 'antd'
import { FC, useState } from 'react'

import PersonalInformation from '@/pages/System/UserManagement/Steps/PersonalInformation' // 个人信息
import SetAvatar from '@/pages/System/UserManagement/Steps/SetAvatar' // 设置用户头像
import UserInformation from '@/pages/System/UserManagement/Steps/UserInformation' // 用户信息
import { getJobsList } from '@/services/administrative/jobs-management' // 岗位管理接口
import { getOrganizationList } from '@/services/administrative/organization' // 组织管理接口
import { getRoleList } from '@/services/system/role-management' // 角色管理接口
import { updateUser } from '@/services/system/user-management' // 用户管理接口
import { formatPerfix, waitTime } from '@/utils'
import { ROUTES } from '@/utils/enums'

const BasicSetting: FC = () => {
  const { formatMessage } = useIntl();
  // 获取全局状态
  const { initialState, setInitialState } = useModel('@@initialState');
  // 获取角色数据传递给modalForm
  const [roleData, setRoleData] = useState<API.ROLEMANAGEMENT[]>([])
  // 获取岗位数据传递给modalForm
  const [jobsData, setJobsData] = useState<API.JOBSMANAGEMENT[]>([])
  // 获取组织数据传递给modalForm
  const [organizationData, setOrganizationData] = useState<API.ORGANIZATION[]>([])

  /**
   * @description: 获取角色列表
   * @return {*}
   * @author: 白雾茫茫丶丶
   */
  useRequest(async (params) => await getRoleList(params), {
    defaultParams: [{ current: 1, pageSize: 9999 }],
    onSuccess: (res) => {
      if (res.code === 200) {
        setRoleData(res.data.list)
      }
    },
  })


  /**
   * @description: 获取岗位列表
   * @return {*}
   * @author: 白雾茫茫丶丶
   */
  useRequest(async () => await getJobsList(), {
    onSuccess: (res) => {
      if (res.code === 200) {
        setJobsData(res.data)
      }
    },
  })

  /**
   * @description: 获取组织列表
   * @return {*}
   * @author: 白雾茫茫丶丶
   */
  useRequest(async () => await getOrganizationList(), {
    onSuccess: (res) => {
      if (res.code === 200) {
        setOrganizationData(res.data)
      }
    },
  })

  /**
 * @description: 更新用户信息
 * @return {*}
 * @author: 白雾茫茫丶丶
 */
  const { run: runUpdateUser } = useRequest(updateUser, {
    manual: true,
    onSuccess: async (res, params) => {
      if (res.code === 200) {
        message.success(res.msg)
        // 更新全局状态
        setInitialState({ ...initialState, CurrentUser: { ...initialState?.CurrentUser, ...params[0] } })
      }
    },
  },
  )
  return (
    <ProForm<API.USERMANAGEMENT | undefined>
      grid
      request={async () => {
        await waitTime(300)
        return initialState?.CurrentUser
      }}
      onFinish={
        async (values) => {
          const user_id = initialState?.CurrentUser?.user_id
          if (values && user_id) {
            await waitTime(300)
            runUpdateUser({ ...values, user_id })
          }
        }
      }
    >
      <Divider orientation="left">
        {formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.steps-form.set-avatar` })}
      </Divider>
      <Row justify="center" style={{ width: '100%' }}>
        <SetAvatar />
      </Row>
      <Divider orientation="left">
        {formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.steps-form.personal-information` })}
      </Divider>
      <PersonalInformation disabledField />
      <Divider orientation="left">
        {formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.steps-form.user-information` })}
      </Divider>
      <UserInformation
        roleData={roleData}
        jobsData={jobsData}
        organizationData={organizationData}
        showLabel={false}
        disabledField
      />
    </ProForm>
  )
}
export default BasicSetting