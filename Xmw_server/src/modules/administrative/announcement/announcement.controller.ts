/*
 * @Description: Announcement Controller
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-25 16:18:17
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 16:47:01
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'; // swagger 接口文档

import { DeleteResponseDto, UpdateResponseDto } from '@/dto/response.dto'; // 响应体 Dto
import type { SessionTypes } from '@/utils/types';

import { AnnouncementService } from './announcement.service'; // Announcement Service
import {
  CreateAnnouncementDto,
  ListAnnouncementDto,
  ResponseAnnouncementDto,
  SaveAnnouncementDto,
  UpdatePinnedDto,
} from './dto';

/* swagger 文档 */
@ApiTags('智能行政-活动公告')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('administrative/announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) { }

  /**
   * @description: 获取活动公告列表
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({ type: ResponseAnnouncementDto })
  @ApiOperation({ summary: '获取活动公告列表' })
  async getAnnouncementList(@Query() announcementInfo: ListAnnouncementDto) {
    const response = await this.announcementService.getAnnouncementList(
      announcementInfo,
    );
    return response;
  }

  /**
   * @description: 创建活动公告
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOkResponse({ type: CreateAnnouncementDto })
  @ApiOperation({ summary: '创建活动公告' })
  async createAnnouncement(
    @Body() announcementInfo: SaveAnnouncementDto,
    @Session() session: SessionTypes,
  ) {
    const response = await this.announcementService.createAnnouncement(
      announcementInfo,
      session,
    );
    return response;
  }

  /**
   * @description: 更新活动公告
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Put('/:announcement_id')
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新活动公告' })
  async updateAnnouncement(
    @Param('announcement_id') announcement_id: string,
    @Body() announcementInfo: SaveAnnouncementDto,
  ) {
    const response = await this.announcementService.updateAnnouncement(
      announcement_id,
      announcementInfo,
    );
    return response;
  }

  /**
   * @description: 删除活动公告
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:announcement_id')
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiOperation({ summary: '删除活动公告' })
  async deleteAnnouncement(@Param('announcement_id') announcement_id: string) {
    const response = await this.announcementService.deleteAnnouncement(
      announcement_id,
    );
    return response;
  }

  /**
   * @description: 更新是否置顶状态
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:announcement_id')
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新是否置顶状态' })
  async updatePinned(
    @Param('announcement_id') announcement_id: string,
    @Body() { pinned }: UpdatePinnedDto,
  ) {
    const response = await this.announcementService.updatePinned(
      announcement_id,
      pinned,
    );
    return response;
  }
}
