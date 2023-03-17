/*
 * @Description: UserManagement Controller
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-09 17:43:51
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-17 14:17:53
 */
import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserManagementService } from './user-management.service'; // UserManagement Service
import {
  ApiBearerAuth,
  ApiTags,
  ApiHeader,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger'; // swagger 接口文档
import { XmwUser } from '@/models/xmw_user.model'; // xmw_user 实体
import {
  ResData,
  ResponseModel,
  PageResModel,
  SessionModel,
} from '@/global/interface'; // TS类型注解
import { UpdateResponseDto, DeleteResponseDto } from '@/dto/response.dto'; // 响应体 Dto
import {
  ListUserManagementDto,
  SaveUserManagementDto,
  ResponseUserManagementDto,
  CreateUserManagementDto,
  UpdateUserStatusDto,
} from './dto';
import { responseMessage } from '@/utils'; // 全局工具函数

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
  constructor(private readonly userManagementService: UserManagementService) { }

  /**
   * @description: 获取用户管理列表
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({ type: ResponseUserManagementDto })
  @ApiOperation({ summary: '获取用户管理列表' })
  async getUserList(
    @Query() userInfo: ListUserManagementDto,
  ): Promise<ResponseModel<PageResModel<XmwUser[]>>> {
    const response = await this.userManagementService.getUserList(userInfo);
    return responseMessage(response);
  }

  /**
   * @description: 创建用户数据
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOkResponse({ type: CreateUserManagementDto })
  @ApiOperation({ summary: '创建用户数据' })
  async createUser(
    @Body() userInfo: SaveUserManagementDto,
    @Session() session: SessionModel,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.userManagementService.createUser(
      userInfo,
      session,
    );
    return response;
  }

  /**
   * @description: 更新用户数据
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Put('/:user_id')
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新用户数据' })
  async updateUser(
    @Param('user_id') user_id: string,
    @Body() userInfo: SaveUserManagementDto,
    @Session() session: SessionModel,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.userManagementService.updateUser(
      user_id,
      userInfo,
      session,
    );
    return response;
  }

  /**
   * @description: 删除用户数据
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:user_id')
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiOperation({ summary: '删除用户数据' })
  async deleteUser(
    @Param('user_id') user_id: string,
  ): Promise<ResponseModel<ResData | number>> {
    const response = await this.userManagementService.deleteUser(user_id);
    return response;
  }

  /**
   * @description: 更新用户状态
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:user_id')
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新用户状态' })
  async updateUserStatus(
    @Param('user_id') user_id: string,
    @Body() { status }: UpdateUserStatusDto,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.userManagementService.updateUserStatus(
      user_id,
      status,
    );
    return response;
  }
}
