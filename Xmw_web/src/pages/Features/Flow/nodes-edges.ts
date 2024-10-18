const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

export const initialNodes = [
  {
    id: '1',
    data: { label: 'Xmw Admin' },
    position,
  },
  {
    id: '2',
    data: { label: '指示面板' },
    position,
  },
  {
    id: '3',
    data: { label: '智能行政' },
    position,
  },
  {
    id: '4',
    data: { label: '个人中心' },
    position,
  },
  {
    id: '5',
    data: { label: '功能页' },
    position,
  },
  {
    id: '6',
    data: { label: '技术文档' },
    position,
  },
  {
    id: '7',
    data: { label: '系统设置' },
    position,
  },
];

export const initialEdges = [
  { id: 'e12', source: '1', target: '2', type: edgeType, animated: true },
  { id: 'e13', source: '1', target: '3', type: edgeType, animated: true },
  { id: 'e14', source: '1', target: '4', type: edgeType, animated: true },
  { id: 'e15', source: '1', target: '5', type: edgeType, animated: true },
  { id: 'e16', source: '1', target: '6', type: edgeType, animated: true },
  { id: 'e17', source: '1', target: '7', type: edgeType, animated: true },
];
