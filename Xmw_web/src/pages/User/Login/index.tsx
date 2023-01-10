/*
 * @Description: 登录页
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 11:09:03
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-10 16:58:27
 */

// 引入第三方库
import { useLocalStorageState, useRequest, useMount, useDebounceFn } from 'ahooks';
import { createFromIconfontCN } from '@ant-design/icons';
import type { FC } from 'react';
import React, { useState } from 'react'; // react
import { SelectLang, useModel, history, useIntl, getLocale } from '@umijs/max'
import { LoginForm } from '@ant-design/pro-components'; // antd 高级组件
import { message, Row, Col, Tabs, notification, Typography } from 'antd'  // antd 组件
import { isEmpty } from 'lodash'
import moment from 'moment'

// 引入业务组件
import type { LoginModel } from '@/global/interface';
import { initAllRequest } from '@/utils/initRequest'
import { CACHE_KEY, encryptionAesPsd, formatResult, waitTime, timeFix } from '@/utils'
import Account from './components/Account' // 账户密码登录
import Mobile from './components/Mobile' // 手机号码登录
import type { LoginType, LoginParams } from './utils/indexface'
import Footer from '@/components/Footer'; // 全局页脚
import styles from './index.module.less'; // css 样式恩建
import { Login } from '@/services/logic/login' // 登录相关接口

const LoginPage: FC = () => {
  // 使用 iconfont.cn 资源
  const IconFont = createFromIconfontCN({
    scriptUrl: process.env.ICONFONT_URL,
  });
  const { formatMessage } = useIntl();
  // 初始化状态
  const { initialState, setInitialState } = useModel('@@initialState');
  // 获取 localstorage key
  const [appCache, setappCache] = useLocalStorageState<Record<string, any> | undefined>(CACHE_KEY);
  // 用户登录类型
  const [loginType, setLoginType] = useState<LoginType>('account');
  // moment语言转换
  moment.locale(getLocale())
  /**
   * @description: 用户登录接口
   * @return {*}
   * @author: Cyan
   */
  const { run: runLogin } = useRequest<LoginModel, LoginParams[]>(
    async (params) => formatResult<LoginModel>(await Login(params)),
    {
      manual: true,
      onSuccess: async (res: LoginModel) => {
        if (!isEmpty(res)) {
          const { access_token, login_last_time } = res
          // 将 token 保存到localstorage
          setappCache({ ...appCache, ACCESS_TOKEN: access_token })
          // 获取用户信息和权限
          const userInfoAndAccess = await initAllRequest()
          if (!isEmpty(userInfoAndAccess)) {
            await setInitialState((s) => ({ ...s, ...userInfoAndAccess }));
            setTimeout(() => {
              const urlParams = new URL(window.location.href).searchParams;
              // 路由跳转
              history.push(urlParams.get('redirect') || '/');
              // 欢迎语
              notification.success({
                message: `${timeFix()}，${userInfoAndAccess?.CurrentUser?.cn_name} 💕`,
                description: login_last_time ? <span>
                  {formatMessage({ id: 'pages.login.success.last-time' })}
                  <Typography.Text strong>{moment(login_last_time).fromNow()}</Typography.Text>
                </span> : <Typography.Text strong>{formatMessage({ id: 'pages.login.success.first-login' })}</Typography.Text>,
                icon: <IconFont type="icon-huanyingye" style={{ color: initialState?.Settings?.colorPrimary, fontSize: '24px' }} />
              })
            }, 0)
          }
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
        if (loginType === 'mobile' && values.captcha !== '1234') {
          message.error(formatMessage({ id: 'pages.login.type.mobile.captcha.failure' }))
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
        {SelectLang && <SelectLang reload={false} />}
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
            title="Xmw Admin"
            subTitle={formatMessage({ id: 'pages.login.subtitle' })}
            onFinish={async (values) => {
              await waitTime(500)
              await handleSubmit(values as LoginParams);
            }}
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
