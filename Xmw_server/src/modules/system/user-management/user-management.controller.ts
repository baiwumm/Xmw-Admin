/*
 * @Description: UserManagement Controller
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-09 17:43:51
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-09 18:15:29
 */
import { Controller, Get, Query } from '@nestjs/common';
import { UserManagementService } from './user-management.service'; // UserManagement Service
import {
  ApiBearerAuth,
  ApiTags,
  ApiHeader,
  ApiOperation,
} from '@nestjs/swagger'; // swagger 接口文档
import { XmwUser } from '@/models/xmw_user.model'; // xmw_user 实体
import { ResponseModel, PageResModel } from '@/global/interface'; // TS类型注解
import { ListUserManagementDto } from './dto';

/* swagger 文档 */
@ApiTags('系统设置-用户管理')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('system/user-management')
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) {}

  /**
   * @description: 获取用户管理列表
   * @return {*}
   * @author: Cyan
   */
  @Get()
  //  @ApiOkResponse({ type: ResponseRoleManagementDto })
  @ApiOperation({ summary: '获取用户管理列表' })
  async getUserList(
    @Query() roleInfo: ListUserManagementDto,
  ): Promise<ResponseModel<PageResModel<XmwUser[]>>> {
    const response = await this.userManagementService.getUserList(roleInfo);
    return { data: response };
  }
}
