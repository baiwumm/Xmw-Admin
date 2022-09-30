/*
 * @Description: 系统设置-角色管理-Controller层
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-30 16:08:56
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-30 18:25:04
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
                limit: Number(current),
                offset: (Number(current) - 1) * pageSize,
                order: [['sort', 'desc'], ['created_time', 'desc']], // 排序规则
                where
            }

            // 根据参数查询数据
            await this._findAll('XmwRole', options).then(result => {
                // 判断是否有返回值
                if (result) {
                    this.resResult(1, result);
                }
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
            const exist = await this._findOne('XmwRole', options)
            if (exist) {
                return this.resResult(-1, {}, '名称或者编码已存在！');
            }
            // 根据 role_id 判断是新增还是更新操作
            if (role_id) {
                params.update_time = new Date()
                // 先删除权限表相关的数据
                await this._batchDelete('XmwRole', 'role_id', role_id)
                // 再执行批量插入
                let permissionList = menu_permission.map(menu => {
                    return {
                        role_id: role_id,
                        menu_id: menu,
                        create_time: new Date()
                    }
                })
                await this._add('XmwRole', permissionList)
                // 执行更新操作
                await this._update('XmwRole', params, role_id).then(result => {
                    // 更新成功
                    result ? this.resResult(1, {}) : this.resResult(-1, {}, '数据主键不存在！');
                })
            } else {
                params.created_time = new Date()
                // 先执行新增操作
                let result = await this._add('XmwRole', params)
                // 再执行批量插入到xmw_permission
                let permissionList = menu_permission.map(menu => {
                    return {
                        // role_id: result.role_id,
                        menu_id: menu,
                        create_time: new Date()
                    }
                })
                await this._add('XmwRole', permissionList).then(res => {
                    // 操作成功
                    res ? this.resResult(1, {}) : this.resResult(-1, {}, '数据主键不存在！');
                })
            }
        } catch (error) {
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
        const { ctx } = this;
        try {
            // 获取角色 role_id
            let { role_id } = ctx.params
            // 先删除权限表相关的数据
            // await this._batchDelete('XmwRole', 'role_id', role_id)
            // 再删除角色列表的数据
            await this._delete('XmwRole', role_id).then(result => {
                // 判断是否删除成功
                result ? this.resResult(1, {}) : this.resResult(-1, {}, '数据主键不存在！');
            })
        } catch (error) {
            ctx.logger.info('delRole方法报错：' + error)
            // 返回状态,此处不能用结构，原因暂不明
            this.resResult(2, error);
        }
    }
}