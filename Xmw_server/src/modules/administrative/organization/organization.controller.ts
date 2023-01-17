/*
 * @Description: Organization Controller
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-19 11:19:47
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-17 14:10:05
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
import { OrganizationService } from './organization.service'; // Organization Service
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
  ListOrganizationDto,
  ResponseOrganizationDto,
  SaveOrganizationDto,
  CreateOrganizationDto,
} from './dto';
import { responseMessage } from '@/utils';

/* swagger 文档 */
@ApiTags('智能行政-组织管理')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('administrative/organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }

  /**
   * @description: 获取组织管理列表
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({ type: ResponseOrganizationDto })
  @ApiOperation({ summary: '获取组织管理列表' })
  async getOrganizationList(
    @Query() organizationInfo: ListOrganizationDto,
  ): Promise<ResponseModel> {
    const response = await this.organizationService.getOrganizationList(
      organizationInfo,
    );
    return responseMessage(response);
  }

  /**
   * @description: 创建组织数据
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOkResponse({ type: CreateOrganizationDto })
  @ApiOperation({ summary: '创建组织数据' })
  async createOrganization(
    @Body() organizationInfo: SaveOrganizationDto,
    @Session() session: SessionModel,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.organizationService.createOrganization(
      organizationInfo,
      session,
    );
    return response;
  }

  /**
   * @description: 更新组织数据
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Put('/:org_id')
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新组织数据' })
  async updateOrganization(
    @Param('org_id') org_id: string,
    @Body() organizationInfo: SaveOrganizationDto,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.organizationService.updateOrganization(
      org_id,
      organizationInfo,
    );
    return response;
  }

  /**
   * @description: 删除组织数据
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:org_id')
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiOperation({ summary: '删除组织数据' })
  async deleteOrganization(
    @Param('org_id') org_id: string,
  ): Promise<ResponseModel<ResData | number>> {
    const response = await this.organizationService.deleteOrganization(org_id);
    return response;
  }
}
