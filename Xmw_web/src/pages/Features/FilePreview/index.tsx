/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-21 14:42:25
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-22 09:37:02
 * @Description: 文件预览
 */
import { PageContainer } from '@ant-design/pro-components'
import { Card, Tabs, type TabsProps } from 'antd';
import { FC } from 'react';

import DocxPreview from './components/DocxPreview';
import ExcelPreview from './components/ExcelPreview';
import PdfPreview from './components/PdfPreview'
const FilePreview: FC = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Docx 文件',
      children: (
        <DocxPreview />
      ),
    },
    {
      key: '2',
      label: 'Excel 文件',
      children: (
        <ExcelPreview />
      ),
    },
    {
      key: '3',
      label: 'Pdf 文件',
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