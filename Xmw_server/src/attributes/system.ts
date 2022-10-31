/*
 * @Description: System Attributes
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-27 10:10:44
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-31 16:54:20
 */

/**
 * @description: xmw_menu Attributes
 * @return {*}
 * @author: Cyan
 */
export type MenuAttributes = {
  menu_id: string; // 菜单id
  name: string; // 国际化对应的name
  menu_type: string; // 菜单类型
  path?: string; // 路由url
  icon?: string; // 菜单图标
  component?: string; // 菜单对应的文件路径
  redirect?: string; // 路由重定向地址
  parent_id?: string; // 父级id
  target?: string; // 当path是一个url，点击新窗口打开
  permission?: string; // 菜单标识(页面按钮权限控制)
  access?: string; // 路由和菜单的权限控制
  layout?: string; // 是否显示layout布局
  navTheme?: string; // 导航菜单的主题
  headerTheme?: string; // 顶部导航的主题，mix 模式生效
  hideChildrenInMenu: boolean; // 是否隐藏子路由
  hideInMenu: boolean; // 是否隐藏菜单，包括子路由
  hideInBreadcrumb: boolean; // 是否在面包屑中隐藏
  headerRender: boolean; // 是否显示顶栏
  footerRender: boolean; // 是否显示页脚
  menuRender: boolean; // 当前路由是否展示菜单
  menuHeaderRender: boolean; // 当前路由是否展示菜单顶栏
  flatMenu: boolean; // 子项往上提，只是不展示父菜单
  fixedHeader: boolean; // 固定顶栏
  fixSiderbar: boolean; // 固定菜单
  founder?: string; // 创建人
  sort: number; // 排序
  status: string; // 菜单状态
  created_time?: Date; // 创建时间
  updated_time?: Date; // 最后一次更新时间
  children?: MenuAttributes[];
};

/**
 * @description: xmw_role Attributes
 * @return {*}
 * @author: Cyan
 */
export type RoleAttributes = {
  role_id: string; // 角色id
  role_name: string; // 角色名称
  role_code: string; // 角色编码
  menu_permission: string[]; // 权限集合
  describe: string; // 角色描述
  founder?: string; // 创建人
  sort: number; // 排序
  status: string; // 角色状态
  created_time?: Date; // 创建时间
  updated_time?: Date; // 最后一次更新时间
};

/**
 * @description: xmw_permission Attributes
 * @return {*}
 * @author: Cyan
 */
export type PermissionAttributes = {
  permission_id: string; // 权限id
  role_id: string; // 角色id
  menu_id: string; // 菜单id
  created_time?: Date; // 创建时间
  updated_time?: Date; // 最后一次更新时间
};

/**
 * @description: xmw_international Attributes
 * @return {*}
 * @author: Cyan
 */
export type InternationalAttributes = {
  id: string; // id
  name: string; // 国际化字段
  'zh-CN'?: string; // 中文
  'en-US'?: string; // 英文
  'ja-JP'?: string; // 日文
  'zh-TW'?: string; // 繁体中文
  parent_id?: string; // 父级id
  founder?: string; // 创建人
  sort: number; // 排序
  created_time?: Date; // 创建时间
  updated_time?: Date; // 最后一次更新时间
  children?: InternationalAttributes[];
};