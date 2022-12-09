/*
 * @Description: 登录页
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 11:09:03
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-08 18:02:04
 */

// 引入第三方库
import { useLocalStorageState, useRequest, useMount, useDebounceFn } from 'ahooks';
import type { FC } from 'react';
import { useState } from 'react'; // react
import { useIntl } from '@umijs/max'
import { SelectLang, useModel, history } from '@umijs/max'; // umi/max
import { WechatOutlined } from '@ant-design/icons'; // antd 图标
import { LoginForm } from '@ant-design/pro-components'; // antd 高级组件
import { message, Row, Col, Tabs, Space } from 'antd'  // antd 组件
import { isEmpty } from 'lodash'

// 引入业务组件
import { initAllRequest } from '@/utils/initRequest'
import { CACHE_KEY, encryptionAesPsd, formatResult } from '@/utils'
import Account from './components/Account' // 账户密码登录
import Mobile from './components/Mobile' // 手机号码登录
import type { LoginType, LoginParams } from './utils/indexface'
import Footer from '@/components/Footer'; // 全局页脚
import styles from './index.less'; // css 样式恩建
import { Login } from '@/services/logic/login' // 登录相关接口

type LoginProps = {
  access_token: string
}

const LoginPage: FC = () => {
  const { formatMessage } = useIntl();
  // 初始化状态
  const { setInitialState } = useModel('@@initialState');
  // 获取 localstorage key
  const [appCache, setappCache] = useLocalStorageState<Record<string, any> | undefined>(CACHE_KEY);
  // 用户登录类型
  const [loginType, setLoginType] = useState<LoginType>('account');

  /**
   * @description: 用户登录接口
   * @return {*}
   * @author: Cyan
   */
  const { run: runLogin } = useRequest<LoginProps, LoginParams[]>(
    async (params) => formatResult<LoginProps>(await Login(params)),
    {
      manual: true,
      onSuccess: async (res: LoginProps) => {
        if (!isEmpty(res)) {
          // 将 token 保存到localstorage
          setappCache({ ...appCache, ACCESS_TOKEN: res.access_token })
          // 获取用户信息和权限
          const userInfoAndAccess = await initAllRequest()
          await setInitialState((s) => ({ ...s, ...userInfoAndAccess }));
          setTimeout(() => {
            const urlParams = new URL(window.location.href).searchParams;
            // 路由跳转
            history.push(urlParams.get('redirect') || '/');
          }, 100)
        }
      }
    }
  )

  /**
   * @description: 登录表单提交
   * @param {LoginParams} values
   * @return {*}
   * @author: Cyan
   */
  const { run: handleSubmit } = useDebounceFn(
    async (values: LoginParams): Promise<void> => {
      try {
        // 如果是账号密码登录，密码加密提交
        if (loginType === 'account' && values.password) {
          values.password = encryptionAesPsd(values.password)
        }
        // 如果是手机登录
        if(loginType === 'mobile' && values.captcha != '1234'){
          message.error('验证码错误！')
          return
        }
        // 调用登录接口
        runLogin({ ...values, type: loginType })
      } catch (error) {
        message.error(formatMessage({ id: 'pages.login.failure' }));
      }
    },
    {
      wait: 300,
    },
  );

  /**
   * @description: Tabs 标签页配置
   * @return {*}
   * @author: Cyan
   */
  const TbasItems = [
    {
      label: formatMessage({ id: 'pages.login.type.account' }),
      key: 'account',
      children: <Account />,
    },
    {
      label: formatMessage({ id: 'pages.login.type.mobile' }),
      key: 'mobile',
      children: <Mobile />,
    }
  ]

  // 初次渲染时清空token和用户信息，这里是为了避免token失效跳转到登录页
  useMount(() => {
    setInitialState((s) => ({ ...s, CurrentUser: undefined, Access_token: undefined }));
    setappCache({ ...appCache, ACCESS_TOKEN: undefined })
  })

  return (
    <div className={styles.container}>
      {/* 国际化下拉框 */}
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <Row justify="center" className={styles.content}>
        {/* 左侧背景 */}
        <Col className={styles['login-left']}>
          <div className={styles['login-bg']} />
        </Col>
        <Col className={styles['login-form']}>
          {/* 登录表单 */}
          <LoginForm
            logo={<img alt="logo" src="/logo.svg" />}
            title="Xmw-Admin"
            subTitle={formatMessage({ id: 'pages.login.subtitle' })}
            onFinish={async (values) => {
              await handleSubmit(values as LoginParams);
            }}
            actions={
              <Space>
                其他登录方式
                <WechatOutlined style={{
                  color: '#02d10d', marginInlineStart: '16px',
                  fontSize: '24px',
                  verticalAlign: 'middle',
                  cursor: 'pointer',
                }} />
              </Space>
            }
          >
            <Tabs
              centered
              activeKey={loginType}
              onChange={(activeKey) => setLoginType(activeKey as LoginType)}
              items={TbasItems}
              destroyInactiveTabPane
            />
          </LoginForm>
        </Col>
      </Row>
      {/* 底部版权 */}
      <Footer />
    </div>
  );
};

export default LoginPage;
