import { create } from 'zustand';
import { TreeNodeData, getNodeById, getPathToRoot } from '../data/treeData';

interface TreeState {
  selectedNodeId: string | null;
  highlightedLevel: number | null;
  focusedSubtreeRoot: string | null;
  scale: number;
  translateX: number;
  translateY: number;

  animationPlaying: boolean;
  animationSpeed: number;
  animationMode: 'prediction' | 'error' | 'both';
  animationLoop: boolean;
  activePath: string[] | null;

  selectNode: (id: string | null) => void;
  highlightLevel: (level: number | null) => void;
  focusSubtree: (rootId: string | null) => void;
  setTransform: (scale: number, x: number, y: number) => void;

  setAnimationPlaying: (playing: boolean) => void;
  setAnimationSpeed: (speed: number) => void;
  setAnimationMode: (mode: 'prediction' | 'error' | 'both') => void;
  setAnimationLoop: (loop: boolean) => void;
  setActivePath: (path: string[] | null) => void;
}

export const useTreeStore = create<TreeState>((set) => ({
  selectedNodeId: null,
  highlightedLevel: null,
  focusedSubtreeRoot: null,
  scale: 1,
  translateX: 0,
  translateY: 0,

  animationPlaying: false,
  animationSpeed: 1,
  animationMode: 'both',
  animationLoop: false,
  activePath: null,

  selectNode: (id) => set({ selectedNodeId: id }),
  highlightLevel: (level) => set({ highlightedLevel: level }),
  focusSubtree: (rootId) => set({ focusedSubtreeRoot: rootId }),
  setTransform: (scale, translateX, translateY) => set({ scale, translateX, translateY }),

  setAnimationPlaying: (playing) => set({ animationPlaying: playing }),
  setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
  setAnimationMode: (mode) => set({ animationMode: mode }),
  setAnimationLoop: (loop) => set({ animationLoop: loop }),
  setActivePath: (path) => set({ activePath: path }),
}));
