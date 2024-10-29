/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-22 09:12:57
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-29 09:19:45
 * @Description: Pdf 文件预览
 */
import jsPreviewPdf, { JsPdfPreview } from '@js-preview/pdf';
import { useMount } from 'ahooks';
import { Spin } from 'antd'
import React, { FC, useRef, useState } from 'react';

const PdfPreview: FC = () => {
  const pdfContainerRef = useRef<HTMLDivElement | null>(null);
  const pdfPreviewerRef = useRef<JsPdfPreview | null>(null) // 保存 myPdfPreviewer 的引用
  const [isLoading, setIsLoading] = useState<boolean>(true); // 是否加载中

  // 挂载回调
  useMount(() => {
    const containerElement = pdfContainerRef.current;
    if (containerElement && !pdfPreviewerRef.current) {
      // 初始化 myPdfPreviewer，并保存引用
      const myPdfPreviewer = jsPreviewPdf.init(containerElement, {
        onError: () => {
          setIsLoading(false)
        },
        onRendered: () => {
          setIsLoading(false)
        },
      })
      pdfPreviewerRef.current = myPdfPreviewer

      myPdfPreviewer.preview('/office/test.pdf')
    }
  })
  return (
    <Spin spinning={isLoading}>
      <div ref={pdfContainerRef} style={{ height: 'calc(100vh - 300px)' }} />
    </Spin>
  )
}
export default PdfPreview;