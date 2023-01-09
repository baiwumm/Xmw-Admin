/*
 * @Description: 锁定屏幕页面
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2023-01-06 14:20:20
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-09 15:38:22
 */
import type { FC } from 'react'
import { Modal } from 'antd'

type IProps = {
  openModal: boolean
}

const LockScreen: FC<IProps> = ({ openModal }) => {
  return (
    <Modal title={false} open={openModal}>
      <div>锁定屏幕</div>
    </Modal>
  )
}
export default LockScreen