/*
 * @Description: 全局配置
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-15 09:48:17
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-15 20:32:45
 */
import { registerAs } from '@nestjs/config';

// 默认会合并 根目录下的.env文件 process.env 不会覆盖
export default registerAs('app_global', () => ({
  port: process.env.APP_PROT,
  upload_prefix: process.env.UPLOAD_URL_PRE,
  upload_url_dir: process.env.UPLOAD_URL_PRE_DIR,
}));
