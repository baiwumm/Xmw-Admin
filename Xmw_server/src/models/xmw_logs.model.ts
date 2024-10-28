import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsIP,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { XmwUser } from '@/models/xmw_user.model'; // xmw_user 实体
import type { RequestMethods } from '@/utils/types';
import type { LogsAttributes } from '@/utils/types/system';

@Table({ tableName: 'xmw_logs' })
export class XmwLogs
  extends Model<LogsAttributes, LogsAttributes>
  implements LogsAttributes {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: '日志id',
  })
  log_id: string;

  // 用户id
  @IsUUID(4)
  @ForeignKey(() => XmwUser)
  @Column({ type: DataType.UUID, allowNull: false, comment: '用户id' })
  user_id: string;

  // ip
  @IsIP
  @Column({ type: DataType.STRING(50), allowNull: false, comment: 'ip' })
  ip: string;

  // 操作系统
  @Column({ type: DataType.STRING(200), allowNull: false, comment: '操作系统' })
  os: string;

  // 浏览器
  @Column({ type: DataType.STRING(200), allowNull: false, comment: '浏览器' })
  browser: string;

  // 请求参数
  @Column({ type: DataType.JSON, allowNull: false, comment: '请求参数' })
  params: Record<string, any>;

  // 请求方式
  @Column({ type: DataType.STRING(20), allowNull: false, comment: '请求方式' })
  method: RequestMethods | string;

  // 请求地址
  @Column({ type: DataType.STRING(100), allowNull: false, comment: '请求地址' })
  api_url: string;

  // 所在省份
  @Column({ type: DataType.STRING(100), allowNull: true, comment: '所在省份' })
  province: string;

  // 所在城市
  @Column({ type: DataType.STRING(100), allowNull: true, comment: '所在城市' })
  city: string;

  // 城市编码
  @Column({ type: DataType.STRING(100), allowNull: true, comment: '城市编码' })
  adcode: string;

  @BelongsTo(() => XmwUser) // 定义多对一关系。注意使用BelongsTo是多对一关系的【多】表
  userInfo: XmwUser;
}
