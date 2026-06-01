import { Play, Pause, RotateCcw, Zap } from 'lucide-react';
import { useTreeStore } from '../store/treeStore';

export default function AnimationControls() {
  const {
    animationPlaying,
    animationSpeed,
    animationMode,
    animationLoop,
    setAnimationPlaying,
    setAnimationSpeed,
    setAnimationMode,
    setAnimationLoop,
  } = useTreeStore();

  const modes = [
    { key: 'prediction' as const, label: '预测流', color: 'cyan' },
    { key: 'error' as const, label: '误差流', color: 'pink' },
    { key: 'both' as const, label: '双向', color: 'amber' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl px-5 py-3 flex items-center gap-5">
        <button
          onClick={() => setAnimationPlaying(!animationPlaying)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            animationPlaying
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30'
          }`}
        >
          {animationPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {animationPlaying ? '暂停' : '播放'}
        </button>

        <div className="h-8 w-px bg-slate-700/50" />

        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-slate-500" />
          <span className="text-xs text-slate-400 font-mono">{animationSpeed.toFixed(1)}x</span>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
            className="w-24 accent-cyan-500"
          />
        </div>

        <div className="h-8 w-px bg-slate-700/50" />

        <div className="flex items-center gap-1.5">
          {modes.map((m) => (
            <button
              key={m.key}
              onClick={() => setAnimationMode(m.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                animationMode === m.key
                  ? `bg-${m.color}-500/20 text-${m.color}-400 border border-${m.color}-500/30`
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="h-8 w-px bg-slate-700/50" />

        <button
          onClick={() => setAnimationLoop(!animationLoop)}
          className={`p-2 rounded-lg transition-all ${
            animationLoop
              ? 'bg-amber-500/20 text-amber-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
          title="循环播放"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
