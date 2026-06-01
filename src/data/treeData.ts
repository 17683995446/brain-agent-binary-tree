export interface TreeNodeData {
  id: string;
  level: number;
  index: number;
  name: string;
  responsibility: string;
  inputs: string[];
  outputs: string[];
  algorithm: string;
  leftChild?: string;
  rightChild?: string;
  parent?: string;
  branch: 'prediction' | 'error' | 'root';
}

const level1Data: TreeNodeData[] = [
  {
    id: 'L1-01-全局预测-修正总循环',
    level: 1,
    index: 1,
    name: '全局预测-修正总循环',
    responsibility: '整棵类脑Agent二叉树的最高动力源，实现大脑全局预测误差最小化的核心目标。整合所有下层预测模型的输出和误差修正信号，生成全局统一的世界模型和行动决策。',
    inputs: ['所有下层节点的预测输出', '所有下层节点的误差修正信号', '系统内部状态信号'],
    outputs: ['全局世界模型参数', '全局行动决策指令', '全局学习率调整信号', '系统稳态调节信号'],
    algorithm: '自由能原理（Free Energy Principle），通过最小化变分自由能来最小化预测误差',
    leftChild: 'L2-01-分层预测模型系统',
    rightChild: 'L2-02-分层误差修正系统',
    branch: 'root',
  },
];

const level2Data: TreeNodeData[] = [
  {
    id: 'L2-01-分层预测模型系统',
    level: 2,
    index: 1,
    name: '分层预测模型系统',
    responsibility: '生成对外部世界和内部状态的分层预测。从最底层的感官特征预测开始，逐层向上抽象，生成越来越高级的概念、场景和事件预测。',
    inputs: ['上层节点的预测先验', '下层节点的误差修正信号', '历史预测状态'],
    outputs: ['对下层节点的预测信号', '向上层节点的抽象表征', '模型参数更新建议'],
    algorithm: '自上而下的预测传导，每一层都预测下一层的激活模式',
    parent: 'L1-01-全局预测-修正总循环',
    leftChild: 'L3-01-世界模型系统',
    rightChild: 'L3-02-价值模型系统',
    branch: 'prediction',
  },
  {
    id: 'L2-02-分层误差修正系统',
    level: 2,
    index: 2,
    name: '分层误差修正系统',
    responsibility: '计算预测与实际感知之间的差异，并将误差信号自下而上传递，更新各层预测模型的参数。',
    inputs: ['上层节点的预测信号', '下层节点的实际感知信号', '历史误差状态'],
    outputs: ['向上层节点的误差修正信号', '对下层节点的预测调整信号', '模型参数更新指令'],
    algorithm: '自下而上的误差传导，每一层都计算上一层预测与本层实际的差异',
    parent: 'L1-01-全局预测-修正总循环',
    leftChild: 'L3-03-感知误差计算系统',
    rightChild: 'L3-04-行动误差计算系统',
    branch: 'error',
  },
];

const level3Data: TreeNodeData[] = [
  {
    id: 'L3-01-世界模型系统',
    level: 3,
    index: 1,
    name: '世界模型系统',
    responsibility: '构建和维护关于外部世界和内部状态的内部模型，预测世界如何随时间变化以及行动如何影响世界。',
    inputs: ['感知误差信号', '行动决策指令', '历史世界状态'],
    outputs: ['对世界状态的预测', '对行动后果的预测', '世界模型参数'],
    algorithm: '马尔可夫决策过程，未来状态只依赖于当前状态和行动',
    parent: 'L2-01-分层预测模型系统',
    leftChild: 'L4-01-物理世界模型系统',
    rightChild: 'L4-02-社会世界模型系统',
    branch: 'prediction',
  },
  {
    id: 'L3-02-价值模型系统',
    level: 3,
    index: 2,
    name: '价值模型系统',
    responsibility: '评估每个世界状态和行动的生存价值，为决策提供依据。',
    inputs: ['世界状态预测', '行动后果预测', '历史奖励信号'],
    outputs: ['状态价值估计', '行动价值估计', '价值模型参数'],
    algorithm: '贝尔曼方程，用于计算长期累积奖励的期望',
    parent: 'L2-01-分层预测模型系统',
    leftChild: 'L4-03-内在价值模型系统',
    rightChild: 'L4-04-工具价值模型系统',
    branch: 'prediction',
  },
  {
    id: 'L3-03-感知误差计算系统',
    level: 3,
    index: 3,
    name: '感知误差计算系统',
    responsibility: '计算预测的感知信号与实际接收到的感知信号之间的差异。',
    inputs: ['上层预测的感知信号', '实际感知信号', '历史感知误差'],
    outputs: ['感知误差信号', '感知模型更新指令'],
    algorithm: '均方误差（MSE）或交叉熵损失',
    parent: 'L2-02-分层误差修正系统',
    leftChild: 'L4-05-低级感官误差计算系统',
    rightChild: 'L4-06-高级认知误差计算系统',
    branch: 'error',
  },
  {
    id: 'L3-04-行动误差计算系统',
    level: 3,
    index: 4,
    name: '行动误差计算系统',
    responsibility: '计算预测的行动结果与实际的行动结果之间的差异，以及预测的价值与实际获得的价值之间的差异。',
    inputs: ['预测的行动结果', '实际的行动结果', '预测的价值', '实际获得的奖励'],
    outputs: ['行动误差信号', '价值误差信号', '行动模型更新指令'],
    algorithm: '时序差分误差（TD Error）',
    parent: 'L2-02-分层误差修正系统',
    leftChild: 'L4-07-运动控制误差计算系统',
    rightChild: 'L4-08-价值评估误差计算系统',
    branch: 'error',
  },
];

const level4Data: TreeNodeData[] = [
  {
    id: 'L4-01-物理世界模型系统',
    level: 4,
    index: 1,
    name: '物理世界模型系统',
    responsibility: '建模物理世界的规律，包括空间、时间、物体、力、因果关系等',
    inputs: ['物理感知数据', '物理行动指令'],
    outputs: ['物理世界状态预测', '物理行动后果预测'],
    algorithm: '物理引擎模拟与因果推断',
    parent: 'L3-01-世界模型系统',
    leftChild: 'L5-01-空间结构模型',
    rightChild: 'L5-02-时间动态模型',
    branch: 'prediction',
  },
  {
    id: 'L4-02-社会世界模型系统',
    level: 4,
    index: 2,
    name: '社会世界模型系统',
    responsibility: '建模社会世界的规律，包括他人、自我、社会关系、文化规范等',
    inputs: ['社会感知数据', '社会行动指令'],
    outputs: ['社会世界状态预测', '社会行动后果预测'],
    algorithm: '心智理论与社会网络分析',
    parent: 'L3-01-世界模型系统',
    leftChild: 'L5-03-他人心智模型',
    rightChild: 'L5-04-自我意识模型',
    branch: 'prediction',
  },
  {
    id: 'L4-03-内在价值模型系统',
    level: 4,
    index: 3,
    name: '内在价值模型系统',
    responsibility: '评估与系统生存直接相关的状态价值，包括安全、健康、能量等',
    inputs: ['系统内部状态信号', '生存相关感知数据'],
    outputs: ['内在状态价值估计', '内在需求强度'],
    algorithm: '马斯洛需求层次与稳态调节模型',
    parent: 'L3-02-价值模型系统',
    leftChild: 'L5-05-生存安全价值',
    rightChild: 'L5-06-成长发展价值',
    branch: 'prediction',
  },
  {
    id: 'L4-04-工具价值模型系统',
    level: 4,
    index: 4,
    name: '工具价值模型系统',
    responsibility: '评估有助于实现内在价值的工具和手段的价值',
    inputs: ['工具可用性数据', '工具使用成本数据'],
    outputs: ['工具价值估计', '工具使用优先级'],
    algorithm: '效用最大化与成本效益分析',
    parent: 'L3-02-价值模型系统',
    leftChild: 'L5-07-认知工具价值',
    rightChild: 'L5-08-行动工具价值',
    branch: 'prediction',
  },
  {
    id: 'L4-05-低级感官误差计算系统',
    level: 4,
    index: 5,
    name: '低级感官误差计算系统',
    responsibility: '计算低级感官信号的预测误差，包括视觉、听觉、触觉等',
    inputs: ['预测的感官特征', '实际的感官特征'],
    outputs: ['感官特征误差信号'],
    algorithm: '感官特征差异度量',
    parent: 'L3-03-感知误差计算系统',
    leftChild: 'L5-09-视觉特征误差',
    rightChild: 'L5-10-听觉特征误差',
    branch: 'error',
  },
  {
    id: 'L4-06-高级认知误差计算系统',
    level: 4,
    index: 6,
    name: '高级认知误差计算系统',
    responsibility: '计算高级认知表征的预测误差，包括概念、推理、记忆等',
    inputs: ['预测的认知表征', '实际的认知表征'],
    outputs: ['认知表征误差信号'],
    algorithm: '语义距离与逻辑一致性检验',
    parent: 'L3-03-感知误差计算系统',
    leftChild: 'L5-11-概念推理误差',
    rightChild: 'L5-12-记忆检索误差',
    branch: 'error',
  },
  {
    id: 'L4-07-运动控制误差计算系统',
    level: 4,
    index: 7,
    name: '运动控制误差计算系统',
    responsibility: '计算运动控制信号的预测误差，包括精细运动和粗运动',
    inputs: ['预测的运动状态', '实际的运动状态'],
    outputs: ['运动控制误差信号'],
    algorithm: '运动轨迹偏差与肌肉反馈整合',
    parent: 'L3-04-行动误差计算系统',
    leftChild: 'L5-13-精细运动误差',
    rightChild: 'L5-14-粗运动误差',
    branch: 'error',
  },
  {
    id: 'L4-08-价值评估误差计算系统',
    level: 4,
    index: 8,
    name: '价值评估误差计算系统',
    responsibility: '计算价值评估的预测误差，包括奖励和惩罚',
    inputs: ['预测的价值', '实际获得的奖励/惩罚'],
    outputs: ['价值评估误差信号'],
    algorithm: '奖励预测误差（RPE）计算',
    parent: 'L3-04-行动误差计算系统',
    leftChild: 'L5-15-奖励预测误差',
    rightChild: 'L5-16-惩罚预测误差',
    branch: 'error',
  },
];

function generateLowerLevels(): TreeNodeData[] {
  const nodes: TreeNodeData[] = [];

  const level5Templates = [
    { name: '空间结构模型', parent: 'L4-01-物理世界模型系统', branch: 'prediction' as const },
    { name: '时间动态模型', parent: 'L4-01-物理世界模型系统', branch: 'prediction' as const },
    { name: '他人心智模型', parent: 'L4-02-社会世界模型系统', branch: 'prediction' as const },
    { name: '自我意识模型', parent: 'L4-02-社会世界模型系统', branch: 'prediction' as const },
    { name: '生存安全价值', parent: 'L4-03-内在价值模型系统', branch: 'prediction' as const },
    { name: '成长发展价值', parent: 'L4-03-内在价值模型系统', branch: 'prediction' as const },
    { name: '认知工具价值', parent: 'L4-04-工具价值模型系统', branch: 'prediction' as const },
    { name: '行动工具价值', parent: 'L4-04-工具价值模型系统', branch: 'prediction' as const },
    { name: '视觉特征误差', parent: 'L4-05-低级感官误差计算系统', branch: 'error' as const },
    { name: '听觉特征误差', parent: 'L4-05-低级感官误差计算系统', branch: 'error' as const },
    { name: '概念推理误差', parent: 'L4-06-高级认知误差计算系统', branch: 'error' as const },
    { name: '记忆检索误差', parent: 'L4-06-高级认知误差计算系统', branch: 'error' as const },
    { name: '精细运动误差', parent: 'L4-07-运动控制误差计算系统', branch: 'error' as const },
    { name: '粗运动误差', parent: 'L4-07-运动控制误差计算系统', branch: 'error' as const },
    { name: '奖励预测误差', parent: 'L4-08-价值评估误差计算系统', branch: 'error' as const },
    { name: '惩罚预测误差', parent: 'L4-08-价值评估误差计算系统', branch: 'error' as const },
  ];

  for (let i = 0; i < level5Templates.length; i++) {
    const t = level5Templates[i];
    const id = `L5-${String(i + 1).padStart(2, '0')}-${t.name}`;
    nodes.push({
      id,
      level: 5,
      index: i + 1,
      name: t.name,
      responsibility: `${t.name}的核心计算单元，负责处理特定子领域的预测或误差计算。`,
      inputs: ['上层预测信号', '下层实际信号'],
      outputs: ['处理后的信号', '误差修正信号'],
      algorithm: '特征提取与非线性变换',
      parent: t.parent,
      leftChild: `L6-${String(i * 2 + 1).padStart(2, '0')}-${t.name}-A`,
      rightChild: `L6-${String(i * 2 + 2).padStart(2, '0')}-${t.name}-B`,
      branch: t.branch,
    });
  }

  for (let level = 6; level <= 10; level++) {
    const prevLevelCount = Math.pow(2, level - 1);
    const startIdx = nodes.filter(n => n.level === level - 1).length > 0
      ? Math.max(...nodes.filter(n => n.level === level - 1).map(n => n.index)) + 1
      : 1;

    for (let i = 1; i <= prevLevelCount; i++) {
      const parentLevel = level - 1;
      const parentIndex = Math.ceil(i / 2);
      const parentNodes = nodes.filter(n => n.level === parentLevel && n.index === parentIndex);
      const parent = parentNodes[0];

      const branch = i % 2 === 1 ? 'left' : 'right';
      const suffix = branch === 'left' ? 'A' : 'B';
      const name = parent ? `${parent.name}-${suffix}` : `节点${level}-${i}`;
      const id = `L${level}-${String(i).padStart(2, '0')}-${name}`;

      const node: TreeNodeData = {
        id,
        level,
        index: i,
        name,
        responsibility: level === 10
          ? '原子计算单元：执行简单的加权求和与非线性激活，对应单个神经元的计算功能。'
          : `层级${level}的计算节点，整合下层信号并生成抽象表征。`,
        inputs: ['下层节点输出', '同层横向连接'],
        outputs: ['上层节点输入', '误差反馈信号'],
        algorithm: level === 10
          ? 'y = σ(Σwᵢxᵢ + b)'
          : '分层特征抽象与预测生成',
        parent: parent ? parent.id : undefined,
        branch: parent ? parent.branch : (i <= prevLevelCount / 2 ? 'prediction' : 'error'),
      };

      if (level < 10) {
        node.leftChild = `L${level + 1}-${String(i * 2 - 1).padStart(2, '0')}-${name}-A`;
        node.rightChild = `L${level + 1}-${String(i * 2).padStart(2, '0')}-${name}-B`;
      }

      nodes.push(node);
    }
  }

  return nodes;
}

export const treeNodes: TreeNodeData[] = [
  ...level1Data,
  ...level2Data,
  ...level3Data,
  ...level4Data,
  ...generateLowerLevels(),
];

export const nodesById = new Map<string, TreeNodeData>();
for (const node of treeNodes) {
  nodesById.set(node.id, node);
}

export function getNodeById(id: string): TreeNodeData | undefined {
  return nodesById.get(id);
}

export function getChildren(nodeId: string): TreeNodeData[] {
  const node = getNodeById(nodeId);
  if (!node) return [];
  const children: TreeNodeData[] = [];
  if (node.leftChild) {
    const left = getNodeById(node.leftChild);
    if (left) children.push(left);
  }
  if (node.rightChild) {
    const right = getNodeById(node.rightChild);
    if (right) children.push(right);
  }
  return children;
}

export function getPathToRoot(nodeId: string): TreeNodeData[] {
  const path: TreeNodeData[] = [];
  let current = getNodeById(nodeId);
  while (current) {
    path.unshift(current);
    current = current.parent ? getNodeById(current.parent) : undefined;
  }
  return path;
}

export function getNodesAtLevel(level: number): TreeNodeData[] {
  return treeNodes.filter(n => n.level === level);
}
