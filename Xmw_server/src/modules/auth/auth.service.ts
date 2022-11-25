/*
 * @Description: Auth Service
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-25 14:29:53
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-25 17:47:55
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import type { WhereOptions } from 'sequelize/types';
import { XmwUser } from '@/models/xmw_user.model'; // xmw_user 实体
import { LoginParamsDto } from './dto';
import { ResponseModel } from '@/global/interface'; // interface

@Injectable()
export class AuthService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(XmwUser)
    private readonly userModel: typeof XmwUser,
    private readonly jwtService: JwtService,
  ) { }

  /**
   * @description: 用户登录
   * @return {*}
   * @author: Cyan
   */
  async loginSingToken(loginParams: LoginParamsDto, clinetIp: string,session: Record<string, any>)
  : Promise<ResponseModel<Record<string, any>>> {
    // 解构参数
    const { type, user_name, password } = loginParams;
    // 判断参数是否正确
    if (!type || !user_name || !password) {
      return { data: {}, code: -1, msg: '参数不正确！', success: false };
    }
    // 根据登录类型执行不同的处理
    switch (type) {
      // 用户名登录
      case 'account':
        // 查找用户
        const userInfo = await this.userModel.findOne({
          where: { user_name, password },
        });
        if (!userInfo) {
          return {
            data: {},
            code: -1,
            msg: '用户名或密码不正确！',
            success: false,
          };
        } else {
          // 生成 token
          const token = this.jwtService.sign({ user_name: userInfo.user_name, });
          // 登录成功后执行当前用户的更新操作
          const where: WhereOptions = { user_id: userInfo.user_id }
          const params = { token, login_last_ip: clinetIp, login_last_time: new Date() }
          // 判断用户是否禁用
          if (!userInfo.status) {
            return {
              data: {},
              code: -1,
              msg: '当前用户已被禁用,请联系管理员！',
              success: false,
            };
          }
          // 执行更新操作
          await this.userModel.update(params, { where });
          // 将登录次数+1
          await this.userModel.increment({ login_num: 1 }, { where })
          // 将数据保存到session
          session.currentUserInfo = await this.userModel.findOne({where})
          return {
            data: {},
            code: 200,
            msg: '登录成功!',
            success: true,
          }
        }
    }
  }
}
