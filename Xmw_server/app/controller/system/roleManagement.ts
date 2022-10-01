/*
 * @Description: 系统设置-角色管理-Controller层
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-30 16:08:56
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-01 09:19:31
 */
import BaseController from '../base'

/**
 * @description: BaseController 里面的方法不解构执行，目前原因暂不明￣□￣｜｜
 * @return {*}
 * @author: Cyan
 */

export default class RoleManagement extends BaseController {
    /**
    * @description: 获取角色列表
    * @return {*}
    * @author: Cyan
    */
    public async getRoleList() {
        const { ctx, app } = this;
        try {
            const { Op } = app.Sequelize;
            // 获取数据参数
            let { role_name, role_code, status, start_time, end_time, pageSize, current } = ctx.params
            // 根据参数拼接查询条件
            let where: any = {}
            if (role_name) where.role_name = { [Op.substring]: role_name }
            if (role_code) where.role_code = { [Op.substring]: role_code }
            if (status) where.status = { [Op.eq]: status }
            if (start_time && end_time) where.created_time = { [Op.between]: [start_time, end_time] }
            // 查询规则
            const options = {
                // 联表查询
                include: [
                    {
                        model: app.model.XmwPermission,
                        as: 'menu_permission',
                        attributes: ['menu_id']
                    }
                ],
                order: [['sort', 'desc'], ['created_time', 'desc']], // 排序规则
                where,
                distinct: true
            }
            // 根据参数查询数据
            await this._findAll('XmwRole', options, current, pageSize).then(result => {
                this.resResult(1, result);
            })
        } catch (error) {
            ctx.logger.info('getRoleList方法报错：' + error)
            this.resResult(2, error);
        }
    }

    /**
     * @description: 新增和更新角色数据
     * @return {*}
     * @author: Cyan
     */
    public async saveRole() {
        const { ctx, app } = this;
        // 设定一个事务
        const t = await ctx.model.transaction()
        try {
            const { Op } = app.Sequelize;
            // 获取数据参数
            let { role_id, menu_permission, ...params } = ctx.params
            // 判断名称和编码是否存在
            const options: any = {
                where: {
                    [Op.or]: {
                        role_name: params.role_name,
                        role_code: params.role_code
                    }
                }
            }
            // 如果是编辑，则要加上这个条件：role_id != 自己
            if (role_id) {
                options.where.role_id = {
                    [Op.ne]: role_id
                }
            }
            // 如果有结果，则证明已存在
            const exist = await ctx.model['XmwRole'].findOne(options);
            if (exist) {
                return this.resResult(-1, {}, '名称或者编码已存在！');
            }
            // 根据 role_id 判断是新增还是更新操作
            if (role_id) {
                params.update_time = new Date()
                // 先删除权限表相关的数据
                await ctx.model['XmwPermission'].destroy({
                    where: {
                        role_id: {
                            [Op.eq]: role_id
                        }
                    },
                    transaction: t
                })
                // 再执行批量插入
                let permissionList = menu_permission.map(menu => {
                    return {
                        role_id: role_id,
                        menu_id: menu,
                        created_time: new Date()
                    }
                })
                await ctx.model['XmwPermission'].bulkCreate(permissionList, { transaction: t })
                // 执行更新操作
                const result = await ctx.model['XmwRole'].findByPk(role_id);
                await result.update(params, { transaction: t });
            } else {
                params.created_time = new Date()
                // 先执行新增操作
                let result = await ctx.model['XmwRole'].create(params, { transaction: t })
                // 再执行批量插入到xmw_permission
                let permissionList = menu_permission.map(menu => {
                    return {
                        role_id: result.role_id,
                        menu_id: menu,
                        created_time: new Date()
                    }
                })
                await ctx.model['XmwPermission'].bulkCreate(permissionList, { transaction: t })
            }
            // 提交事务
            await t.commit();
            // 如果到这里没有出现异常就代表操作全部成功
            this.resResult(1, {})
        } catch (error) {
            // 事务回滚
            await t.rollback();
            ctx.logger.info('saveRole方法报错：' + error)
            // 返回状态,此处不能用结构，原因暂不明
            this.resResult(2, error);
        }
    }

    /**
     * @description: 删除角色列表
     * @return {*}
     * @author: Cyan
     */
    public async delRole() {
        const { ctx, app } = this;
        // 设定一个事务
        const t = await ctx.model.transaction()
        try {
            const { Op } = app.Sequelize;
            // 获取角色 role_id
            let { role_id } = ctx.params
            // 先删除权限表相关的数据
            await ctx.model['XmwPermission'].destroy({
                where: {
                    role_id: {
                        [Op.eq]: role_id
                    }
                },
                transaction: t
            })
            // 再删除角色列表的数据
            await ctx.model['XmwRole'].destroy({
                where: {
                    role_id: {
                        [Op.eq]: role_id
                    }
                },
                transaction: t
            });
            // 提交事务
            await t.commit();
            // 如果到这里没有出现异常就代表操作全部成功
            this.resResult(1, {})
        } catch (error) {
            // 事务回滚
            await t.rollback();
            ctx.logger.info('delRole方法报错：' + error)
            // 返回状态,此处不能用结构，原因暂不明
            this.resResult(2, error);
        }
    }
}