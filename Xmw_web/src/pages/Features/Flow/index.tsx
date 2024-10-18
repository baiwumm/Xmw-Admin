/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-17 17:28:34
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-18 14:50:54
 * @Description: 流程图
 */
import '@xyflow/react/dist/style.css';

import dagre from '@dagrejs/dagre';
import { useIntl } from '@umijs/max';
import {
  addEdge,
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { Button, Flex } from 'antd';
import React, { FC, useCallback } from 'react';

import { formatPerfix } from '@/utils';
import { ROUTES } from '@/utils/enums'

import { initialEdges, initialNodes } from './nodes-edges';
const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges,
);

const Flow: FC = () => {
  const { formatMessage } = useIntl(); // 国际化工具
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds),
      )
    },
    [],
  )
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges],
  );
  return (
    <div style={{ width: '100%', height: 'calc(100vh - 130px)' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        <Background variant={BackgroundVariant.Lines} gap={50} />
        <MiniMap />
        <Controls />
        <Panel position="top-right">
          <Flex gap="small" wrap>
            <Button type='primary' onClick={() => onLayout('TB')}>
              {formatMessage({ id: formatPerfix(ROUTES.FLOW, 'vertical') })}
            </Button>
            <Button type='primary' onClick={() => onLayout('LR')}>
              {formatMessage({ id: formatPerfix(ROUTES.FLOW, 'horizontal') })}
            </Button>
          </Flex>
        </Panel>
      </ReactFlow>
    </div>
  )
}
export default Flow;
