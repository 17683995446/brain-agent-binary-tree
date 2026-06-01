import { useEffect, useRef, useCallback, useMemo } from 'react';
import * as d3 from 'd3';
import { treeNodes, getNodeById, TreeNodeData } from '../data/treeData';
import { useTreeStore } from '../store/treeStore';

interface D3Node extends d3.HierarchyNode<TreeNodeData> {
  x: number;
  y: number;
}

export default function TreeCanvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gRef = useRef<SVGGElement | null>(null);
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  const {
    selectedNodeId,
    highlightedLevel,
    focusedSubtreeRoot,
    scale,
    translateX,
    translateY,
    selectNode,
    setTransform,
    animationPlaying,
    animationMode,
    activePath,
  } = useTreeStore();

  const visibleNodes = useMemo(() => {
    if (focusedSubtreeRoot) {
      const rootNode = getNodeById(focusedSubtreeRoot);
      if (!rootNode) return treeNodes;
      const result: TreeNodeData[] = [];
      const queue = [rootNode];
      while (queue.length > 0) {
        const n = queue.shift()!;
        result.push(n);
        if (n.leftChild) {
          const left = getNodeById(n.leftChild);
          if (left) queue.push(left);
        }
        if (n.rightChild) {
          const right = getNodeById(n.rightChild);
          if (right) queue.push(right);
        }
      }
      return result;
    }
    return treeNodes;
  }, [focusedSubtreeRoot]);

  const getNodeColor = useCallback((node: TreeNodeData) => {
    if (node.branch === 'root') return '#fbbf24';
    if (node.branch === 'prediction') return '#00d4ff';
    return '#ff006e';
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = containerRef.current?.clientWidth || window.innerWidth;
    const height = containerRef.current?.clientHeight || window.innerHeight;

    svg.attr('width', width).attr('height', height);

    const g = svg.append('g');
    gRef.current = g.node();

    const rootData: TreeNodeData = {
      id: 'virtual-root',
      level: 0,
      index: 0,
      name: 'virtual',
      responsibility: '',
      inputs: [],
      outputs: [],
      algorithm: '',
      branch: 'root',
      leftChild: visibleNodes.find(n => n.level === 1)?.id,
    };

    const hierarchyData = d3.hierarchy<TreeNodeData>(rootData, (d) => {
      if (d.id === 'virtual-root') {
        return visibleNodes.filter(n => n.level === 1);
      }
      const children: TreeNodeData[] = [];
      if (d.leftChild) {
        const left = getNodeById(d.leftChild);
        if (left && visibleNodes.includes(left)) children.push(left);
      }
      if (d.rightChild) {
        const right = getNodeById(d.rightChild);
        if (right && visibleNodes.includes(right)) children.push(right);
      }
      return children;
    });

    const leafCount = visibleNodes.filter(n => n.level === 10).length || 1;
    const minNodeSpacing = 18;
    const treeWidth = Math.max(width * 3, leafCount * minNodeSpacing);
    const treeHeight = height * 2;

    const treeLayout = d3.tree<TreeNodeData>().size([treeWidth, treeHeight]);
    const treeData = treeLayout(hierarchyData);

    const nodes = treeData.descendants().filter(d => d.data.id !== 'virtual-root') as D3Node[];
    const links = treeData.links().filter(d => d.source.data.id !== 'virtual-root');

    const linkGroup = g.append('g').attr('class', 'links');
    const nodeGroup = g.append('g').attr('class', 'nodes');

    linkGroup
      .selectAll('path')
      .data(links)
      .enter()
      .append('path')
      .attr('d', (d) => {
        const source = d.source as D3Node;
        const target = d.target as D3Node;
        return `M${source.x},${source.y} C${source.x},${(source.y + target.y) / 2} ${target.x},${(source.y + target.y) / 2} ${target.x},${target.y}`;
      })
      .attr('fill', 'none')
      .attr('stroke', (d) => {
        const target = d.target.data;
        return getNodeColor(target);
      })
      .attr('stroke-width', 1.5)
      .attr('stroke-opacity', 0.4);

    const nodeEnter = nodeGroup
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${d.x},${d.y})`)
      .style('cursor', 'pointer')
      .on('click', (_event, d) => {
        selectNode(d.data.id);
      });

    nodeEnter
      .append('circle')
      .attr('r', (d) => Math.max(4, 16 - d.data.level * 1.2))
      .attr('fill', (d) => getNodeColor(d.data))
      .attr('stroke', '#0a0a0f')
      .attr('stroke-width', 2)
      .attr('class', 'node-circle');

    nodeEnter
      .append('text')
      .attr('dy', (d) => Math.max(4, 16 - d.data.level * 1.2) + 14)
      .attr('text-anchor', 'middle')
      .attr('fill', '#e2e8f0')
      .attr('font-size', (d) => {
        if (d.data.level <= 3) return 13;
        if (d.data.level <= 5) return 11;
        if (d.data.level <= 7) return 9;
        return 0;
      })
      .attr('font-family', 'JetBrains Mono, monospace')
      .text((d) => {
        if (d.data.level > 7) return '';
        if (d.data.level >= 6) {
          return d.data.name.length > 8 ? d.data.name.slice(0, 8) + '..' : d.data.name;
        }
        return d.data.name.length > 16 ? d.data.name.slice(0, 16) + '...' : d.data.name;
      })
      .style('pointer-events', 'none')
      .style('opacity', (d) => d.data.level > 7 ? 0 : 0.9);

    const zoomBehavior = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.02, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform.toString());
        setTransform(event.transform.k, event.transform.x, event.transform.y);
      });

    zoomBehaviorRef.current = zoomBehavior;
    svg.call(zoomBehavior);

    const initialTransform = d3.zoomIdentity.translate(width / 2 - treeWidth / 2, 60).scale(0.6);
    svg.call(zoomBehavior.transform, initialTransform);

    return () => {
      svg.selectAll('*').remove();
    };
  }, [visibleNodes, getNodeColor, selectNode, setTransform]);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    svg
      .selectAll('.node-circle')
      .attr('stroke-width', (d: unknown) => {
        const node = (d as D3Node).data;
        if (selectedNodeId === node.id) return 4;
        if (highlightedLevel !== null && node.level === highlightedLevel) return 3;
        return 2;
      })
      .attr('stroke', (d: unknown) => {
        const node = (d as D3Node).data;
        if (selectedNodeId === node.id) return '#fbbf24';
        if (highlightedLevel !== null && node.level === highlightedLevel) return '#ffffff';
        return '#0a0a0f';
      })
      .attr('r', (d: unknown) => {
        const node = (d as D3Node).data;
        const baseR = Math.max(4, 16 - node.level * 1.2);
        if (selectedNodeId === node.id) return baseR * 1.3;
        return baseR;
      });
  }, [selectedNodeId, highlightedLevel]);

  useEffect(() => {
    if (!svgRef.current || !animationPlaying) return;
    const svg = d3.select(svgRef.current);

    const links = svg.selectAll<SVGPathElement, unknown>('.links path');
    links
      .attr('stroke-opacity', 0.4)
      .transition()
      .duration(1000)
      .attr('stroke-opacity', 0.8)
      .transition()
      .duration(1000)
      .attr('stroke-opacity', 0.4);
  }, [animationPlaying, animationMode]);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden" style={{ background: '#0a0a0f' }}>
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
}
