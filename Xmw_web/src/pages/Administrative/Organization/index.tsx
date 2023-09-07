/*
 * @Description: 智能行政-组织管理
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-02 14:07:00
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-10 18:04:34
 */

// 引入第三方库
import { PageContainer } from '@ant-design/pro-components' // antd 高级组件
import type { FC } from 'react';

// 引入业务工具类
import TableTemplate from './components/TableTemplate'

const Organization: FC = () => {
    return (
        <PageContainer header={{ title: null }}>
            {/* 表格列表 */}
            <TableTemplate />
        </PageContainer>
    )
}
export default Organization