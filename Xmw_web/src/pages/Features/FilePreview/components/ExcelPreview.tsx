/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-22 09:12:57
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-22 09:27:17
 * @Description: Excel 文件预览
 */
import '@js-preview/excel/lib/index.css';

import jsPreviewExcel, { JsExcelPreview } from '@js-preview/excel';
import { useMount } from 'ahooks';
import { Spin } from 'antd'
import React, { FC, useRef, useState } from 'react';

const ExcelPreview: FC = () => {
  const excelContainerRef = useRef<HTMLDivElement | null>(null);
  const excelPreviewerRef = useRef<JsExcelPreview | null>(null) // 保存 myExcelPreviewer 的引用
  const [isLoading, setIsLoading] = useState<boolean>(true); // 是否加载中

  // 挂载回调
  useMount(() => {
    const containerElement = excelContainerRef.current;
    if (containerElement && !excelPreviewerRef.current) {
      // 初始化 myExcelPreviewer，并保存引用
      const myExcelPreviewer = jsPreviewExcel.init(containerElement)
      excelPreviewerRef.current = myExcelPreviewer

      setIsLoading(true) // 开始加载时设置 loading 状态

      myExcelPreviewer
        .preview('/office/test.xlsx')
        .finally(() => {
          setIsLoading(false)
        })
    }
  })
  return (
    <Spin spinning={isLoading}>
      <div ref={excelContainerRef} style={{ height: 'calc(100vh - 300px)' }} />
    </Spin>
  )
}
export default ExcelPreview;