/*
 * @Description: 安全设置
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2023-01-13 17:33:55
 * @LastEditors: Cyan
 * @LastEditTime: 2023-03-20 17:41:21
 */
import type { FC } from 'react'
import { useIntl, useModel } from '@umijs/max'
import { Typography, Button, Tag } from 'antd'
import { ProList } from '@ant-design/pro-components';
import zxcvbn from 'zxcvbn'; // 密码强度校验
import { keys } from 'lodash'
import { decryptionAesPsd } from '@/utils'
import { strengthMeterOptions } from '@/components/StrengthMeter/config'

const { Text } = Typography;

type dataSourceProps = {
  name: string;
  desc?: string;
  activeKey?: string;
}

const SecuritySetting: FC<{ setActiveKey: React.Dispatch<React.SetStateAction<string>> }> = ({ setActiveKey }) => {
  const { formatMessage } = useIntl();
  // 获取全局状态
  const { initialState } = useModel('@@initialState');
  // 统一国际化前缀
  const formatPerfix: string = 'pages.personal-center.personal-setting.security-setting'
  // 校验密码强度
  const passwordStrength = () => {
    const analysisValue: { score: number } = zxcvbn(decryptionAesPsd(initialState?.CurrentUser?.password || ''))
    // score得分只有0~4，且只有整数范围并没有小数
    return formatMessage({ id: `components.StrengthMeter.${keys(strengthMeterOptions)[analysisValue.score]}` })
  }
  // 邮箱中间三位星号表示
  const regEmail = () => {
    const email = initialState?.CurrentUser?.email || ''
    const emailSplit = email.split('@')
    return `${emailSplit[0].replace(/^(\d{3}).*(\d{4})$/, "$1***$2")}@${emailSplit[1]}`
  }
  // ProList 数据源
  const dataSource: dataSourceProps[] = [
    {
      name: 'certification-realName',
    },
    {
      name: 'account-password',
      desc: passwordStrength(),
      activeKey: 'changePassword'
    },
    {
      name: 'security-phone',
      desc: initialState?.CurrentUser?.phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2"),
      activeKey: 'basicSetting'
    },
    {
      name: 'secure-mailbox',
      desc: regEmail(),
      activeKey: 'basicSetting'
    }
  ];
  return (
    <>
      <ProList<dataSourceProps>
        rowKey="name"
        dataSource={dataSource}
        metas={{
          title: {
            dataIndex: 'name',
            render: (text) => <Text strong>{formatMessage({ id: `${formatPerfix}.${text}` })}</Text>
          },
          description: {
            dataIndex: 'desc',
            render: (text, record, index) => index > 0 ? <Text type="secondary">{formatMessage({ id: `${formatPerfix}.${record.name}.tip` })}：{text}</Text> : null
          },
          actions: {
            render: (_, row, index) => [
              index > 0 ?
                <Button
                  key="edit"
                  type="link"
                  onClick={() => setActiveKey(row.activeKey || 'basicSetting')}>
                  {formatMessage({ id: 'global.button.modify' })}
                </Button> :
                <Tag key="edit" color="success">{formatMessage({ id: `${formatPerfix}.${row.name}.certified` })}</Tag>
            ],
          },
        }}
      />
    </>
  )
}
export default SecuritySetting
