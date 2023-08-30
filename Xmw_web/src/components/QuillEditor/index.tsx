/*
 * @Description: 富文本编辑器
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-29 13:41:04
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-08-29 16:28:41
 */
import 'react-quill/dist/quill.snow.css';

import { debounce } from 'lodash-es';
import { FC } from 'react'
import ReactQuill from 'react-quill';

type IProps = {
  value?: string;
  onChange?: (value: string) => void;
  height?: number | string;
}

const QuillEditor: FC<IProps> = ({ value, onChange, height = 200 }) => {
  // 自定义工具栏
  const modules: ReactQuill.ReactQuillProps['modules'] = {
    // 方式1: 可以是简单的一维数组配置
    // toolbar: ["bold", "italic", "underline", "strike", "blockquote"]
    // 方式2: 可以配置二维数组，进行多个选项的配置
    // 或者针对某一个配置项的key值，进行配置
    toolbar: [
      // 默认的
      // [{ header: [1, 2, 3, false] }],
      // ['bold', 'italic', 'underline', 'link'],
      // [{ list: 'ordered' }, { list: 'bullet' }],
      // ['clean'],
      // 掘金的富文本编辑器
      'bold',
      'italic',
      'underline',
      { header: 1 },
      { header: 2 },
      'blockquote',
      'code-block',
      'code',
      { list: 'ordered' },
      { list: 'bullet' },
      'clean',
    ],
    // 方式3: 可以自己指定工具栏的容器
    // toolbar: "#rq-toolbar"
  }

  // 文本框改变时的回调
  const handleChangeValue = debounce((content: string) => {
    onChange?.(content);
  }, 500);
  return (
    <ReactQuill
      style={{ height, display: 'flex', flexDirection: 'column' }}
      theme="snow"
      modules={modules}
      value={value}
      onChange={handleChangeValue}
    />
  )
}
export default QuillEditor