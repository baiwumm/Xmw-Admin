/*
 * @Description: 用户模块-Controller层
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-09 15:27:18
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-09 15:48:51
 */
import BaseController from './base'

// let OSS = require('ali-oss');
// // 阿里云对象存储配置
// let client = new OSS({
//     region: 'oss-cn-shenzhen',
//     accessKeyId: 'LTAI4G5oHtJSRFXjq7ie45xh',
//     accessKeySecret: 'bAqE12OuQ9uHwxkdTltOWRogJUXfmG',
//     bucket: 'react-umi-xmw',
// });

/**
 * @description: BaseController 里面的方法不解构执行，目前原因暂不明￣□￣｜｜
 * @return {*}
 * @author: Cyan
 */

export default class User extends BaseController{
    /**
     * @description: 上传用户头像
     * @return {*}
     * @author: Cyan
     */    
    public async uploadUserAvatar(){
        const { ctx } = this;
        try {
            // let stream = await ctx.getFileStream();
            // let result = await client.putStream(stream.filename, stream);
            this.resResult(1, {});
        } catch (error) {
            ctx.logger.info('uploadUserAvatar方法报错：' + error)
            this.resResult(2, error);
        }
    }
}