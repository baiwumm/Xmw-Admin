/*
 * @Description: XmwOrganization Entity
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-16 11:06:36
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-16 17:44:54
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
export class XmwOrganization {
  @PrimaryGeneratedColumn('uuid', { comment: '组织id' })
  org_id: string;

  //组织名称
  @Column('varchar', {
    length: 20,
    comment: '组织名称',
  })
  @IsNotEmpty({ message: '组织名称不能为空' })
  @Length(2, 20, { message: '组织名称的长度在2到20之间' })
  org_name: string;

  //组织编码
  @Column('varchar', {
    length: 20,
    comment: '组织编码',
  })
  org_code: string;

  //组织类型
  @Column('enum', {
    enum: [1, 2, 3, 4],
    comment: '组织类型（1:公司,2:单位,3:部门,4:小组）',
  })
  org_type: string;

  //父级id
  @Column('char', {
    length: 36,
    nullable: true,
    comment: '父级id',
  })
  @IsUUID()
  parent_id: string;

  //组织负责人
  @Column('char', {
    length: 36,
    nullable: true,
    comment: '组织负责人',
  })
  @IsUUID()
  leader: string;

  //部门描述
  @Column('varchar', {
    length: 200,
    comment: '部门描述',
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

  //部门状态
  @Column('tinyint', {
    comment: '部门状态（0:禁用，1:正常）',
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
