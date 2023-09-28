import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Is,
  IsDate,
  IsEmail,
  IsIn,
  IsIP,
  IsUrl,
  IsUUID,
  Length,
  Max,
  Min,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { XmwJobs } from '@/models/xmw_jobs.model';
import { XmwOrganization } from '@/models/xmw_organization.model';
import { XmwRole } from '@/models/xmw_role.model';
import type { Sex, Status } from '@/utils/types';
import type { UserAttributes } from '@/utils/types/system';

@Table({ tableName: 'xmw_user' })
export class XmwUser
  extends Model<UserAttributes, UserAttributes>
  implements UserAttributes {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: '用户id',
  })
  user_id: string;

  //用户名称
  @NotEmpty({ msg: '用户名称不能为空' })
  @Length({ min: 2, max: 32, msg: '用户名称的长度在2-36个字符' })
  @Column({ type: DataType.STRING(20), allowNull: false, comment: '用户名称' })
  user_name: string;

  //用户工号
  @Column({ type: DataType.STRING(20), allowNull: false, comment: '用户工号' })
  work_no: string;

  //密码(加密)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    comment: '密码(加密)',
  })
  password: string;

  //中文名
  @Column({ type: DataType.STRING(20), allowNull: false, comment: '中文名' })
  cn_name: string;

  //英文名
  @Column({ type: DataType.STRING(20), comment: '英文名' })
  en_name?: string;

  //年龄
  @Min(1)
  @Max(120)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '年龄',
  })
  age: number;

  //电子邮箱
  @IsEmail
  @Column({
    type: DataType.STRING(50),
    comment: '电子邮箱',
  })
  email?: string;

  //电话号码
  @Is({ args: /^1\d{10}$/, msg: '电话号码格式不正确' })
  @Column({
    type: DataType.STRING(11),
    allowNull: false,
    comment: '电话号码',
  })
  phone: string;

  //用户头像
  @IsUrl
  @Column({ type: DataType.STRING(200), comment: '用户头像' })
  avatar_url?: string;

  //用户性别
  @IsIn({
    args: [['0', '1', '2']],
    msg: '用户性别: sex 字段值错误',
  })
  @Column({
    type: DataType.ENUM,
    values: ['0', '1', '2'],
    allowNull: false,
    comment: '用户性别(0:女,1:男,2:隐私)',
  })
  sex: Sex;

  //排序
  @Column({ type: DataType.INTEGER, allowNull: false, comment: '排序' })
  sort: number;

  //用户状态
  @IsIn({
    args: [[0, 1]],
    msg: 'status 字段值错误',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '用户状态（0:禁用，1：正常）',
  })
  status: Status;

  //用户令牌
  @Column({ type: DataType.BLOB, comment: 'token' })
  token?: string;

  //座右铭
  @Column({ type: DataType.STRING(50), comment: '座右铭' })
  motto?: string;

  //人物标签
  @Column({
    type: DataType.JSON,
    comment: '人物标签',
  })
  tags?: string[];

  //所属城市
  @Column({
    type: DataType.JSON,
    comment: '所属城市',
  })
  city?: string[];

  //详细地址
  @Column({ type: DataType.STRING(200), comment: '详细地址' })
  address?: string;

  //岗位id
  @IsUUID(4)
  @ForeignKey(() => XmwJobs)
  @Column({ type: DataType.UUID, allowNull: false, comment: '岗位id' })
  jobs_id: string;

  //组织id
  @IsUUID(4)
  @ForeignKey(() => XmwOrganization)
  @Column({ type: DataType.UUID, allowNull: false, comment: '组织id' })
  org_id: string;

  //角色id
  @IsUUID(4)
  @ForeignKey(() => XmwRole)
  @Column({ type: DataType.UUID, allowNull: false, comment: '角色id' })
  role_id: string;

  //创建人
  @IsUUID(4)
  @Column({ type: DataType.UUID, allowNull: false, comment: '创建人' })
  founder: string;

  //登录次数
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '登录次数',
  })
  login_num: number;

  //最后一次登录ip
  @IsIP
  @Column({
    type: DataType.STRING(20),
    comment: '最后一次登录ip',
  })
  login_last_ip?: string;

  //最后一次登录时间
  @IsDate
  @Column({
    type: DataType.DATE,
    comment: '最后一次登录时间',
  })
  login_last_time?: Date;

  @BelongsTo(() => XmwJobs, { as: 'j' })
  jobsInfo: XmwJobs;

  @BelongsTo(() => XmwOrganization, { as: 'o' })
  orgInfo: XmwOrganization;

  @BelongsTo(() => XmwRole, { as: 'r' })
  roleInfo: XmwRole;
}
