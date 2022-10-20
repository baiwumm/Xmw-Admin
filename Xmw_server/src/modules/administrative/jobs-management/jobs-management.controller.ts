/*
 * @Description: JobsManagement Controller
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-19 11:19:47
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-20 15:36:27
 */
import { Controller } from '@nestjs/common';
import { JobsManagementService } from './jobs-management.service'; // JobsManagement Service
import { ApiBearerAuth, ApiTags, ApiHeader } from '@nestjs/swagger'; // swagger 接口文档

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
}
