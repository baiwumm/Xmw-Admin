import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import App_configuration from '@/config/configuration'; // 全局配置
import { XmwUser } from '@/models/xmw_user.model'; // xmw_user 实体
import { RedisCacheService } from '@/modules/redis-cache/redis-cache.service'; // RedisCache Service

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly redisCacheService: RedisCacheService) {
    super({
      // 提供从请求中提取 JWT 的方法。我们将使用在 API 请求的授权头中提供token的标准方法
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 为了明确起见，我们选择默认的 false 设置，
      // 它将确保 JWT 没有过期的责任委托给 Passport 模块。
      // 这意味着，如果我们的路由提供了一个过期的 JWT ，请求将被拒绝，并发送 401 未经授权的响应。Passport 会自动为我们办理
      ignoreExpiration: false,
      // 使用权宜的选项来提供对称的秘密来签署令牌
      secretOrKey: App_configuration().secret,
      passReqToCallback: true,
    });
  }

  /**
   * @description: 调用守卫验证 token
   * @param {Request} req
   * @param {any} payload
   * @author: 白雾茫茫丶
   */
  async validate(req: Request, payload: XmwUser): Promise<XmwUser> {
    // 获取当前 token
    const originToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    // 获取 redis 存储的 token
    const cacheToken = await this.redisCacheService.cacheGet(
      `${payload.user_id}-${payload.user_name}`,
    );
    // token 已过期
    if (!cacheToken) {
      throw new UnauthorizedException('token令牌已过期，请重新登录！');
    }
    // token 校验
    if (JSON.parse(cacheToken) !== originToken) {
      throw new UnauthorizedException('token令牌非法，请重新登录！');
    }
    return payload;
  }
}
