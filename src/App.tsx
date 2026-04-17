import { useState, useEffect } from 'react';
import TopNav from './components/TopNav';
import OverviewSection from './sections/OverviewSection';
import SeveritySection from './sections/SeveritySection';
import CausesSection from './sections/CausesSection';
import MeasuresSection from './sections/MeasuresSection';
import EvidenceSection from './sections/EvidenceSection';
import STIAlignmentSection from './sections/STIAlignmentSection';
import ConclusionSection from './sections/ConclusionSection';
import type { SectionId } from './types';

const SECTIONS: { id: SectionId; component: React.ComponentType }[] = [
  { id: 'overview',    component: OverviewSection },
  { id: 'severity',   component: SeveritySection },
  { id: 'causes',     component: CausesSection },
  { id: 'measures',   component: MeasuresSection },
  { id: 'evidence',   component: EvidenceSection },
  { id: 'sti',        component: STIAlignmentSection },
  { id: 'conclusion', component: ConclusionSection },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [storyMode, setStoryMode] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigate = (id: SectionId) => {
    if (id === activeSection) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSection(id);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);
  };

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const idx = SECTIONS.findIndex(s => s.id === activeSection);
        if (idx < SECTIONS.length - 1) handleNavigate(SECTIONS[idx + 1].id);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const idx = SECTIONS.findIndex(s => s.id === activeSection);
        if (idx > 0) handleNavigate(SECTIONS[idx - 1].id);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeSection]);

  const ActiveSection = SECTIONS.find(s => s.id === activeSection)?.component ?? OverviewSection;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <TopNav
        active={activeSection}
        onNavigate={handleNavigate}
        storyMode={storyMode}
        onToggleMode={() => setStoryMode(v => !v)}
      />

      {/* Main content area */}
      <main className="pt-14 min-h-screen">
        {/* Section progress bar */}
        <div className="fixed top-14 left-0 right-0 h-0.5 bg-gray-200 z-40">
          <div
            className="h-full bg-accent-500 transition-all duration-300"
            style={{
              width: `${((SECTIONS.findIndex(s => s.id === activeSection) + 1) / SECTIONS.length) * 100}%`,
            }}
          />
        </div>

        {/* Story mode banner */}
        {storyMode && (
          <div className="bg-navy-900 text-white py-4 px-6 border-b border-navy-800">
            <div className="max-w-7xl mx-auto">
              <p className="text-xs text-navy-400 uppercase tracking-wide font-medium mb-0.5">
                ศูนย์ข้อมูลสนับสนุนการตัดสินใจ PM2.5 · มุมมองเรื่องราว
              </p>
              <p className="text-sm text-white font-medium">
                {
                  activeSection === 'overview'    ? 'สถานการณ์วิกฤต PM2.5 ในประเทศไทย คืออะไร?' :
                  activeSection === 'severity'    ? 'วิกฤตนี้เกิดขึ้นที่ไหน และรุนแรงแค่ไหน?' :
                  activeSection === 'causes'      ? 'สาเหตุต่างกันตามพื้นที่ — ทำไมถึงต้องแยกวิเคราะห์?' :
                  activeSection === 'measures'    ? 'มาตรการใดที่ตรงกับสาเหตุในแต่ละพื้นที่?' :
                  activeSection === 'evidence'    ? 'หลักฐานวิจัยรองรับมาตรการเหล่านี้มากน้อยแค่ไหน?' :
                  activeSection === 'sti'         ? 'มาตรการและวิจัยเชื่อมกับแผน ววน. อย่างไร?' :
                                                    'ข้อสรุปและทิศทางการพัฒนาต่อไป'
                }
              </p>
            </div>
          </div>
        )}

        {/* Section Content */}
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 py-8 transition-opacity duration-150 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <ActiveSection />
        </div>

        {/* Section Navigation Footer */}
        <div className="border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => {
                const idx = SECTIONS.findIndex(s => s.id === activeSection);
                if (idx > 0) handleNavigate(SECTIONS[idx - 1].id);
              }}
              disabled={activeSection === 'overview'}
              className="flex items-center gap-2 px-4 py-2 text-sm text-navy-600 hover:text-navy-900 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100 transition-colors"
            >
              ← ก่อนหน้า
            </button>

            {/* Section dots */}
            <div className="flex items-center gap-2">
              {SECTIONS.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleNavigate(s.id)}
                  className={`rounded-full transition-all duration-200 ${
                    s.id === activeSection ? 'w-6 h-2.5 bg-navy-900' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                const idx = SECTIONS.findIndex(s => s.id === activeSection);
                if (idx < SECTIONS.length - 1) handleNavigate(SECTIONS[idx + 1].id);
              }}
              disabled={activeSection === 'conclusion'}
              className="flex items-center gap-2 px-4 py-2 text-sm text-navy-600 hover:text-navy-900 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100 transition-colors"
            >
              ถัดไป →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
