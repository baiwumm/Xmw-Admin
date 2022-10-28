/*
 * @Description: RoleManagement Controller
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-28 17:39:08
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-28 18:21:44
 */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  Param,
} from '@nestjs/common';
import { RoleManagementService } from './role-management.service'; // RoleManagement Service
import {
  ApiBearerAuth,
  ApiTags,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger'; // swagger 接口文档
import { ResData, ResponseModel, PageResModel } from '@/global/interface'; // TS类型注解
import { ResponseDto } from '@/dto/response.dto'; // 响应体 Dto
import { ResponseRoleManagementDto, ListRoleManagementDto } from './dto';

/* swagger 文档 */
@ApiTags('系统设置-角色管理')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('system/role-management')
export class RoleManagementController {
  constructor(private readonly roleManagementService: RoleManagementService) {}

  /**
   * @description: 获取角色管理列表
   * @return {*}
   * @author: Cyan
   */
  @Get()
  @ApiOkResponse({ type: ResponseRoleManagementDto })
  @ApiOperation({ summary: '获取角色管理列表' })
  async getRoleList(
    @Query() roleInfo: ListRoleManagementDto,
  ): Promise<ResponseModel<PageResModel>> {
    const response = await this.roleManagementService.getRoleList(roleInfo);
    return { data: response };
  }
}
