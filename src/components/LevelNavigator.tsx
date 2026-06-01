import { Layers, Maximize2 } from 'lucide-react';
import { useTreeStore } from '../store/treeStore';
import { getNodesAtLevel } from '../data/treeData';

export default function LevelNavigator() {
  const { highlightedLevel, highlightLevel, focusSubtree, focusedSubtreeRoot } = useTreeStore();

  const levels = Array.from({ length: 10 }, (_, i) => i + 1);

  const getLevelInfo = (level: number) => {
    const nodes = getNodesAtLevel(level);
    return {
      count: nodes.length,
      name: `L${level}`,
    };
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-3 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 mb-2 px-1">
          <Layers className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-mono text-slate-400 uppercase">层级</span>
        </div>
        {levels.map((level) => {
          const info = getLevelInfo(level);
          const isActive = highlightedLevel === level;
          return (
            <button
              key={level}
              onClick={() => highlightLevel(isActive ? null : level)}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-all duration-200 ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
              }`}
            >
              <span className="w-5">{info.name}</span>
              <span className="text-[10px] text-slate-500">{info.count}节点</span>
              {isActive && (
                <span className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {focusedSubtreeRoot && (
        <button
          onClick={() => focusSubtree(null)}
          className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-3 flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <Maximize2 className="w-4 h-4" />
          重置视图
        </button>
      )}
    </div>
  );
}
