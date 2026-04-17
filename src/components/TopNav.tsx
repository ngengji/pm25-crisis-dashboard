import { type SectionId } from '../types';

interface NavItem {
  id: SectionId;
  label: string;
  short: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview',    label: 'ภาพรวม',              short: '01' },
  { id: 'severity',   label: 'พื้นที่และความรุนแรง', short: '02' },
  { id: 'causes',     label: 'แหล่งกำเนิดและสาเหตุ', short: '03' },
  { id: 'measures',   label: 'มาตรการ',               short: '04' },
  { id: 'evidence',   label: 'หลักฐานวิจัย',          short: '05' },
  { id: 'sti',        label: 'แผน ววน.',               short: '06' },
  { id: 'conclusion', label: 'ข้อสรุปเชิงนโยบาย',    short: '07' },
];

interface Props {
  active: SectionId;
  onNavigate: (id: SectionId) => void;
  storyMode: boolean;
  onToggleMode: () => void;
}

export default function TopNav({ active, onNavigate, storyMode, onToggleMode }: Props) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-950 border-b border-navy-800">
      <div className="flex items-center justify-between h-14 px-6">
        {/* Brand */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-7 h-7 rounded bg-accent-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">PM</span>
          </div>
          <div className="hidden md:block">
            <p className="text-white text-sm font-semibold leading-tight">ศูนย์ข้อมูล PM2.5</p>
            <p className="text-navy-400 text-xs leading-tight">ต้นแบบระบบสนับสนุนการตัดสินใจ</p>
          </div>
        </div>

        {/* Nav Items */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                flex-shrink-0 px-3 py-1.5 rounded text-xs font-medium transition-all duration-150
                ${active === item.id
                  ? 'bg-accent-500 text-white'
                  : 'text-navy-300 hover:text-white hover:bg-navy-800'
                }
              `}
            >
              <span className="hidden lg:inline">{item.label}</span>
              <span className="lg:hidden">{item.short}</span>
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
          <button
            onClick={onToggleMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-navy-700 text-navy-300 hover:text-white hover:border-navy-500 text-xs transition-all"
          >
            <span>{storyMode ? '📊' : '📖'}</span>
            <span className="hidden sm:inline">{storyMode ? 'มุมมองข้อมูล' : 'มุมมองเรื่องราว'}</span>
          </button>
          {/* Prototype badge */}
          <div className="px-2 py-1 rounded bg-amber-500/20 border border-amber-500/40">
            <span className="text-amber-400 text-xs font-medium">ต้นแบบ</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
