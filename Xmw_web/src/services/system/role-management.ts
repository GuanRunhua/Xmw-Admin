/*
 * @Description: 系统设置-角色管理-API
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-07 10:17:47
 */
import { ROUTES } from '@/utils/enums'
import type { PageResponse } from '@/utils/types'
import type { RoleStatusProps, SearchParams } from '@/utils/types/system/role-management'
import { httpRequest } from '@/utils/umiRequest'

const baseURL = ROUTES.ROLEMANAGEMENT

/**
 * @description:  获取角色列表
 * @param {SearchParams} options
 * @Author: 白雾茫茫丶
 */
export async function getRoleList(options?: SearchParams) {
  return httpRequest.get<PageResponse<API.ROLEMANAGEMENT>>(`${baseURL}`, options);
}

/**
 * @description: 新增角色数据
 * @param {API.ROLEMANAGEMENT} options
 * @Author: 白雾茫茫丶
 */
export async function createRole(
  options: Omit<API.ROLEMANAGEMENT, 'role_id' | 'founder' | 'created_time' | 'updated_time'>,
) {
  return httpRequest.post<API.ROLEMANAGEMENT>(`${baseURL}`, options);
}

/**
 * @description: 更新角色数据
 * @param {API.ROLEMANAGEMENT} options
 * @Author: 白雾茫茫丶
 */
export async function updateRole({ role_id, ...options }: API.ROLEMANAGEMENT) {
  return httpRequest.put<number[]>(`${baseURL}/${role_id}`, options);
}

/**
 * @description: 删除角色数据
 * @param {string} role_id
 * @Author: 白雾茫茫丶
 */
export async function delRole(role_id: string) {
  return httpRequest.delete<number>(`${baseURL}/${role_id}`);
}

/**
 * @description: 设置角色状态
 * @param {Data} options
 * @Author: 白雾茫茫丶
 */
export async function setRoleStatus({ role_id, status }: RoleStatusProps) {
  return httpRequest.patch<number[]>(`${baseURL}/${role_id}`, { status });
}
