/*
 * @Description: 全局配置
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-15 09:48:17
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-29 09:15:23
 */
import { registerAs } from '@nestjs/config';

// 默认会合并 根目录下的.env文件 process.env 不会覆盖
export default registerAs('app_global', () => ({
  port: process.env.APP_PROT,
  oss: {
    region: 'oss-cn-shenzhen', // 所在区域
    accessKeyId: 'z3o5JqYZOqzRcOBe47jAwInWcKqhEi9tuZ94PRHCZCg=', // 密钥 key
    accessKeySecret: 'WWLrY4wZhLjVE+wux0TNhad2DXgU5w5PdOX86b1SotY=', // 密钥
    bucket: 'react-umi-xmw', // bucket 名称
  },
  secret: 'react_umi_xmw', // jwt token 密钥
}));
