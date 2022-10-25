/*
 * @Description: JobsManagement Controller
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-19 11:19:47
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-24 15:17:36
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
} from '@nestjs/common';
import { JobsManagementService } from './jobs-management.service'; // JobsManagement Service
import {
  ApiBearerAuth,
  ApiTags,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger'; // swagger 接口文档
import { ResData, ResponseModel } from '@/global/interface'; // TS类型注解
import { ResponseDto } from '@/dto/response.dto'; // 响应体 Dto
import {
  ListJobsManagementDto,
  ResponseJobsDto,
  SaveJobsManagementDto,
} from './dto';

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
  constructor(private readonly jobsManagementService: JobsManagementService) {}

  /**
   * @description: 获取岗位管理列表
   * @return {*}
   * @author: Cyan
   */
  @Get()
  @ApiOkResponse({ type: ResponseJobsDto })
  @ApiOperation({ summary: '获取岗位管理列表' })
  async getJobsList(
    @Query() jobsInfo: ListJobsManagementDto,
  ): Promise<ResponseModel> {
    const response = await this.jobsManagementService.getJobsList(jobsInfo);
    return { data: response };
  }

  /**
   * @description: 创建岗位数据
   * @return {*}
   * @author: Cyan
   */
  @Post()
  @ApiOkResponse({ type: ResponseDto })
  @ApiOperation({ summary: '创建岗位数据' })
  async createJobs(
    @Body() jobsInfo: SaveJobsManagementDto,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.jobsManagementService.createJobs(jobsInfo);
    return response;
  }

  /**
   * @description: 更新岗位数据
   * @return {*}
   * @author: Cyan
   */
  @Put('/:jobs_id')
  @ApiOkResponse({ type: ResponseDto })
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
  @Delete('/:jobs_id')
  @ApiOkResponse({ type: ResponseDto })
  @ApiOperation({ summary: '删除岗位数据' })
  async deleteJobs(
    @Param('jobs_id') jobs_id: string,
  ): Promise<ResponseModel<ResData | number>> {
    const response = await this.jobsManagementService.deleteJobs(jobs_id);
    return response;
  }
}
