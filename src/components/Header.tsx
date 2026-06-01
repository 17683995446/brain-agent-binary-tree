import { Brain, Network, Info } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Brain className="w-7 h-7 text-cyan-400" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white font-mono tracking-wide">
              类脑Agent架构
            </h1>
            <p className="text-[10px] text-slate-500 font-mono">
              十级满二叉树 · 2047节点 · 第一性原理
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Network className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400">预测分支</span>
            <span className="text-slate-600">|</span>
            <Network className="w-4 h-4 text-pink-500" />
            <span className="text-pink-500">误差修正</span>
          </div>
          <button className="p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white">
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
