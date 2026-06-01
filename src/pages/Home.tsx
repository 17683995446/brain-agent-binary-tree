import TreeCanvas from '../components/TreeCanvas';
import NodeDetailPanel from '../components/NodeDetailPanel';
import LevelNavigator from '../components/LevelNavigator';
import AnimationControls from '../components/AnimationControls';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden" style={{ background: '#0a0a0f' }}>
      <Header />
      <main className="w-full h-full pt-14">
        <TreeCanvas />
      </main>
      <LevelNavigator />
      <NodeDetailPanel />
      <AnimationControls />
    </div>
  );
}
