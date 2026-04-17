import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { measures } from '../data/measures';
import type { MeasureCategory, AreaTypeId } from '../types';

const CATEGORY_CONFIG: Record<MeasureCategory, { label: string; color: string; bg: string; border: string; icon: string }> = {
  prevention: { label: 'การป้องกัน',  color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', icon: '🛡️' },
  response:   { label: 'การรับมือ',   color: '#b45309', bg: '#fffbeb', border: '#fde68a', icon: '⚡' },
  recovery:   { label: 'การฟื้นฟู',   color: '#166534', bg: '#f0fdf4', border: '#bbf7d0', icon: '🌱' },
};

const AREA_LABELS: Record<AreaTypeId, string> = {
  forest:       'ป่า/ภูเขา',
  urban:        'เมือง/กทม.',
  agricultural: 'เกษตรกรรม',
  border:       'ชายแดน',
};

const EFFECTIVENESS_LABEL: Record<string, { label: string; color: string }> = {
  high:   { label: 'สูง',      color: '#16a34a' },
  medium: { label: 'ปานกลาง', color: '#d97706' },
  low:    { label: 'ต่ำ',      color: '#dc2626' },
};

const TIMEFRAME_COLOR: Record<string, string> = {
  immediate: '#dc2626',
  short:     '#f97316',
  medium:    '#eab308',
  long:      '#64748b',
};

function MeasureCard({ measure, expanded, onToggle }: {
  measure: typeof measures[number];
  expanded: boolean;
  onToggle: () => void;
}) {
  const cat = CATEGORY_CONFIG[measure.category];
  const eff = EFFECTIVENESS_LABEL[measure.effectiveness];

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-200 cursor-pointer hover:shadow-sm ${
        expanded ? 'border-navy-300 shadow-sm' : 'border-gray-200 bg-white'
      }`}
      style={{ backgroundColor: expanded ? cat.bg : 'white' }}
      onClick={onToggle}
    >
      <div className="px-4 py-3.5 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className="text-base flex-shrink-0">{cat.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-bold text-gray-400">{measure.id}</span>
              <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: cat.bg, color: cat.color, border: `1px solid ${cat.border}` }}>
                {cat.label}
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded" style={{ color: TIMEFRAME_COLOR[measure.timeframe], backgroundColor: `${TIMEFRAME_COLOR[measure.timeframe]}18` }}>
                {measure.timeframeLabel}
              </span>
            </div>
            <p className="text-sm font-semibold text-navy-900 leading-tight">{measure.name}</p>
            {!expanded && (
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">{measure.implementingAgency}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-gray-400">ประสิทธิผล</p>
            <p className="text-xs font-bold" style={{ color: eff.color }}>{eff.label}</p>
          </div>
          <span className={`text-gray-400 text-sm transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>▾</span>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3">
          <p className="text-sm text-navy-700 leading-relaxed">{measure.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white rounded-lg p-3 border border-gray-100">
              <p className="text-xs text-gray-400 font-medium mb-1">หน่วยงานรับผิดชอบ</p>
              <p className="text-xs text-navy-800 font-medium">{measure.implementingAgency}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-100">
              <p className="text-xs text-gray-400 font-medium mb-1">ความเหมาะสมตามพื้นที่</p>
              <div className="flex flex-wrap gap-1">
                {measure.areaTypes.map(at => (
                  <span key={at} className="text-xs px-1.5 py-0.5 bg-navy-50 text-navy-600 rounded border border-navy-100">
                    {AREA_LABELS[at]}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-100">
              <p className="text-xs text-gray-400 font-medium mb-1">ระยะเวลาดำเนินการ</p>
              <p className="text-xs font-semibold" style={{ color: TIMEFRAME_COLOR[measure.timeframe] }}>
                {measure.timeframeLabel}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MeasuresSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterCat, setFilterCat] = useState<MeasureCategory | 'all'>('all');
  const [filterArea, setFilterArea] = useState<AreaTypeId | 'all'>('all');

  const filtered = measures.filter(m => {
    if (filterCat !== 'all' && m.category !== filterCat) return false;
    if (filterArea !== 'all' && !m.areaTypes.includes(filterArea)) return false;
    return true;
  });

  const countByCategory = (cat: MeasureCategory) => measures.filter(m => m.category === cat).length;

  return (
    <div className="space-y-8">
      <SectionHeader
        number="04"
        title="คลังมาตรการ PM2.5"
        subtitle="มาตรการที่แนะนำสำหรับแต่ละสาเหตุและประเภทพื้นที่ แบ่งตามระยะการดำเนินการ"
        keyMessage="มาตรการต้องสอดคล้องกับสาเหตุและพื้นที่ — ไม่มีมาตรการเดียวที่ครอบคลุมทุกปัญหา"
      />

      {/* Summary Row */}
      <div className="grid grid-cols-3 gap-4">
        {(['prevention', 'response', 'recovery'] as MeasureCategory[]).map(cat => {
          const cfg = CATEGORY_CONFIG[cat];
          return (
            <button
              key={cat}
              onClick={() => setFilterCat(filterCat === cat ? 'all' : cat)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                filterCat === cat ? 'border-navy-400' : 'border-transparent'
              }`}
              style={{ backgroundColor: cfg.bg, borderColor: filterCat === cat ? undefined : cfg.border }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{cfg.icon}</span>
                <span className="text-sm font-bold" style={{ color: cfg.color }}>{cfg.label}</span>
              </div>
              <p className="text-2xl font-bold text-navy-900">{countByCategory(cat)}</p>
              <p className="text-xs text-gray-500">มาตรการ</p>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <span className="text-xs font-medium text-gray-600 flex-shrink-0">กรองตามพื้นที่:</span>
        {(['all', 'forest', 'urban', 'agricultural', 'border'] as const).map(a => (
          <button
            key={a}
            onClick={() => setFilterArea(a)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterArea === a
                ? 'bg-navy-900 text-white'
                : 'bg-white text-navy-600 border border-gray-200 hover:border-navy-300'
            }`}
          >
            {a === 'all' ? 'ทุกพื้นที่' : AREA_LABELS[a]}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-400">{filtered.length} มาตรการ</span>
      </div>

      {/* Measure Cards by Category */}
      {(['prevention', 'response', 'recovery'] as MeasureCategory[]).map(cat => {
        const catMeasures = filtered.filter(m => m.category === cat);
        if (catMeasures.length === 0) return null;
        const cfg = CATEGORY_CONFIG[cat];
        return (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">{cfg.icon}</span>
              <h3 className="text-sm font-bold" style={{ color: cfg.color }}>{cfg.label}</h3>
              <span className="text-xs text-gray-400">({catMeasures.length} มาตรการ)</span>
            </div>
            <div className="space-y-2">
              {catMeasures.map(m => (
                <MeasureCard
                  key={m.id}
                  measure={m}
                  expanded={expandedId === m.id}
                  onToggle={() => setExpandedId(expandedId === m.id ? null : m.id)}
                />
              ))}
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-2xl mb-2">🔍</p>
          <p>ไม่พบมาตรการที่ตรงกับเงื่อนไขที่เลือก</p>
        </div>
      )}

      {/* Decision Table Summary */}
      <div className="bg-navy-950 rounded-xl p-5">
        <h3 className="text-white font-bold text-sm mb-4">ตารางเชื่อมโยง: สาเหตุ → มาตรการที่เหมาะสม</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-navy-800">
                <th className="py-2 pr-4 text-left text-navy-400 font-semibold">สาเหตุหลัก</th>
                <th className="py-2 pr-4 text-left text-navy-400 font-semibold">พื้นที่</th>
                <th className="py-2 text-left text-navy-400 font-semibold">มาตรการที่แนะนำ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-900">
              {[
                { cause: 'ไฟป่า', area: 'ป่า/ภูเขา', measures: ['M02 พยากรณ์ Hotspot', 'M06 จัดการเชื้อเพลิง', 'M09 ดับไฟทางอากาศ'] },
                { cause: 'หมอกควันข้ามแดน', area: 'ชายแดน/ภาคเหนือ', measures: ['M10 กลไก ASEAN', 'M07 EOC'] },
                { cause: 'เผาตอซัง/พืชไร่', area: 'เกษตรกรรม', measures: ['M03 บังคับใช้กฎหมาย', 'M04 เกษตรทางเลือก', 'M12 ชดเชยเกษตรกร'] },
                { cause: 'ยานพาหนะ/อุตสาหกรรม', area: 'เมือง', measures: ['M05 มาตรฐานไอเสีย', 'M08 มาตรการฉุกเฉิน'] },
                { cause: 'ทุกแหล่ง', area: 'ทุกพื้นที่', measures: ['M01 ระบบเฝ้าระวัง', 'M11 ดูแลสุขภาพ'] },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="py-2.5 pr-4 text-white font-medium">{row.cause}</td>
                  <td className="py-2.5 pr-4 text-navy-300">{row.area}</td>
                  <td className="py-2.5">
                    <div className="flex flex-wrap gap-1.5">
                      {row.measures.map(m => (
                        <span key={m} className="px-2 py-0.5 bg-navy-800 text-navy-200 rounded border border-navy-700 text-xs">{m}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400">⚠️ ข้อมูลจำลองสำหรับต้นแบบ — ประสิทธิผลขึ้นกับบริบทการนำไปใช้</p>
    </div>
  );
}
