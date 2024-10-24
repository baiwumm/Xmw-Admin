/*
 * @Description:
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-27 10:37:28
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-17 14:16:24
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'; // swagger 接口文档
import { LoggerInterceptor } from '@/interceptor/logger.interceptor';
import { DeleteResponseDto, UpdateResponseDto } from '@/dto/response.dto'; // 响应体 Dto
import type { SessionTypes } from '@/utils/types';

import {
  CreateMenuManagementDto,
  ListMenuManagementDto,
  ResponseMenuManagementDto,
  SaveMenuManagementDto,
} from './dto';
import { MenuManagementService } from './menu-management.service'; // MenuManagement Service

/* swagger 文档 */
@ApiTags('系统设置-菜单管理')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthGuard('jwt'))
@Controller('system/menu-management')
export class MenuManagementController {
  constructor(private readonly menuManagementService: MenuManagementService) { }

  /**
   * @description: 获取菜单管理列表
   * @author: 白雾茫茫丶
   */
  @Get()
  @ApiOkResponse({ type: ResponseMenuManagementDto })
  @ApiOperation({ summary: '获取菜单管理列表' })
  async getMenuList(@Query() menuInfo: ListMenuManagementDto) {
    const response = await this.menuManagementService.getMenuList(menuInfo);
    return response;
  }

  /**
   * @description: 创建菜单数据
   * @author: 白雾茫茫丶
   */
  @Post()
  @ApiOkResponse({ type: CreateMenuManagementDto })
  @ApiOperation({ summary: '创建菜单数据' })
  async createMenu(
    @Body() menuInfo: SaveMenuManagementDto,
    @Session() session: SessionTypes,
  ) {
    const response = await this.menuManagementService.createMenu(
      menuInfo,
      session,
    );
    return response;
  }

  /**
   * @description: 更新菜单数据
   * @author: 白雾茫茫丶
   */
  @Put('/:menu_id')
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新菜单数据' })
  async updateJobs(
    @Param('menu_id') menu_id: string,
    @Body() menuInfo: SaveMenuManagementDto,
  ) {
    const response = await this.menuManagementService.updateMenu(
      menu_id,
      menuInfo,
    );
    return response;
  }

  /**
   * @description: 删除菜单数据
   * @author: 白雾茫茫丶
   */
  @Delete('/:menu_id')
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiOperation({ summary: '删除菜单数据' })
  async deleteMenu(@Param('menu_id') menu_id: string) {
    const response = await this.menuManagementService.deleteMenu(menu_id);
    return response;
  }
}
