/*
 * @Description: Auth Service
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-11-25 14:29:53
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 15:52:25
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as moment from 'moment'; // 时间插件 moment
import { Op } from 'sequelize';
import type { WhereOptions } from 'sequelize/types';
import { Sequelize } from 'sequelize-typescript';

import RedisConfig from '@/config/redis'; // redis配置
import { XmwInternational } from '@/models/xmw_international.model'; // xmw_international 实体
import { XmwJobs } from '@/models/xmw_jobs.model'; // xmw_jobs 实体
import { XmwMenu } from '@/models/xmw_menu.model'; // xmw_menu 实体
import { XmwOrganization } from '@/models/xmw_organization.model'; // xmw_organization 实体
import { XmwRole } from '@/models/xmw_role.model'; // xmw_role 实体
import { XmwUser } from '@/models/xmw_user.model'; // xmw_user 实体
import { RedisCacheService } from '@/modules/redis-cache/redis-cache.service'; // RedisCache Service
import { OperationLogsService } from '@/modules/system/operation-logs/operation-logs.service'; // OperationLogs Service
import { initializeTree, responseMessage } from '@/utils';
import type { Response, SessionTypes } from '@/utils/types';

import { LoginParamsDto } from './dto';

type responseResult = Response<Record<string, any>>;

@Injectable()
export class AuthService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(XmwUser)
    private readonly userModel: typeof XmwUser,
    @InjectModel(XmwMenu)
    private readonly menuModel: typeof XmwMenu,
    private readonly jwtService: JwtService,
    private readonly redisCacheService: RedisCacheService,
    private sequelize: Sequelize,
    private readonly operationLogsService: OperationLogsService,
  ) { }

  /**
   * @description: 用户登录
   * @author: 白雾茫茫丶
   */
  async loginSingToken(
    loginParams: LoginParamsDto,
    clinetIp: string,
    session: SessionTypes,
  ): Promise<responseResult> {
    // 登录参数校验结果
    const authResult: responseResult = await this.validateUser(
      loginParams,
      session,
    );
    // 解构参数
    const { data: userInfo, code } = authResult;
    // 获取上次登录时间
    const lastLoginTime = await this.redisCacheService.cacheGet(
      `${userInfo.user_id}-last-login`,
    );
    // 状态码 code === 200,则登录成功
    switch (code) {
      case 200:
        // 生成 token
        const token = this.jwtService.sign({
          user_name: userInfo.user_name,
          user_id: userInfo.user_id,
        });
        // 登录成功后执行当前用户的更新操作
        const where: WhereOptions = { user_id: userInfo.user_id };
        const params = {
          token,
          login_last_ip: clinetIp,
          login_last_time: new Date(),
        };
        // 执行更新操作
        await this.userModel.update(params, { where });
        // 将登录次数+1
        await this.userModel.increment({ login_num: 1 }, { where });
        // 将数据保存到session
        session.currentUserInfo = await this.userModel.findOne({
          attributes: {
            include: ['j.jobs_name', 'o.org_name', 'r.role_name'],
          },
          // 联表查询
          include: [
            {
              model: XmwJobs,
              as: 'j',
              attributes: [],
            },
            {
              model: XmwOrganization,
              as: 'o',
              attributes: [],
            },
            {
              model: XmwRole,
              as: 'r',
              attributes: [],
            },
          ],
          raw: true,
          where,
        });
        // 将用户 token 保存到 redis
        await this.redisCacheService.cacheSet(
          `${userInfo.user_id}-${userInfo.user_name}`,
          token,
          RedisConfig().expiresin,
        );
        // 保存当前登录的时间
        await this.redisCacheService.cacheSet(
          `${userInfo.user_id}-last-login`,
          moment().format('YYYY-MM-DD HH:mm:ss'),
        );
        // 保存操作日志
        await this.operationLogsService.saveLogs(
          `${{ account: '账户', mobile: '手机' }[loginParams.type]}登录`,
        );
        return {
          data: {
            access_token: token,
            login_last_time: JSON.parse(lastLoginTime),
          },
        };
      // 其它情况直接返回结果
      default:
        return authResult;
    }
  }

  /**
   * @description: 校验用户信息
   * @param {LoginParamsDto} loginParams
   * @author: 白雾茫茫丶
   */
  async validateUser(
    loginParams: LoginParamsDto,
    session: SessionTypes,
  ): Promise<responseResult> {
    // 解构参数
    const { type, user_name, password, phone, verifyCode } = loginParams;
    // 判断参数是否正确
    if (!type) {
      return responseMessage({}, '参数不正确!', -1);
    }
    // 判断是否是用户登录，否则是手机登录
    const isAccount = type === 'account';
    // 查询条件
    const where: WhereOptions = isAccount ? { user_name } : { phone };
    // 查找用户
    const userInfo = await this.userModel.findOne({ where });
    // 根据登录类型执行不同的处理
    switch (type) {
      // 用户名登录
      case 'account':
        // 根据用户信息不同，返回相应的信息
        if (session.verifyCode.toUpperCase() !== verifyCode.toUpperCase()) {
          return responseMessage({}, '验证码不正确!', -1);
        } else if (!userInfo) {
          return responseMessage({}, '用户不存在!', -1);
        } else if (userInfo.password !== password) {
          return responseMessage({}, '密码不正确!', -1);
        } else if (!userInfo.status) {
          return responseMessage({}, '当前用户已被禁用,请联系管理员!', -1);
        }
      // 手机登录
      case 'mobile':
        if (!userInfo) {
          return responseMessage({}, '手机号码不存在!', -1);
        }
    }
    return responseMessage(userInfo, '登录成功!');
  }

  /**
   * @description: 用户退出当前登录
   * @author: 白雾茫茫丶
   */
  async logout(session: SessionTypes): Promise<responseResult> {
    const { currentUserInfo } = session;
    if (currentUserInfo) {
      const { user_id, user_name } = currentUserInfo;
      // 清空当前用户token
      this.redisCacheService.cacheDel(`${user_id}-${user_name}`);
      // 清空数据库中 token
      await this.userModel.update(
        { token: '' },
        {
          where: { user_id },
        },
      );
      // 保存操作日志
      await this.operationLogsService.saveLogs(`退出登录`);
      return responseMessage({});
    }
    return responseMessage({}, '登录信息已失效!', 401);
  }

  /**
   * @description: 获取用户按钮权限
   * @author: 白雾茫茫丶
   */
  async getPermissions(session: SessionTypes): Promise<Response<string[]>> {
    // 获取当前用户 id
    const { currentUserInfo } = session;
    if (currentUserInfo?.user_id) {
      const { user_id } = currentUserInfo;
      // 查询权限菜单
      const sqlData = await this.menuModel.findAll({
        attributes: ['permission'],
        where: {
          menu_id: {
            [Op.in]: this.sequelize.literal(`(select menu_id from xmw_permission
            where  FIND_IN_SET(role_id,(select role_id from xmw_user where user_id='${user_id}')))`),
          },
        },
      });
      // 获取按钮权限集合
      const permissions = sqlData.map((s) => s.permission);
      return responseMessage(permissions);
    }
    return responseMessage({}, '登录信息已失效!', 401);
  }

  /**
   * @description: 获取用户权限菜单
   * @author: 白雾茫茫丶
   */
  async getRoutesMenus(session: SessionTypes): Promise<Response<XmwMenu[]>> {
    // 获取当前用户 id
    const { currentUserInfo } = session;
    if (currentUserInfo?.user_id) {
      const { user_id } = currentUserInfo;
      // 查询权限菜单
      const sqlData = await this.menuModel.findAll({
        attributes: {
          exclude: ['name'],
          include: [[this.sequelize.literal('`i`.`name`'), 'name']],
        },
        // 联表查询
        include: [
          {
            model: XmwInternational,
            as: 'i',
            attributes: [],
          },
        ],
        where: {
          menu_type: {
            [Op.ne]: 'button',
          },
          status: {
            [Op.ne]: '0',
          },
          menu_id: {
            [Op.in]: this.sequelize.literal(`(select menu_id from xmw_permission
            where  FIND_IN_SET(role_id,(select role_id from xmw_user where user_id='${user_id}')))`),
          },
        },
        order: [['sort', 'desc']], // 排序规则,
      });
      // 将数据转成树形结构
      const routes = initializeTree(sqlData, 'menu_id', 'parent_id', 'routes');
      return responseMessage(routes);
    }
    return responseMessage({}, '登录信息已失效!', 401);
  }
}
