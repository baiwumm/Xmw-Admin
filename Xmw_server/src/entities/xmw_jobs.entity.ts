/*
 * @Description: XmwJobs Entity
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-16 10:57:24
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-16 17:44:59
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
export class XmwJobs {
  @PrimaryGeneratedColumn('uuid', { comment: '岗位id' })
  jobs_id: string;

  //岗位名称
  @Column('varchar', {
    length: 20,
    comment: '岗位名称',
  })
  @IsNotEmpty({ message: '岗位名称不能为空' })
  @Length(2, 20, { message: '岗位名称的长度在2到20之间' })
  jobs_name: string;

  //组织id
  @Column('char', {
    length: 36,
    comment: '组织id',
  })
  @IsUUID()
  org_id: string;

  //父级id
  @Column('char', {
    length: 36,
    nullable: true,
    comment: '父级id',
  })
  @IsUUID()
  parent_id: string;

  //岗位负责人
  @Column('char', {
    length: 36,
    nullable: true,
    comment: '岗位负责人',
  })
  @IsUUID()
  leader: string;

  //岗位描述
  @Column('varchar', {
    length: 200,
    comment: '岗位描述',
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
