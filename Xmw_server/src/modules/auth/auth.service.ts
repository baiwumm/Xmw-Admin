/*
 * @Description: Auth Service
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-25 14:29:53
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-29 18:08:19
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import type { WhereOptions } from 'sequelize/types';
import { XmwUser } from '@/models/xmw_user.model'; // xmw_user 实体
import { XmwRole } from '@/models/xmw_role.model'; // xmw_role 实体
import { XmwOrganization } from '@/models/xmw_organization.model'; // xmw_organization 实体
import { XmwJobs } from '@/models/xmw_jobs.model'; // xmw_jobs 实体
import { RedisCacheService } from '@/modules/redis-cache/redis-cache.service'; // RedisCache Service
import { LoginParamsDto } from './dto';
import { ResponseModel } from '@/global/interface'; // interface
import { responseMessage } from '@/utils';
import { toNumber } from 'lodash';

type responseResult = ResponseModel<Record<string, any>>;

@Injectable()
export class AuthService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(XmwUser)
    private readonly userModel: typeof XmwUser,
    private readonly jwtService: JwtService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  /**
   * @description: 用户登录
   * @return {*}
   * @author: Cyan
   */
  async loginSingToken(
    loginParams: LoginParamsDto,
    clinetIp: string,
    session: Record<string, any>,
  ): Promise<responseResult> {
    // 登录参数校验结果
    const authResult: responseResult = await this.validateUser(loginParams);
    // 解构参数
    const { data: userInfo, code } = authResult;
    // 状态码 code === 200,则登录成功
    switch (code) {
      case 200:
        // 生成 token
        const token = this.jwtService.sign({
          user_name: userInfo.user_name,
          user_id: userInfo.user_name,
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
            include: ['jobs.jobs_name', 'org.org_name', 'role.role_name'],
          },
          // 联表查询
          include: [
            {
              model: XmwJobs,
              as: 'jobs',
              attributes: [],
            },
            {
              model: XmwOrganization,
              as: 'org',
              attributes: [],
            },
            {
              model: XmwRole,
              as: 'role',
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
          toNumber(process.env.REDIS_EXPIRESIN),
        );
        return { data: { access_token: token } };
      // 其它气矿直接返回结果
      default:
        return authResult;
    }
  }

  /**
   * @description: 校验用户信息
   * @param {LoginParamsDto} loginParams
   * @return {*}
   * @author: Cyan
   */
  async validateUser(loginParams: LoginParamsDto): Promise<responseResult> {
    // 解构参数
    const { type, user_name, password, phone } = loginParams;
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
        if (!userInfo) {
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
   * @return {*}
   * @author: Cyan
   */
  async logout(session: Record<string, any>): Promise<responseResult> {
    const {
      currentUserInfo: { user_id, user_name },
    } = session;
    // 清空当前用户token
    this.redisCacheService.cacheDel(`${user_id}-${user_name}`);
    // 清空数据库中 token
    await this.userModel.update(
      { token: '' },
      {
        where: { user_id },
      },
    );
    return responseMessage({});
  }
}
