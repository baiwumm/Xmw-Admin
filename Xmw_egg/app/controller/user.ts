/*
 * @Description: 用户模块-Controller层
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-09 15:27:18
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-12 17:00:38
 */
import BaseController from './base'

/**
 * @description: BaseController 里面的方法不解构执行，目前原因暂不明￣□￣｜｜
 * @return {*}
 * @author: Cyan
 */

export default class User extends BaseController {
    /**
     * @description: 用户登录
     * @return {*}
     * @author: Cyan
     */
    public async login() {
        const { ctx, app } = this;
        try {
            const { col } = app.Sequelize;
            // 获取数据参数
            let { loginType, user_name, password, phone } = ctx.params
            // 判断参数是否存在
            if (!loginType) {
                return this.resResult(-1, {}, '缺少参数：loginType！');
            }
            // 生成token
            const token = app.jwt.sign({ user_name }, app.config.jwt.secret, { expiresIn: app.config.expiresIn })
            // 查询配置项
            const options: any = {
                // 去除 password 这个字段
                attributes: { include: [col('o.org_name'), col('j.jobs_name'), col('r.role_name')], excludes: ['password'] },
                // 联表查询
                include: [
                    {
                        model: app.model.XmwJobs,
                        as: 'j',
                        attributes: []
                    },
                    {
                        model: app.model.XmwOrganization,
                        as: 'o',
                        attributes: []
                    },
                    {
                        model: app.model.XmwRole,
                        as: 'r',
                        attributes: []
                    }
                ],
                raw: true
            }
            // 判断登录类型
            switch (loginType) {
                // 账户密码登录
                case 'account':
                    options.where = { user_name, password }
                    break;
                // 手机登录
                case 'mobile':
                    options.where = { phone }
                    break;
                default:
                    return this.resResult(-1, {}, 'loginType类型不正确！');
            }
            // 如果没结果，则证明账户密码或手机号码不正确
            const userInfo = await this._findOne('XmwUsers', options)
            if (!userInfo) {
                return this.resResult(-1, {}, loginType === 'account' ? '用户名或密码不正确！' : '手机号码不存在！');
            }
            // 判断用户是否禁用
            if (userInfo.status == '0') {
                return this.resResult(-1, {}, '当前用户已被禁用，请联系管理员！');
            }
            // 如果执行到这里，这证明登录成功
            const updateParams = { token, last_ip: ctx.request.ip, last_time: new Date() }
            // 将登录次数加1
            await ctx.model['XmwUsers'].increment({ login_num: 1 }, { where: { user_id: userInfo.user_id } })
            // 执行数据库更新
            await this._update('XmwUsers', updateParams, userInfo.user_id)
            // 查询最新的数据
            let result = await this._findOne('XmwUsers', options)
            // 数据回显处理
            if (result.tags) {
                result.tags = JSON.parse(result.tags)
            }
            result.city = JSON.parse(result.city)
            // 将当前用户保存到session
            ctx.session.userInfo = result
            return this.resResult(1, ctx.session.userInfo);
        } catch (error) {
            ctx.logger.info('login方法报错：' + error)
            this.resResult(2, error);
        }
    }
}