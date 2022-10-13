/*
 * @Description: xmw_users Model
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-13 15:34:17
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-13 16:11:27
 */
import {
  Column,
  Model,
  Table,
  TableOptions,
  DataType,
} from 'sequelize-typescript';

const tableOptions: TableOptions = {
  tableName: 'xmw_users', // 表名
};

@Table(tableOptions)
export default class XmwUsers extends Model<XmwUsers> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: '用户id',
  })
  user_id: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    comment: '用户名',
  })
  user_name: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    comment: '用户工号',
  })
  work_no: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
    comment: '密码(加密)',
  })
  password: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    comment: '中文名',
  })
  cn_name: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
    comment: '英文名',
  })
  en_name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 120 },
    comment: '年龄',
  })
  age: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    validate: { isEmail: true },
    comment: '电子邮箱',
  })
  email: string;

  @Column({
    type: DataType.STRING(11),
    allowNull: false,
    validate: { is: /^1\d{10}$/i },
    comment: '电话号码',
  })
  phone: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
    comment: '头像地址',
  })
  avatar_url: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    comment: '用户性别',
  })
  sex: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '排序',
  })
  sort: number;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    comment: '是否禁用',
  })
  status: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: '登录token',
  })
  token: string;

  @Column({
    type: DataType.STRING(32),
    allowNull: true,
    comment: '座右铭',
  })
  motto: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
    comment: '人物标签',
  })
  tags: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
    comment: '所属城市',
  })
  city: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
    comment: '详细地址',
  })
  address: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: '岗位id',
  })
  jobs_id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: '组织id',
  })
  org_id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: '角色id',
  })
  role_id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '登录次数',
  })
  login_num: number;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
    validate: { isIP: true },
    comment: '最后一次登录ip',
  })
  last_ip: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: '最后一次登录时间',
  })
  last_time: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    comment: '创建日期',
  })
  created_time: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: '最后更新时间',
  })
  update_time: string;

  @Column({
    type: DataType.UUID,
    allowNull: true,
    comment: '创建人',
  })
  founder: string;
}
