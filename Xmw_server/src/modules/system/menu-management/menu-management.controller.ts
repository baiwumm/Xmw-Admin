/*
 * @Description:
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-27 10:37:28
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-17 14:16:24
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
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MenuManagementService } from './menu-management.service'; // MenuManagement Service
import {
  ApiBearerAuth,
  ApiTags,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger'; // swagger 接口文档
import { ResData, ResponseModel, SessionModel } from '@/global/interface'; // TS类型注解
import { UpdateResponseDto, DeleteResponseDto } from '@/dto/response.dto'; // 响应体 Dto
import {
  ListMenuManagementDto,
  SaveMenuManagementDto,
  ResponseMenuManagementDto,
  CreateMenuManagementDto,
} from './dto';
import { responseMessage } from '@/utils'; // 全局工具函数

/* swagger 文档 */
@ApiTags('系统设置-菜单管理')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('system/menu-management')
export class MenuManagementController {
  constructor(private readonly menuManagementService: MenuManagementService) { }

  /**
   * @description: 获取菜单管理列表
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({ type: ResponseMenuManagementDto })
  @ApiOperation({ summary: '获取菜单管理列表' })
  async getMenuList(
    @Query() menuInfo: ListMenuManagementDto,
  ): Promise<ResponseModel> {
    const response = await this.menuManagementService.getMenuList(menuInfo);
    return responseMessage(response);
  }

  /**
   * @description: 创建菜单数据
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOkResponse({ type: CreateMenuManagementDto })
  @ApiOperation({ summary: '创建菜单数据' })
  async createMenu(
    @Body() menuInfo: SaveMenuManagementDto,
    @Session() session: SessionModel,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.menuManagementService.createMenu(
      menuInfo,
      session,
    );
    return response;
  }

  /**
   * @description: 更新菜单数据
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Put('/:menu_id')
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新菜单数据' })
  async updateJobs(
    @Param('menu_id') menu_id: string,
    @Body() menuInfo: SaveMenuManagementDto,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.menuManagementService.updateMenu(
      menu_id,
      menuInfo,
    );
    return response;
  }

  /**
   * @description: 删除菜单数据
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:menu_id')
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiOperation({ summary: '删除菜单数据' })
  async deleteMenu(
    @Param('menu_id') menu_id: string,
  ): Promise<ResponseModel<ResData | number>> {
    const response = await this.menuManagementService.deleteMenu(menu_id);
    return response;
  }
}
