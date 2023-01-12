/*
 * @Description: 个人设置
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2023-01-12 15:19:34
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-12 18:17:20
 */
import type { FC } from 'react'
import { Tabs, Card } from 'antd';
import { useIntl } from '@umijs/max'
import { PageContainer } from '@ant-design/pro-components' // antd 高级组件
import ChangePassword from './components/ChangePassword' // 修改密码

const PersonalSetting: FC = () => {
  const { formatMessage } = useIntl();
  //  Tabs 配置项
  const tabsItems = [
    {
      label: formatMessage({ id: 'pages.personal-center.personal-setting.basic-setting' }),
      key: 'basicSetting',
    },
    {
      label: formatMessage({ id: 'pages.personal-center.personal-setting.change-password' }),
      key: 'changePassword',
      children: <ChangePassword />
    }
  ]
  return (
    <PageContainer header={{ title: null }}>
      <Card>
        <Tabs tabPosition='left' items={tabsItems} />
      </Card>
    </PageContainer>
  )
}
export default PersonalSetting