import { setAlpha } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useModel } from '@umijs/max';
import { Avatar } from 'antd'
import type { FC } from 'react'

const UserAvatar: FC = () => {
  const { initialState } = useModel('@@initialState');
  const { CurrentUser } = initialState || {};
  // 用户中文名
  const Name = () => {
    const nameClassName = useEmotionCss(({ token }) => {
      return {
        height: '48px',
        overflow: 'hidden',
        lineHeight: '48px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        [`@media only screen and (max-width: ${token.screenMD}px)`]: {
          display: 'none',
        },
      };
    });
    return <span className={`${nameClassName} anticon`}>{CurrentUser?.cn_name}</span>;
  };
  // 用户头像
  const AvatarLogo = () => {
    const avatarClassName = useEmotionCss(({ token }) => {
      return {
        marginRight: '8px',
        color: token.colorPrimary,
        verticalAlign: 'top',
        background: setAlpha(token.colorBgContainer, 0.85),
        [`@media only screen and (max-width: ${token.screenMD}px)`]: {
          margin: 0,
        },
      };
    });
    return <Avatar size="small" className={avatarClassName} src={CurrentUser?.avatar_url} alt="avatar" />;
  };

  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <span className={actionClassName}>
      <AvatarLogo />
      <Name />
    </span>
  )
}

export default UserAvatar