import {
  PrimaryKey,
  Column,
  Model,
  Table,
  DataType,
  IsUUID,
  IsIP,
} from 'sequelize-typescript';
import type { LogsAttributes } from '@/attributes/system';

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
  @Column({ type: DataType.UUID, allowNull: false, comment: '用户id' })
  user_id: string;

  // 日志内容
  @Column({ type: DataType.STRING(200), allowNull: false, comment: '日志内容' })
  content: string;

  // ip
  @IsIP
  @Column({ type: DataType.STRING(50), allowNull: false, comment: 'ip' })
  ip: string;

  // 前端路由
  @Column({ type: DataType.STRING(100), allowNull: false, comment: '前端路由' })
  path: string;

  // 代理
  @Column({ type: DataType.STRING(200), allowNull: false, comment: '代理' })
  user_agent: string;

  // 请求参数
  @Column({ type: DataType.JSON, allowNull: false, comment: '请求参数' })
  params: Record<string, any>;

  // 请求方式
  @Column({ type: DataType.STRING(20), allowNull: false, comment: '请求方式' })
  method: string;

  // 请求地址
  @Column({ type: DataType.STRING(100), allowNull: false, comment: '请求地址' })
  api_url: string;
}
