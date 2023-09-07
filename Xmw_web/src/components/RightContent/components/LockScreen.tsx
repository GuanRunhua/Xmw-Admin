/*
 * @Description: 锁定屏幕页面
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-01-06 14:20:20
 * @LastEditors: Cyan
 * @LastEditTime: 2023-07-10 14:30:06
 */
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useIntl, useModel } from '@umijs/max'
import { useLocalStorageState } from 'ahooks'
import { Avatar, Button, Col, Form, Input, message, Row, Typography } from 'antd'
import type { FC } from 'react'

import { encryptionAesPsd } from '@/utils'

const { Title } = Typography;

const LockScreen: FC<{ setLockPageFalse: () => void }> = ({ setLockPageFalse }) => {
  const { formatMessage } = useIntl();
  // 获取全局状态
  const { initialState } = useModel('@@initialState');
  // 表单实例
  const [form] = Form.useForm()
  // 获取锁屏密码
  const [lockPassword, setLockPassword] = useLocalStorageState<string | undefined>('lock_password');
  // 最外层样式
  const wrapClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      zIndex: 999,
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'url(\'/images/lockScreen.jpg\') no-repeat fixed center',
    };
  });

  // 提交表单
  const hanlderSubmit = () => {
    // 触发表单校验
    form.validateFields().then((values: { password: string }) => {
      if (lockPassword === encryptionAesPsd(values.password)) {
        setLockPageFalse()
        setLockPassword(undefined)
      } else {
        message.error(formatMessage({ id: 'components.RightContent.LockScreen.error' }))
      }
    })
  };
  return (
    <div className={wrapClassName}>
      <Row justify="center" align="middle" style={{ flexDirection: 'column' }}>
        <Col>
          <Avatar size={120} src={initialState?.CurrentUser?.avatar_url} />
        </Col>
        <Col>
          <Title level={2}>{initialState?.CurrentUser?.cn_name}</Title>
        </Col>
        <Col>
          <Form form={form} style={{ textAlign: 'left' }}>
            <Form.Item name="password" rules={[{ required: true, min: 6, max: 12 }]}>
              <Input.Password
                placeholder={`
                ${formatMessage({ id: 'global.form.placeholder' })}
                ${formatMessage({ id: 'components.RightContent.LockScreen.password' })}
                `}
              />
            </Form.Item>
          </Form>
        </Col>
        <Button
          type="primary"
          block
          onClick={hanlderSubmit}>{formatMessage({ id: 'components.RightContent.LockScreen.access-system' })
          }</Button>
      </Row>
    </div>
  )
}
export default LockScreen