/*
 * @Description: RoleManagement Controller
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-28 17:39:08
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-17 14:17:05
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
  Patch,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleManagementService } from './role-management.service'; // RoleManagement Service
import {
  ApiBearerAuth,
  ApiTags,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger'; // swagger 接口文档
import { XmwRole } from '@/models/xmw_role.model'; // xmw_role 实体
import {
  ResData,
  ResponseModel,
  PageResModel,
  SessionModel,
} from '@/global/interface'; // TS类型注解
import { UpdateResponseDto, DeleteResponseDto } from '@/dto/response.dto'; // 响应体 Dto
import {
  ResponseRoleManagementDto,
  ListRoleManagementDto,
  SaveRoleManagementDto,
  UpdateRoleStatusDto,
  CreateRoleManagementDto,
} from './dto';
import { responseMessage } from '@/utils'; // 全局工具函数

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
  constructor(private readonly roleManagementService: RoleManagementService) { }

  /**
   * @description: 获取角色管理列表
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({ type: ResponseRoleManagementDto })
  @ApiOperation({ summary: '获取角色管理列表' })
  async getRoleList(
    @Query() roleInfo: ListRoleManagementDto,
  ): Promise<ResponseModel<PageResModel<XmwRole[]>>> {
    const response = await this.roleManagementService.getRoleList(roleInfo);
    return responseMessage(response);
  }

  /**
   * @description: 创建角色数据
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOkResponse({ type: CreateRoleManagementDto })
  @ApiOperation({ summary: '创建角色数据' })
  async createRole(
    @Body() roleInfo: SaveRoleManagementDto,
    @Session() session: SessionModel,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.roleManagementService.createRole(
      roleInfo,
      session,
    );
    return response;
  }

  /**
   * @description: 更新角色数据
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Put('/:role_id')
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新角色数据' })
  async updateRole(
    @Param('role_id') role_id: string,
    @Body() roleInfo: SaveRoleManagementDto,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.roleManagementService.updateRole(
      role_id,
      roleInfo,
    );
    return response;
  }

  /**
   * @description: 删除角色数据
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:role_id')
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiOperation({ summary: '删除角色数据' })
  async deleteRole(
    @Param('role_id') role_id: string,
  ): Promise<ResponseModel<ResData | number>> {
    const response = await this.roleManagementService.deleteRole(role_id);
    return response;
  }

  /**
   * @description: 更新角色状态
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:role_id')
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新角色状态' })
  async updateRoleStatus(
    @Param('role_id') role_id: string,
    @Body() { status }: UpdateRoleStatusDto,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.roleManagementService.updateRoleStatus(
      role_id,
      status,
    );
    return response;
  }
}
