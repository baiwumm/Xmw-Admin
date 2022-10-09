/*
 * @Description: 设置头像
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-09 15:46:56
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-09 16:34:40
 */
import type { FC } from 'react'
import { useIntl } from '@umijs/max'
import { Form, Avatar } from 'antd' // antd 组件库
import { CheckCard } from '@ant-design/pro-components';

const SetAvatar: FC = () => {
    const { formatMessage } = useIntl();
    const avatarHost = 'https://react-umi-xmw.oss-cn-shenzhen.aliyuncs.com/avatar/'
    // 默认头像列表
    const defaultAvatarList = ['boy.svg', 'girl.svg', 'boy1.svg', 'girl1.svg', 'boy2.svg', 'girl2.svg']
    return (
        <>
            <Form.Item
                name="avatar_url"
                label={formatMessage({ id: 'pages.system.user-management.steps-form.set-avatar' })}
                rules={[
                    {
                        required: true, message: formatMessage({ id: 'pages.system.user-management.steps-form.set-avatar' })
                    }
                ]}
            >
                <CheckCard.Group >
                    {
                        defaultAvatarList.map(avatar => {
                            return <CheckCard
                                value={avatarHost + avatar}
                                key={avatarHost + avatar}
                                avatar={<Avatar src={avatarHost + avatar} size={74} />}
                                style={{ width: 100, height: 110 }}
                            />
                        })
                    }
                </CheckCard.Group>
            </Form.Item>
        </>
    )
}
export default SetAvatar