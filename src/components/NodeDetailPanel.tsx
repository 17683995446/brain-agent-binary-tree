import { X, GitBranch, ArrowUp, ArrowDown, Play } from 'lucide-react';
import { getNodeById, getChildren, getPathToRoot } from '../data/treeData';
import { useTreeStore } from '../store/treeStore';

export default function NodeDetailPanel() {
  const {
    selectedNodeId,
    selectNode,
    focusSubtree,
    setAnimationPlaying,
    setActivePath,
  } = useTreeStore();

  const node = selectedNodeId ? getNodeById(selectedNodeId) : null;

  if (!node) {
    return (
      <div className="fixed right-0 top-0 h-full w-96 bg-slate-900/80 backdrop-blur-md border-l border-slate-700/50 transform translate-x-full transition-transform duration-300 z-40" />
    );
  }

  const children = getChildren(node.id);
  const pathToRoot = getPathToRoot(node.id);

  const handlePlaySignal = () => {
    const path = pathToRoot.map(n => n.id);
    setActivePath(path);
    setAnimationPlaying(true);
    setTimeout(() => {
      setAnimationPlaying(false);
      setActivePath(null);
    }, 3000);
  };

  const getBranchLabel = (branch: string) => {
    if (branch === 'root') return '根节点';
    if (branch === 'prediction') return '预测分支';
    return '误差修正分支';
  };

  const getBranchColor = (branch: string) => {
    if (branch === 'root') return 'text-amber-400';
    if (branch === 'prediction') return 'text-cyan-400';
    return 'text-pink-500';
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-slate-900/90 backdrop-blur-xl border-l border-slate-700/50 transform transition-transform duration-300 z-40 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <span className={`text-xs font-mono uppercase tracking-wider ${getBranchColor(node.branch)}`}>
            {getBranchLabel(node.branch)} · L{node.level}
          </span>
          <button
            onClick={() => selectNode(null)}
            className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <h2 className="text-xl font-bold text-white mb-2 font-mono">{node.name}</h2>
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">{node.responsibility}</p>

        <div className="space-y-5">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <ArrowDown className="w-3.5 h-3.5" />
              输入信号
            </h3>
            <ul className="space-y-2">
              {node.inputs.map((input, i) => (
                <li key={i} className="text-sm text-slate-300 bg-slate-800/50 rounded-lg px-3 py-2">
                  {input}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <ArrowUp className="w-3.5 h-3.5" />
              输出信号
            </h3>
            <ul className="space-y-2">
              {node.outputs.map((output, i) => (
                <li key={i} className="text-sm text-slate-300 bg-slate-800/50 rounded-lg px-3 py-2">
                  {output}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">
              核心算法
            </h3>
            <div className="text-sm text-cyan-300 bg-cyan-950/30 border border-cyan-800/30 rounded-lg px-3 py-2 font-mono">
              {node.algorithm}
            </div>
          </div>

          {pathToRoot.length > 1 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">
                到根节点路径
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {pathToRoot.map((n, i) => (
                  <span key={n.id} className="flex items-center gap-1.5">
                    <button
                      onClick={() => selectNode(n.id)}
                      className="text-xs px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      {n.name}
                    </button>
                    {i < pathToRoot.length - 1 && (
                      <span className="text-slate-600">→</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}

          {children.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                <GitBranch className="w-3.5 h-3.5" />
                子节点
              </h3>
              <div className="space-y-2">
                {children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => selectNode(child.id)}
                    className="w-full text-left text-sm px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300 transition-colors"
                  >
                    <span className={getBranchColor(child.branch)}>●</span>{' '}
                    {child.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={handlePlaySignal}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-600/30 transition-colors"
          >
            <Play className="w-4 h-4" />
            播放信号流
          </button>
          {children.length > 0 && (
            <button
              onClick={() => focusSubtree(node.id)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <GitBranch className="w-4 h-4" />
              聚焦子树
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
