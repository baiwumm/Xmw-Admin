import type { RefObject } from 'react';

export type ChartRef = {
  reset: () => void;
}

export type ChartProps = {
  colorPrimary: string;
  onRef?: RefObject<ChartRef>;
}