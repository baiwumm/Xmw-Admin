import { useEmotionCss } from '@ant-design/use-emotion-css';
import { SelectLang, useModel } from '@umijs/max';
import React from 'react';

import AvatarDropdown from './components/AvatarDropdown';
import FullScreen from './components/FullScreen'
import LockSleep from './components/LockSleep'

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
      {/* 全屏 */}
      <FullScreen actionClassName={actionClassName} />
      {/* 用户下拉菜单 */}
      <AvatarDropdown />
      {/* 多语言 */}
      <SelectLang reload={false} className={actionClassName} />
      {/* 睡眠弹窗 */}
      <LockSleep />
    </div>
  );
};
export default GlobalHeaderRight;
