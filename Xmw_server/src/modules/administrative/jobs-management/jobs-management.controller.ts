/*
 * @Description: JobsManagement Controller
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-19 11:19:47
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-17 14:12:19
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
import { JobsManagementService } from './jobs-management.service'; // JobsManagement Service
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
  ListJobsManagementDto,
  ResponseJobsDto,
  SaveJobsManagementDto,
  CreateJobsDto,
} from './dto';
import { responseMessage } from '@/utils';

/* swagger 文档 */
@ApiTags('智能行政-岗位管理')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('administrative/jobs-management')
export class JobsManagementController {
  constructor(private readonly jobsManagementService: JobsManagementService) { }

  /**
   * @description: 获取岗位管理列表
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({ type: ResponseJobsDto })
  @ApiOperation({ summary: '获取岗位管理列表' })
  async getJobsList(
    @Query() jobsInfo: ListJobsManagementDto,
  ): Promise<ResponseModel> {
    const response = await this.jobsManagementService.getJobsList(jobsInfo);
    return responseMessage(response);
  }

  /**
   * @description: 创建岗位数据
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOkResponse({ type: CreateJobsDto })
  @ApiOperation({ summary: '创建岗位数据' })
  async createJobs(
    @Body() jobsInfo: SaveJobsManagementDto,
    @Session() session: SessionModel,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.jobsManagementService.createJobs(
      jobsInfo,
      session,
    );
    return response;
  }

  /**
   * @description: 更新岗位数据
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Put('/:jobs_id')
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新岗位数据' })
  async updateJobs(
    @Param('jobs_id') jobs_id: string,
    @Body() jobsInfo: SaveJobsManagementDto,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.jobsManagementService.updateJobs(
      jobs_id,
      jobsInfo,
    );
    return response;
  }

  /**
   * @description: 删除岗位数据
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:jobs_id')
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiOperation({ summary: '删除岗位数据' })
  async deleteJobs(
    @Param('jobs_id') jobs_id: string,
  ): Promise<ResponseModel<ResData | number>> {
    const response = await this.jobsManagementService.deleteJobs(jobs_id);
    return response;
  }
}
