/*
 * @Description: 安全设置
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-01-13 17:33:55
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-21 17:58:06
 */
import { ProList } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max'
import { Button, Tag, Typography } from 'antd'
import { keys } from 'lodash-es'
import type { FC } from 'react'
import zxcvbn from 'zxcvbn'; // 密码强度校验

import { strengthMeterOptions } from '@/components/StrengthMeter/config'
import { decryptionAesPsd, formatPerfix } from '@/utils'
import { ROUTES } from '@/utils/enums'

const { Text } = Typography;

type dataSourceProps = {
  name: string;
  desc?: string;
  activeKey?: string;
}

const SecuritySetting: FC<{ setActiveKey: React.Dispatch<React.SetStateAction<string>> }> = ({ setActiveKey }) => {
  const { formatMessage } = useIntl();
  // 获取全局状态
  const { initialState } = useModel('@@initialState');
  // 校验密码强度
  const passwordStrength = () => {
    const analysisValue: { score: number } = zxcvbn(decryptionAesPsd(initialState?.CurrentUser?.password || ''))
    // score得分只有0~4，且只有整数范围并没有小数
    return formatMessage({ id: `components.StrengthMeter.${keys(strengthMeterOptions)[analysisValue.score]}` })
  }
  // 邮箱中间三位星号表示
  const regEmail = () => {
    const email = initialState?.CurrentUser?.email || ''
    const emailSplit = email.split('@')
    return `${emailSplit[0].replace(/^(\d{3}).*(\d{4})$/, '$1***$2')}@${emailSplit[1]}`
  }
  // ProList 数据源
  const dataSource: dataSourceProps[] = [
    {
      name: 'certification-realName',
    },
    {
      name: 'account-password',
      desc: passwordStrength(),
      activeKey: 'changePassword',
    },
    {
      name: 'security-phone',
      desc: initialState?.CurrentUser?.phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2'),
      activeKey: 'basicSetting',
    },
    {
      name: 'secure-mailbox',
      desc: regEmail(),
      activeKey: 'basicSetting',
    },
  ];
  return (
    <>
      <ProList<dataSourceProps>
        rowKey="name"
        dataSource={dataSource}
        metas={{
          title: {
            dataIndex: 'name',
            render: (text) => <Text strong>
              {formatMessage({ id: formatPerfix(ROUTES.PERSONALSETTING, `security-setting.${text}`) })}
            </Text>,
          },
          description: {
            dataIndex: 'desc',
            render: (text, record, index) => index > 0 ?
              <Text type="secondary">
                {formatMessage({ id: formatPerfix(ROUTES.PERSONALSETTING, `security-setting.${record.name}.tip`) })}：
                {text}
              </Text> : null,
          },
          actions: {
            render: (_, row, index) => [
              index > 0 ?
                <Button
                  key="edit"
                  type="link"
                  onClick={() => setActiveKey(row.activeKey || 'basicSetting')}>
                  {formatMessage({ id: 'global.button.modify' })}
                </Button> :
                <Tag key="edit" color="success">
                  {formatMessage({
                    id: formatPerfix(ROUTES.PERSONALSETTING, `security-setting.${row.name}.certified`),
                  })}
                </Tag>,
            ],
          },
        }}
      />
    </>
  )
}
export default SecuritySetting
