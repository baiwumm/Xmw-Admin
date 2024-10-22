/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-21 14:42:25
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-22 13:50:49
 * @Description: 文件预览
 */
import { PageContainer } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max';
import { Card, Tabs, type TabsProps } from 'antd';
import { FC } from 'react';

import { formatPerfix } from '@/utils';
import { ROUTES } from '@/utils/enums'

import DocxPreview from './components/DocxPreview';
import ExcelPreview from './components/ExcelPreview';
import PdfPreview from './components/PdfPreview'
const FilePreview: FC = () => {
  const { formatMessage } = useIntl(); // 国际化工具

  // 国际化
  const renderMessage = (field: string) => formatMessage({ id: formatPerfix(ROUTES.FILEPREVIEW, field) });

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: renderMessage('docx'),
      children: (
        <DocxPreview />
      ),
    },
    {
      key: '2',
      label: renderMessage('excel'),
      children: (
        <ExcelPreview />
      ),
    },
    {
      key: '3',
      label: renderMessage('pdf'),
      children: (
        <PdfPreview />
      ),
    },
  ];
  return (
    <PageContainer header={{ title: null }}>
      <Card bordered={false}>
        <Tabs defaultActiveKey="1" items={items} />
      </Card>
    </PageContainer>
  )
}
export default FilePreview;