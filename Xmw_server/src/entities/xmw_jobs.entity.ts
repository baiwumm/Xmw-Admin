/*
 * @Description: XmwJobs Entity
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-16 10:57:24
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-21 16:28:30
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { XmwOrganization } from './xmw_organization.entity'; // 组织管理实体

@Entity({ name: 'xmw_jobs' })
export class XmwJobs {
  @PrimaryGeneratedColumn('uuid', { comment: '岗位id' })
  jobs_id: string;

  //岗位名称
  @Column('varchar', {
    length: 20,
    comment: '岗位名称',
  })
  jobs_name: string;

  //组织id
  @Column('char', {
    length: 36,
    comment: '组织id',
  })
  org_id: string;

  //父级id
  @Column('char', {
    length: 36,
    nullable: true,
    comment: '父级id',
  })
  parent_id: string;

  //岗位负责人
  @Column('char', {
    length: 36,
    nullable: true,
    comment: '岗位负责人',
  })
  leader: string;

  //岗位描述
  @Column('varchar', {
    length: 200,
    comment: '岗位描述',
  })
  describe: string;

  //创建人
  @Column('char', {
    length: 36,
    nullable: true,
    comment: '创建人',
  })
  founder: string;

  //排序
  @Column('int', {
    comment: '排序',
  })
  sort: number;

  // 创建时间
  @CreateDateColumn({ comment: '创建时间' })
  created_time: Date;

  // 最后一次更新时间
  @UpdateDateColumn({ nullable: true, comment: '最后一次更新时间' })
  updated_time: Date;

  // // 与组织管理形成一对一关系
  // @OneToOne(() => XmwOrganization)
  // @JoinColumn()
  // org_name: string;
}
