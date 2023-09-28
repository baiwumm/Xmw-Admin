/*
 * @Description: 用户管理 Dto
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-11-09 18:10:07
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-10 14:46:43
 */
import { ListUserManagementDto } from './list.user-management.dto'; // 查询用户管理列表参数 Dto
import {
  SaveUserManagementDto,
  UpdateUserStatusDto,
} from './save.user-management.dto'; // 保存用户数据 Dto
import {
  ResponseUserManagementDto,
  CreateUserManagementDto,
} from './response.user-management.dto'; // 查询列表返回响应体 Dto

export {
  ListUserManagementDto,
  SaveUserManagementDto,
  CreateUserManagementDto,
  ResponseUserManagementDto,
  UpdateUserStatusDto,
};
