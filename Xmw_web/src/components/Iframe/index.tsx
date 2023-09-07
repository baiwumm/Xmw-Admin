/*
 * @Description: iframe嵌入
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-11 16:53:17
 * @LastEditors: Cyan
 * @LastEditTime: 2023-08-11 17:07:31
 */
import { FC } from 'react'

type IProps = {
  url: string;
}

const Iframe: FC<IProps> = ({ url }) => {
  return (
    <div style={{ padding: '0 16px' }}>
      <iframe src={url} width="100%" frameBorder='0' height="100%" style={{ height: 'calc(100vh - 150px)' }} />
    </div>
  )
}
export default Iframe