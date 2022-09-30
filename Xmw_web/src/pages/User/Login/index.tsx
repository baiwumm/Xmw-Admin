/*
 * @Description: 登录页
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 11:09:03
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-30 11:16:16
 */

// 引入第三方库
import type { FC } from 'react';
import { useState } from 'react'; // react
import { useIntl } from '@umijs/max'
import { SelectLang, useModel, history } from '@umijs/max'; // umi/max
import { LockOutlined, UserOutlined } from '@ant-design/icons'; // antd 图标
import { LoginForm, ProFormText } from '@ant-design/pro-components'; // antd 高级组件
import { message, Alert } from 'antd'  // antd 组件

// 引入业务组件
import Footer from '@/components/Footer'; // 全局页脚
import styles from './index.less'; // css 样式恩建
import { login } from '@/services/ant-design-pro/api';  // 登录接口

// 登录状态弹框提示
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: FC = () => {
  const { formatMessage } = useIntl();
  // 用户登录状态
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  // 初始化状态
  const { initialState, setInitialState } = useModel('@@initialState');
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
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 调用登录接口
      const msg = await login({ ...values, type: 'account' });
      if (msg.status === 'ok') {
        // 如果登录成功，提示信息
        // message.success(formatMessage('pages.login.success'));
        // 获取用户信息

        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        // 路由跳转
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      console.log(error);
      message.error(formatMessage({ id: 'pages.login.failure' }));
    }
  };

  // 结构用户登录状态
  const { status, type: loginType } = userLoginState;
  return (
    <div className={styles.container}>
      {/* 国际化下拉框 */}
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        {/* 登录表单 */}
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="React-umi-xmw"
          subTitle={formatMessage({ id: 'pages.login.subtitle' })}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          {/* 错误信息提示 */}
          {status === 'error' && loginType === 'account' && (
            <LoginMessage
              content={formatMessage({ id: 'pages.login.accountLogin.errorMessage' })}
            />
          )}
          {/* 用户名 */}
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={formatMessage({ id: 'pages.login.username.placeholder' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'pages.login.username.required' }),
              },
            ]}
          />
          {/* 密码输入框 */}
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder={formatMessage({ id: 'pages.login.password.placeholder' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'pages.login.password.required' }),
              },
            ]}
          />
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
