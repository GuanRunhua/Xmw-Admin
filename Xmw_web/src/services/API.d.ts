/*
 * @Description: 接口数据类型定义
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-23 10:23:23
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-13 09:12:47
 */
declare namespace API {
  import { LANGS, RequestMethods } from '@/utils/types'
  import { AnnouncementType } from '@/utils/types/administrative/announcement'
  import type { OrgTypes } from '@/utils/types/administrative/organization'

  type TIMES = {
    created_time: Date; // 创建时间
    updated_time: Date; // 最后一次更新时间
  }

  /**
 * @description: 国际化多语言层级对象
 * @author: 白雾茫茫丶
 */
  type LOCALESLANGAll = Record<LANGS, string>

  /**
   * @description: 智能行政-组织管理
   * @author: 白雾茫茫丶
   */
  type ORGANIZATION = {
    org_id: string; // 组织id
    org_name: string; // 组织名称
    org_code: string; // 组织编码
    org_type: OrgTypes; // 组织类型
    org_logo: string; // 组织 logo
    describe: string; // 组织描述
    parent_id: string; // 父级id
    status: number; // 组织状态
    sort: number; // 排序
    leader: string; // 岗位负责人
    founder: string; // 创建人
    children?: ORGANIZATION[];
  } & TIMES;

  /**
   * @description: 智能行政-岗位管理
   * @author: 白雾茫茫丶
   */
  type JOBSMANAGEMENT = {
    jobs_id: string; // 岗位id
    jobs_name: string; // 岗位名称
    describe: string; // 岗位描述
    parent_id: string; // 父级id
    leader: string; // 岗位负责人
    founder: string; // 创建人
    sort: number; // 排序
    children?: JOBSMANAGEMENT[];
  } & Pick<ORGANIZATION, 'org_id' | 'org_name' | 'org_logo'> & TIMES;

  /**
   * @description: 智能行政-活动公告
   * @author: 白雾茫茫丶
   */
  type ANNOUNCEMENT = {
    announcement_id: string; // id 主键
    user_id: string; // 作者 id
    cn_name: string; // 中文名
    avatar_url: string; // 作者头像
    title: string; // 标题
    content: string; // 正文内容
    type: AnnouncementType; // 类型
    status: number; // 状态
    pinned: number; // 是否置顶
    readCounts: number; // 阅读次数
  } & TIMES

  /**
   * @description: 系统设置-菜单管理
   * @author: 白雾茫茫丶
   */
  type MENUMANAGEMENT = {
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
    layout?: string; // 是否显示layout布局
    navTheme?: string; // 导航菜单的主题
    headerTheme?: string; // 顶部导航的主题，mix 模式生效
    hideChildrenInMenu: number; // 是否隐藏子路由
    hideInMenu: number; // 是否隐藏菜单，包括子路由
    hideInBreadcrumb: number; // 是否在面包屑中隐藏
    headerRender: number; // 是否显示顶栏
    footerRender: number; // 是否显示页脚
    menuRender: number; // 当前路由是否展示菜单
    menuHeaderRender: number; // 当前路由是否展示菜单顶栏
    flatMenu: number; // 子项往上提，只是不展示父菜单
    fixedHeader: number; // 固定顶栏
    fixSiderbar: number; // 固定菜单
    founder?: string; // 创建人
    sort: number; // 排序
    status: number; // 菜单状态
    routes?: MENUMANAGEMENT[];
    [key: string]: string
  } & TIMES & LOCALESLANGAll;

  /**
   * @description: 系统设置-用户管理
   * @author: 白雾茫茫丶
   */
  type USERMANAGEMENT = {
    user_id: string; // 用户id
    user_name: string; // 用户名称
    work_no: string; // 用户工号
    password: string; // 密码(加密)
    confirmPassword?: string // 确认密码
    cn_name: string; // 中文名
    en_name?: string; // 英文名
    age: number; // 年龄
    email: string; // 电子邮箱
    phone: string; // 电话号码
    avatar_url: string; // 头像地址
    sex: string; // 用户性别
    sort: number; // 排序
    status: number; // 用户状态
    token: string; // 用户令牌
    motto: string; // 座右铭
    tags: string[]; // 人物标签
    city: string[]; // 所属城市
    address: string; // 详细地址
    jobs_id: string; // 岗位id
    jobs_name: string; // 岗位名称
    org_id: string; // 组织id
    org_name: string; // 组织名称
    role_id: string; // 角色id
    role_name: string; // 角色名称
    founder: string; // 创建人
    login_num: number; // 登录次数
    login_last_ip: string; // 最后一次登录ip
    login_last_time: Date; // 最后一次登录时间
  } & TIMES;

  /**
   * @description: 系统设置-角色管理
   * @author: 白雾茫茫丶
   */
  type ROLEMENU = {
    menu_id: string;
    role_id: string
  }
  type ROLEMANAGEMENT = {
    role_id: string;
    role_name: string;
    role_code: string;
    sort: number;
    founder: string;
    status: number;
    describe: string;
    menu_permission: ROLEMENU[];
  } & TIMES;

  /**
   * @description: 系统设置-国际化
   * @author: 白雾茫茫丶
   */
  type INTERNATIONALIZATION = LOCALESLANGAll & {
    id: string;
    name: string;
    parent_id: string;
    founder: string;
    sort: number; // 排序
    children?: INTERNATIONALIZATION[];
  } & TIMES;

  /**
 * @description: 系统设置-操作日志
 * @author: 白雾茫茫丶
 */
  export type OPERATIONLOG = {
    log_id: string; // id
    user_id: string; // 用户id
    content: string; // 日志内容
    ip: string; // ip
    path: string; // 前端路由
    user_agent: string; // 代理
    method: RequestMethods; // 请求方式
    params: Record<string, any>; // 请求参数
    api_url: string; // 请求地址
  } & TIMES;
}
