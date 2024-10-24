/*
 * @Description: JobsManagement Controller
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-19 11:19:47
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 15:41:59
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
  UseInterceptors,
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
import { LoggerInterceptor } from '@/interceptor/logger.interceptor';
import type { SessionTypes } from '@/utils/types';

import {
  CreateJobsDto,
  ListJobsManagementDto,
  ResponseJobsDto,
  SaveJobsManagementDto,
} from './dto';
import { JobsManagementService } from './jobs-management.service'; // JobsManagement Service

/* swagger 文档 */
@ApiTags('智能行政-岗位管理')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthGuard('jwt'))
@Controller('administrative/jobs-management')
export class JobsManagementController {
  constructor(private readonly jobsManagementService: JobsManagementService) { }

  /**
   * @description: 获取岗位管理列表
   * @author: 白雾茫茫丶
   */
  @Get()
  @ApiOkResponse({ type: ResponseJobsDto })
  @ApiOperation({ summary: '获取岗位管理列表' })
  async getJobsList(@Query() jobsInfo: ListJobsManagementDto) {
    const response = await this.jobsManagementService.getJobsList(jobsInfo);
    return response;
  }

  /**
   * @description: 创建岗位数据
   * @author: 白雾茫茫丶
   */
  @Post()
  @ApiOkResponse({ type: CreateJobsDto })
  @ApiOperation({ summary: '创建岗位数据' })
  async createJobs(
    @Body() jobsInfo: SaveJobsManagementDto,
    @Session() session: SessionTypes,
  ) {
    const response = await this.jobsManagementService.createJobs(
      jobsInfo,
      session,
    );
    return response;
  }

  /**
   * @description: 更新岗位数据
   * @author: 白雾茫茫丶
   */
  @Put('/:jobs_id')
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新岗位数据' })
  async updateJobs(
    @Param('jobs_id') jobs_id: string,
    @Body() jobsInfo: SaveJobsManagementDto,
  ) {
    const response = await this.jobsManagementService.updateJobs(
      jobs_id,
      jobsInfo,
    );
    return response;
  }

  /**
   * @description: 删除岗位数据
   * @return {*}
   * @author: 白雾茫茫丶
   */
  @Delete('/:jobs_id')
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiOperation({ summary: '删除岗位数据' })
  async deleteJobs(@Param('jobs_id') jobs_id: string) {
    const response = await this.jobsManagementService.deleteJobs(jobs_id);
    return response;
  }
}
