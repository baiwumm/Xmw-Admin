import { useEmotionCss } from '@ant-design/use-emotion-css';
import { SelectLang, useModel } from '@umijs/max';
import React from 'react';
import AvatarDropdown from './components/AvatarDropdown';
import FullScreen from './components/FullScreen'

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const actionClassName = useEmotionCss(({ token }) => {
    return {
      cursor: 'pointer',
      padding: '0 12px',
      fontSize: 18,
      overflow: 'hidden',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.Settings) {
    return null;
  }

  return (
    <div style={{ display: 'flex' }}>
      <FullScreen actionClassName={actionClassName} />
      <AvatarDropdown />
      <SelectLang reload={false} className={actionClassName} />
    </div>
  );
};
export default GlobalHeaderRight;
