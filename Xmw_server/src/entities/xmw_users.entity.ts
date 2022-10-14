/*
 * @Description: xmw_users Entity
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-14 14:18:28
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-14 14:50:18
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class XmwUsers {
  //用户id
  @PrimaryGeneratedColumn('uuid')
  @Column({
    type: 'char',
    length: 36,
    comment: '用户id',
  })
  user_id: string;

  //用户名
  @Column({
    type: 'varchar',
    length: 20,
    comment: '用户名',
  })
  user_name: string;

  //用户工号
  @Column({
    type: 'varchar',
    length: 20,
    comment: '用户工号',
  })
  work_no: string;

  //密码(加密)
  @Column({
    type: 'varchar',
    length: 200,
    select: false,
    comment: '密码(加密)',
  })
  password: string;

  //中文名
  @Column({
    type: 'varchar',
    length: 20,
    comment: '中文名',
  })
  cn_name: string;

  //英文名
  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: '英文名',
  })
  en_name: string;

  //年龄
  @Column({
    type: 'int',
    comment: '年龄',
  })
  age: number;

  //电子邮箱
  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '电子邮箱',
  })
  email: string;

  //电话号码
  @Column({
    type: 'char',
    length: 11,
    comment: '电话号码',
  })
  phone: string;

  //头像地址
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    comment: '头像地址',
  })
  avatar_url: string;

  //用户性别
  @Column({
    type: 'enum',
    enum: [0, 1],
    comment: '用户性别',
  })
  sex: string;
}
