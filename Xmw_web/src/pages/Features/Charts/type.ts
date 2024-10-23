import type { RefObject } from 'react';

export type DataType = {
  date: string;
  value: number;
}

export type ChartRef = {
  reset: () => void;
}

export type ChartProps = {
  onRef?: RefObject<ChartRef>;
}