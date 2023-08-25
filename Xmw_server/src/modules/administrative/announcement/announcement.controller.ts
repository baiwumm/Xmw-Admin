/*
 * @Description: Announcement Controller
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-25 16:18:17
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-08-25 17:19:30
 */
import {
  Controller,
  Get,
  Query,
  UseGuards,
  Post,
  Body,
  Session,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiTags,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger'; // swagger 接口文档
import { AnnouncementService } from './announcement.service'; // Announcement Service
import { ResponseModel, SessionModel, ResData } from '@/global/interface'; // TS类型注解
import { responseMessage } from '@/utils';
import {
  ListAnnouncementDto,
  ResponseAnnouncementDto,
  SaveAnnouncementDto,
  CreateAnnouncementDto,
} from './dto';
import { UpdateResponseDto, DeleteResponseDto } from '@/dto/response.dto'; // 响应体 Dto

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
   * @return {*}
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({ type: ResponseAnnouncementDto })
  @ApiOperation({ summary: '获取活动公告列表' })
  async getOrganizationList(
    @Query() announcementInfo: ListAnnouncementDto,
  ): Promise<ResponseModel> {
    const response = await this.announcementService.getAnnouncementList(
      announcementInfo,
    );
    return responseMessage(response);
  }

  /**
   * @description: 创建活动公告
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOkResponse({ type: CreateAnnouncementDto })
  @ApiOperation({ summary: '创建活动公告' })
  async createAnnouncement(
    @Body() announcementInfo: SaveAnnouncementDto,
    @Session() session: SessionModel,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.announcementService.createAnnouncement(
      announcementInfo,
      session,
    );
    return response;
  }

  /**
   * @description: 更新活动公告
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Put('/:announcement_id')
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新活动公告' })
  async updateInternational(
    @Param('announcement_id') announcement_id: string,
    @Body() announcementInfo: SaveAnnouncementDto,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.announcementService.updateAnnouncement(
      announcement_id,
      announcementInfo,
    );
    return response;
  }

  /**
   * @description: 删除活动公告
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:announcement_id')
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiOperation({ summary: '删除活动公告' })
  async deleteInternational(
    @Param('announcement_id') announcement_id: string,
  ): Promise<ResponseModel<ResData | number>> {
    const response = await this.announcementService.deleteAnnouncement(
      announcement_id,
    );
    return response;
  }
}
