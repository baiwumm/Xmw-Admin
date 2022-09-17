/*
 * @Description: 国际化-日文
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 11:09:03
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-17 12:19:11
 */
import menu from './ja-JP/menu';
import pages from './ja-JP/pages';
import pwa from './ja-JP/pwa';
import settingDrawer from './ja-JP/settingDrawer';

export default {
  'navBar.lang': '言語',
  'layout.user.link.help': 'ヘルプ',
  'layout.user.link.privacy': 'プライバシー',
  'layout.user.link.terms': '利用規約',
  'app.preview.down.block': 'このページをローカルプロジェクトにダウンロードしてください',
  'app.welcome.link.fetch-blocks': '',
  'app.welcome.link.block-list': '',
  ...menu,
  ...settingDrawer,
  ...pwa,
  ...pages,
};
