/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-17 15:43:05
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-17 16:03:56
 * @Description: 系统级取色器
 */
import { PageContainer, PageHeader, ProCard } from '@ant-design/pro-components'
import { useIntl, useModel } from '@umijs/max';
import { App, Badge, Button, Card } from 'antd';
import { FC, useState } from 'react';

import { formatPerfix } from '@/utils';
import { ROUTES } from '@/utils/enums'

const EyeDropperApp: FC = () => {
  const { message } = App.useApp();
  const { formatMessage } = useIntl(); // 国际化工具
  // 国际化
  const renderMessage = (field: string) => formatMessage({ id: formatPerfix(ROUTES.EYEDROPPER, field) });

  // 全局状态
  const { initialState } = useModel('@@initialState');

  const [color, setColor] = useState(initialState?.Settings?.colorPrimary)

  const handleEyeDropper = async () => {
    if (!('EyeDropper' in window)) {
      message.error(renderMessage('support'));
      return;
    }
    const eyeDropper = new EyeDropper();
    try {
      const result = await eyeDropper.open();
      setColor(result.sRGBHex)
    } catch {
      message.warning(renderMessage('cancel'));
    }
  };
  return (
    <PageContainer header={{ title: null }}>
      <ProCard bodyStyle={{ padding: '10px 10px 20px 10px' }}>
        <PageHeader title={formatMessage({ id: formatPerfix(ROUTES.EYEDROPPER, '', true) })}>
          {renderMessage('subTitle')}
        </PageHeader>
      </ProCard>
      <Badge.Ribbon text={color} color={color}>
        <Card bordered={false} style={{ marginTop: 20 }}>
          <Button type="primary" onClick={handleEyeDropper}>{renderMessage('open')}</Button>
        </Card>
      </Badge.Ribbon>
    </PageContainer>
  )
}
export default EyeDropperApp;