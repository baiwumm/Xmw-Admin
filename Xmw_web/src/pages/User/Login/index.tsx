/*
 * @Description: 登录页
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 11:09:03
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-17 10:46:33
 */

// 引入第三方库
import type { FC, CSSProperties } from 'react';
import { useState } from 'react'; // react
import { useIntl } from '@umijs/max'
import { SelectLang, useModel, history } from '@umijs/max'; // umi/max
import { WechatOutlined } from '@ant-design/icons'; // antd 图标
import { LoginForm } from '@ant-design/pro-components'; // antd 高级组件
import { message, Row, Col, Tabs, Space } from 'antd'  // antd 组件

// 引入业务组件
import Account from './components/Account' // 账户密码登录
import Mobile from './components/Mobile' // 手机号码登录
import type { LoginType, LoginParams } from './utils/indexface'
import Footer from '@/components/Footer'; // 全局页脚
import styles from './index.less'; // css 样式恩建
import { login } from '@/services/ant-design-pro/api';  // 登录接口

const iconStyles: CSSProperties = {
  marginInlineStart: '16px',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};
const Login: FC = () => {
  const { formatMessage } = useIntl();
  // 初始化状态
  const { initialState, setInitialState } = useModel('@@initialState');
  const [loginType, setLoginType] = useState<LoginType>('account');
  // 获取用户信息
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    console.log(userInfo)
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };
  // 表单提交
  const handleSubmit = async (values: LoginParams) => {
    try {
      // 调用登录接口
      const msg = await login({ ...values, type: loginType });
      if (msg.status) {
        // 如果登录成功，提示信息
        // message.success(formatMessage('pages.login.success'));
        // 获取用户信息
        await fetchUserInfo();
        setTimeout(() => {
          const urlParams = new URL(window.location.href).searchParams;
          // 路由跳转
          history.push(urlParams.get('redirect') || '/');
        }, 100)
        return;
      }
    } catch (error) {
      message.error(formatMessage({ id: 'pages.login.failure' }));
    }
  };

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
            title="React-umi-xmw"
            subTitle={formatMessage({ id: 'pages.login.subtitle' })}
            onFinish={async (values) => {
              await handleSubmit(values as LoginParams);
            }}
            actions={
              <Space>
                其他登录方式
                <WechatOutlined style={{ color: '#02d10d', ...iconStyles }} />
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

export default Login;
