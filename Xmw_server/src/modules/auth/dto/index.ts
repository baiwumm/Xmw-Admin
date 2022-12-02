/*
 * @Description: 登录鉴权 Dto
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-25 10:34:23
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-02 10:37:52
 */
import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@/dto/response.dto';
import { XmwUser } from '@/models/xmw_user.model'; // xmw_user 实体

/**
 * @description: 登录参数
 * @return {*}
 * @author: Cyan
 */
export class LoginParamsDto {
  @ApiProperty({
    type: String,
    description: '登录类型',
    default: 'account',
  })
  type: string;

  @ApiProperty({
    type: String,
    description: '用户名',
    default: 'admin',
    required: false,
  })
  user_name?: string;

  @ApiProperty({
    type: String,
    description: '密码',
    default: '+eUwGEfC9+bY+NgU22Ol4g==',
    required: false,
  })
  password?: string;

  @ApiProperty({
    type: String,
    description: '手机号码',
    default: '13800138000',
    required: false,
  })
  phone?: string;
}

/**
 * @description: 登录成功返回体
 * @return {*}
 * @author: Cyan
 */
export class LoginResponseDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      asccess_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJtZWl4aSIsInVzZXJfaWQiOiJtZWl4aSIsImlhdCI6MTY2OTg2MTE1NX0.vxcgFW2F5L7D-bKjwbuBMLYq1kyDZ8FYWzWdWUU2WC4',
    },
  })
  data: { asccess_token: string };
}

/**
 * @description: 用户信息返回体
 * @return {*}
 * @author: Cyan
 */
export class UserInfoResponseDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      user_id: 'bf75a509-f90e-4a29-8bf7-470b581550f6',
      user_name: 'admin',
      work_no: 'XMW001',
      cn_name: '谢明伟',
      en_name: 'Cyan',
      age: 18,
      email: '843348394@qq.com',
      phone: '15920157932',
      avatar_url:
        'http://127.0.0.1:3000/static/image/2022-11-30/b9f8def1-52ad-467e-9ee7-9fda8408b002.gif',
      sex: '1',
      sort: 99,
      status: 1,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInVzZXJfaWQiOiJhZG1pbiIsImlhdCI6MTY2OTk0ODY0OX0.QEv5GuM307_7BAgB3oUUjc8IlzdgO5yjdJpnXkB9zK4',
      motto: '我曾踏足山巅 也曾跌落低谷 二者都使我受益良多',
      tags: ['高富帅', '有钱人'],
      city: ['44', '4403', '440304'],
      address: '沙头街道',
      jobs_id: '6c93e5f3-f4e9-43be-9b00-9ba69677a2c2',
      org_id: '79581210-60b7-4c66-b6ae-14b013c3661e',
      role_id: 'c49aeeca-bc95-444e-a437-a2d36e79def4',
      founder: '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995',
      login_num: 23,
      login_last_ip: '::ffff:127.0.0.1',
      login_last_time: '2022-12-02 10:37:29',
      created_time: '2022-11-30 09:42:15',
      updated_time: '2022-12-02 10:37:29',
      jobs_name: '前端开发',
      org_name: '阿里巴巴',
      role_name: '超级管理员',
    },
  })
  data: XmwUser;
}
