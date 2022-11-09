/*
 * @Description: 查询列表返回响应体 Dto
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-19 17:19:57
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-09 09:51:57
 */
import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@/dto/response.dto';
import { ResData } from '@/global/interface';

/**
 * @description: 组织管理列表响应体结构 Dto
 * @return {*}
 * @author: Cyan
 */
export class ResponseOrganizationDto extends ResponseDto {
  @ApiProperty({
    type: Array,
    description: '响应体',
    default: [
      {
        org_id: '79581210-60b7-4c66-b6ae-14b013c3661e',
        org_name: '阿里巴巴',
        org_code: 'Alibaba',
        org_type: 1,
        parent_id: null,
        leader: null,
        describe:
          '阿里巴巴集团控股有限公司（简称：阿里巴巴集团）是马云带领下的18位创始人于1999年在浙江省杭州市创立的公司。',
        founder: null,
        status: 1,
        sort: 1,
        created_time: '2022-09-15 07:35:08',
        updated_time: '2022-09-15 07:35:08',
        children: [],
      },
    ],
  })
  data: ResData[];
}
