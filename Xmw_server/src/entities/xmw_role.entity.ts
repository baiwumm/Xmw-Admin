/*
 * @Description: XmwRole Entity
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-16 11:14:32
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-16 17:44:48
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsInt, Min, Max, IsUUID, IsNotEmpty, Length } from 'class-validator'; // entity validator

@Entity()
export class XmwRole {
  @PrimaryGeneratedColumn('uuid', { comment: '角色id' })
  role_id: string;

  //角色名称
  @Column('varchar', {
    length: 20,
    comment: '角色名称',
  })
  @IsNotEmpty({ message: '角色名称不能为空' })
  @Length(2, 20, { message: '角色名称的长度在2到20之间' })
  role_name: string;

  //角色编码
  @Column('varchar', {
    length: 20,
    comment: '角色编码',
  })
  role_code: string;

  //角色描述
  @Column('varchar', {
    length: 200,
    comment: '角色描述',
  })
  @IsUUID()
  describe: string;

  //创建人
  @Column('char', {
    length: 36,
    nullable: true,
    comment: '创建人',
  })
  @IsUUID()
  founder: string;

  //角色状态
  @Column('tinyint', {
    comment: '角色状态（0:禁用，1:正常）',
  })
  status: number;

  //排序
  @Column('int', {
    comment: '排序',
  })
  @IsInt()
  @Min(1)
  @Max(999)
  sort: number;

  // 创建时间
  @CreateDateColumn({ comment: '创建时间' })
  created_time: Date;

  // 最后一次更新时间
  @UpdateDateColumn({ nullable: true, comment: '最后一次更新时间' })
  updated_time: Date;
}
