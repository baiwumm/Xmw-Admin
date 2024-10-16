/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-16 13:39:57
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-16 14:09:26
 * @Description: 甘特图
 */
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

import { PageContainer } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max';
import { useMount } from 'ahooks'
import { Card, Segmented } from 'antd';
import type { SegmentedOptions } from 'antd/es/segmented';
import { gantt, type GanttConfigOptions, type ZoomLevel } from 'dhtmlx-gantt';
import { FC, useRef, useState } from 'react';

import { formatPerfix } from '@/utils';
import { ROUTES } from '@/utils/enums'

import { ganttTasks } from './data';

type TimeType = 'day' | 'week' | 'month' | 'quarter' | 'year';

const Gantt: FC = () => {
  const { formatMessage } = useIntl(); // 国际化工具
  const [timeType, setTimeType] = useState<TimeType>('day');

  const ganttRef = useRef<HTMLDivElement>(null);

  const options: SegmentedOptions<TimeType> = [
    {
      label: '天',
      value: 'day',
    },
    {
      label: '周',
      value: 'week',
    },
    {
      label: '月',
      value: 'month',
    },
    {
      label: '季',
      value: 'quarter',
    },
    {
      label: '年',
      value: 'year',
    },
  ];

  function initGantt() {
    if (!ganttRef.current) return;

    const config: Partial<GanttConfigOptions> = {
      grid_width: 350,
      add_column: false,
      autofit: false,
      row_height: 60,
      bar_height: 34,
      auto_types: true,
      xml_date: '%Y-%m-%d',
      columns: [
        {
          name: 'text',
          label: '项目名称',
          tree: true,
          width: '*',
        },
        {
          name: 'start_date',
          label: '开始时间',
          align: 'center',
          width: 150,
        },
      ],
    };

    Object.assign(gantt.config, config);

    gantt.i18n.setLocale('cn');
    gantt.init(ganttRef.current);
    gantt.parse({ data: ganttTasks });

    const zoomLevels: ZoomLevel[] = [
      {
        name: 'day',
        scale_height: 60,
        scales: [{ unit: 'day', step: 1, format: '%d %M' }],
      },
      {
        name: 'week',
        scale_height: 60,
        scales: [
          {
            unit: 'week',
            step: 1,
            format(date: Date) {
              const dateToStr = gantt.date.date_to_str('%m-%d');
              const endDate = gantt.date.add(date, -6, 'day'); // 第几周
              return `${dateToStr(endDate)} 至 ${dateToStr(date)}`;
            },
          },
          {
            unit: 'day',
            step: 1,
            format: '%d',
            css(date: Date) {
              if (date.getDay() === 0 || date.getDay() === 6) {
                return 'day-item weekend weekend-border-bottom';
              }
              return 'day-item';
            },
          },
        ],
      },
      {
        name: 'month',
        scale_height: 60,
        min_column_width: 18,
        scales: [
          { unit: 'month', format: '%Y-%m' },
          {
            unit: 'day',
            step: 1,
            format: '%d',
            css(date: Date) {
              if (date.getDay() === 0 || date.getDay() === 6) {
                return 'day-item weekend weekend-border-bottom';
              }
              return 'day-item';
            },
          },
        ],
      },
      {
        name: 'quarter',
        height: 60,
        min_column_width: 110,
        scales: [
          {
            unit: 'quarter',
            step: 1,
            format(date: Date) {
              const yearStr = `${new Date(date).getFullYear()}年`;
              const dateToStr = gantt.date.date_to_str('%M');
              const endDate = gantt.date.add(gantt.date.add(date, 3, 'month'), -1, 'day');
              return `${yearStr + dateToStr(date)} - ${dateToStr(endDate)}`;
            },
          },
          {
            unit: 'week',
            step: 1,
            format(date: Date) {
              const dateToStr = gantt.date.date_to_str('%m-%d');
              const endDate = gantt.date.add(date, 6, 'day');
              return `${dateToStr(date)} 至 ${dateToStr(endDate)}`;
            },
          },
        ],
      },
      {
        name: 'year',
        scale_height: 50,
        min_column_width: 150,
        scales: [
          { unit: 'year', step: 1, format: '%Y年' },
          { unit: 'month', format: '%Y-%m' },
        ],
      },
    ];

    gantt.ext.zoom.init({
      levels: zoomLevels,
    });
    gantt.ext.zoom.setLevel(timeType);
  }

  function changeTime(value: TimeType) {
    setTimeType(value)
    gantt.ext.zoom.setLevel(value);
  }

  useMount(() => {
    initGantt();
  })
  return (
    <PageContainer header={{ title: null }}>
      <Card
        title={formatMessage({ id: formatPerfix(ROUTES.GANTT, '', true) })}
        bordered={false}
        extra={(
          <Segmented options={options} onChange={changeTime} />
        )}
      >
        <div ref={ganttRef} style={{
          minHeight: 'calc(100vh - 300px)',
        }} />
      </Card>
    </PageContainer>
  )
}
export default Gantt;
