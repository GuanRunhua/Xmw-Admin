import { ORG_TYPE } from '@/utils/enums'

// 组织类型
export type OrgTypes = (typeof ORG_TYPE)[keyof typeof ORG_TYPE]
/**
 * @description: FormTemplate Props
 * @Author: 白雾茫茫丶
 */
export type FormTemplateProps = {
  treeData: API.ORGANIZATION[], // 组织树形数据
  userList: API.USERMANAGEMENT[]; // 用户列表
  reloadTable: () => void, // 刷新表格
  formData?: API.ORGANIZATION,
  parent_id?: string;
  open: boolean;
  setOpenDrawerFalse: () => void
}

/**
 * @description: FormTemplateItem Props
 * @author: 白雾茫茫丶
 */
export type FormTemplateItemProps = {
  treeData: API.ORGANIZATION[], // 组织树形数据
  userList: API.USERMANAGEMENT[]; // 用户列表
  parent_id?: string
}

/**
 * @description: 头部搜索表单 Params
 * @author: 白雾茫茫丶
 */
export type SearchParams = {
  org_name?: string; // 组织名称
  org_code?: string; // 组织编码
  org_type?: string; // 组织类型
  start_time?: string; // 开始日期
  end_time?: string; // 结束日期
}

/**
 * @description: 新增组织 Params
 * @author: 白雾茫茫丶
 */
export type CreateOrgParams = {
  parent_id?: string; // 父级id
  org_name: string; // 组织名称
  org_type: string; // 组织编码
  org_logo: string; // 组织logo
  status: number; // 组织状态
  sort: number; // 排序
  describe: string; // 组织描述
}
