import { ProFormRadio, ProFormSelect } from '@ant-design/pro-components'; // antd 高级组件
import { useIntl } from '@umijs/max'
import { Divider, Typography } from 'antd' // antd 组件库
import type { FC } from 'react'

import { formatPerfix } from '@/utils'
import { FLAG_OPTS } from '@/utils/const'
import { ROUTES } from '@/utils/enums'

import { LAYOUT_OPTS, NAV_THEME_OPTS, TARGET_OPTS } from '../utils/config'
const { Title } = Typography;

const MenuFormRender: FC = () => {
	const { formatMessage } = useIntl();
	return (
		<>
			<Divider orientation="left" style={{ marginTop: 0, marginBottom: '24px' }}>
				<Title level={4} style={{ marginBottom: '-14px' }}>路由配置</Title>
			</Divider>
			{/* 显示layout布局 */}
			<ProFormSelect
				name="layout"
				colProps={{ span: 12 }}
				initialValue={'side'}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.layout` })}
				tooltip={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.layout.tooltip` })}
				options={LAYOUT_OPTS}
				fieldProps={{
					allowClear: false,
				}}
			/>
			{/* 菜单主题 */}
			<ProFormSelect
				name="navTheme"
				colProps={{ span: 12 }}
				initialValue={'light'}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.navTheme` })}
				options={NAV_THEME_OPTS}
				fieldProps={{
					allowClear: false,
				}}
			/>
			{/* 顶部导航的主题，mix 模式生效 */}
			<ProFormSelect
				name="headerTheme"
				colProps={{ span: 12 }}
				initialValue={'light'}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.headerTheme` })}
				options={NAV_THEME_OPTS}
				fieldProps={{
					allowClear: false,
				}}
			/>
			{/* 窗口打开方式 */}
			<ProFormSelect
				name="target"
				colProps={{ span: 12 }}
				initialValue={'_blank'}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.target` })}
				tooltip={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.target.tooltip` })}
				options={TARGET_OPTS.map((item) => ({ value: item, label: item }))}
				fieldProps={{
					allowClear: false,
				}}
			/>
			{/* 隐藏子路由 */}
			<ProFormRadio.Group
				name="hideChildrenInMenu"
				colProps={{ span: 8 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.hideChildrenInMenu` })}
				radioType="button"
				initialValue={0}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={FLAG_OPTS}
			/>
			{/* 隐藏菜单 */}
			<ProFormRadio.Group
				name="hideInMenu"
				colProps={{ span: 8 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.hideInMenu` })}
				radioType="button"
				initialValue={0}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={FLAG_OPTS}
			/>
			{/* 在面包屑中隐藏 */}
			<ProFormRadio.Group
				name="hideInBreadcrumb"
				colProps={{ span: 8 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.hideInBreadcrumb` })}
				radioType="button"
				initialValue={0}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={FLAG_OPTS}
			/>
			{/* 显示顶栏 */}
			<ProFormRadio.Group
				name="headerRender"
				colProps={{ span: 8 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.headerRender` })}
				radioType="button"
				initialValue={1}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={FLAG_OPTS}
			/>
			{/* 显示页脚 */}
			<ProFormRadio.Group
				name="footerRender"
				colProps={{ span: 8 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.footerRender` })}
				radioType="button"
				initialValue={1}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={FLAG_OPTS}
			/>
			{/* 显示菜单 */}
			<ProFormRadio.Group
				name="menuRender"
				colProps={{ span: 8 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.menuRender` })}
				radioType="button"
				initialValue={1}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={FLAG_OPTS}
			/>
			{/* 显示菜单顶栏 */}
			<ProFormRadio.Group
				name="menuHeaderRender"
				colProps={{ span: 8 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.menuHeaderRender` })}
				radioType="button"
				initialValue={1}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={FLAG_OPTS}
			/>
			{/* 子项往上提 */}
			<ProFormRadio.Group
				name="flatMenu"
				colProps={{ span: 8 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.flatMenu` })}
				radioType="button"
				initialValue={0}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={FLAG_OPTS}
			/>
			{/* 固定顶栏 */}
			<ProFormRadio.Group
				name="fixedHeader"
				colProps={{ span: 8 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.fixedHeader` })}
				radioType="button"
				initialValue={1}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={FLAG_OPTS}
			/>
			{/* 固定菜单 */}
			<ProFormRadio.Group
				name="fixSiderbar"
				colProps={{ span: 8 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.fixSiderbar` })}
				radioType="button"
				initialValue={1}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={FLAG_OPTS}
			/>
		</>
	)
}

export default MenuFormRender