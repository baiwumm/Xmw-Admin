/*
 * @Description: RoleManagement Controller
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-28 17:39:08
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-09 10:53:18
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
import {
  ResponseRoleManagementDto,
  ListRoleManagementDto,
  SaveRoleManagementDto,
  UpdateRoleStatusDto,
} from './dto';

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

  /**
   * @description: 创建角色数据
   * @return {*}
   * @author: Cyan
   */
  @Post()
  @ApiOkResponse({ type: ResponseDto })
  @ApiOperation({ summary: '创建角色数据' })
  async createRole(
    @Body() roleInfo: SaveRoleManagementDto,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.roleManagementService.createRole(roleInfo);
    return response;
  }

  /**
   * @description: 更新角色数据
   * @return {*}
   * @author: Cyan
   */
  @Put('/:role_id')
  @ApiOkResponse({ type: ResponseDto })
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
  @Delete('/:role_id')
  @ApiOkResponse({ type: ResponseDto })
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
  @Patch('/:role_id')
  @ApiOkResponse({ type: ResponseDto })
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
