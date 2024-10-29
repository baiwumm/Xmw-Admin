/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-22 09:12:57
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-29 09:17:36
 * @Description: Docx 文件预览
 */
import '@js-preview/docx/lib/index.css'

import jsPreviewDocx, { JsDocxPreview } from '@js-preview/docx';
import { useMount } from 'ahooks';
import { Spin } from 'antd'
import React, { FC, useRef, useState } from 'react';

const DocxPreview: FC = () => {
  const docxContainerRef = useRef<HTMLDivElement | null>(null);
  const docxPreviewerRef = useRef<JsDocxPreview | null>(null) // 保存 myDocxPreviewer 的引用
  const [isLoading, setIsLoading] = useState<boolean>(true); // 是否加载中

  // 挂载回调
  useMount(() => {
    const containerElement = docxContainerRef.current;
    if (containerElement && !docxPreviewerRef.current) {
      // 初始化 myDocxPreviewer，并保存引用
      const myDocxPreviewer = jsPreviewDocx.init(containerElement)
      docxPreviewerRef.current = myDocxPreviewer

      setIsLoading(true) // 开始加载时设置 loading 状态

      myDocxPreviewer
        .preview('/office/test.docx')
        .finally(() => {
          setIsLoading(false)
        })
    }
  })
  return (
    <Spin spinning={isLoading}>
      <div ref={docxContainerRef} style={{ height: 'calc(100vh - 300px)' }} />
    </Spin>
  )
}
export default DocxPreview;