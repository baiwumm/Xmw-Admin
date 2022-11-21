/*
 * @Description: 全局配置
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-15 09:48:17
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-21 16:47:27
 */
import { registerAs } from '@nestjs/config';

// 默认会合并 根目录下的.env文件 process.env 不会覆盖
export default registerAs('app_global', () => ({
  port: process.env.APP_PROT,
  oss: {
    region: 'oss-cn-shenzhen', // 所在区域
    accessKeyId: 'LTAI4G5oHtJSRFXjq7ie45xh', // 密钥 key
    accessKeySecret: 'bAqE12OuQ9uHwxkdTltOWRogJUXfmG', // 密钥
    bucket: 'react-umi-xmw', // bucket 名称
  },
}));
