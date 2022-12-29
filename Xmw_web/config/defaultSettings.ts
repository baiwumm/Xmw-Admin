/*
 * @Description: 默认配置文件
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 11:09:02
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-29 14:25:54
 */
import { Settings as LayoutSettings } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Xmw Admin',
  pwa: false,
  logo: '/logo.svg',
  iconfontUrl: '/favicon.ico',
};

export default Settings;
