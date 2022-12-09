/*
 * @Description: 退出登录
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-12-09 17:57:41
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-09 18:17:35
 */
import type { FC } from 'react'
import { useLocalStorageState, useRequest } from 'ahooks';
import { Modal } from 'antd'
import { useModel, useIntl } from '@umijs/max';
import { PoweroffOutlined } from '@ant-design/icons'; // antd 图标
import { Logout } from '@/services/logic/login' // 登录相关接口
import type { AppLocalCacheModel, ResponseModel } from '@/global/interface'
import { CACHE_KEY, logoutToLogin } from '@/utils'

type LogoutProps = ResponseModel<Record<string, any>>

const GlobalLogout: FC = () => {
  const { formatMessage } = useIntl();
  const { setInitialState } = useModel('@@initialState');
  // 获取 localstorage key
  const [appCache, setappCache] = useLocalStorageState<AppLocalCacheModel | undefined>(CACHE_KEY);
  /**
 * @description: 退出登录，并且将当前的 url 保存
 * @return {*}
 * @author: Cyan
 */
  const { run: loginOut, loading } = useRequest<LogoutProps, unknown[]>(Logout, {
    manual: true,
    onSuccess: async (res: LogoutProps) => {
      if (res.code === 200) {
        setInitialState((s) => ({ ...s, CurrentUser: undefined, Access_token: undefined }));
        setappCache({ ...appCache, ACCESS_TOKEN: undefined })
        // 退出登录返回登录页
        logoutToLogin()
      }
    }
  }
  )

  /**
   * @description: 退出登录
   * @return {*}
   * @author: Cyan
   */
  const logOutClick = (): void => {
    Modal.confirm({
      title: formatMessage({ id: 'global.warm-tips' }),
      content: formatMessage({ id: 'pages.logout.tip' }),
      okButtonProps: { loading },
      onOk: () => {
        loginOut()
      }
    })
  }
  return <PoweroffOutlined onClick={() => logOutClick()} />
}
export default GlobalLogout