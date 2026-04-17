import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { stiDirections, alignmentRows, priorityMatrix } from '../data/sti';
import type { GapLevel } from '../types';

const GAP_CONFIG: Record<GapLevel, { label: string; color: string; bg: string; border: string; icon: string }> = {
  covered: { label: 'มีหลักฐานรองรับ',  color: '#166534', bg: '#f0fdf4', border: '#86efac', icon: '✓' },
  partial: { label: 'หลักฐานบางส่วน',   color: '#92400e', bg: '#fffbeb', border: '#fde68a', icon: '~' },
  gap:     { label: 'ช่องว่างวิจัย',     color: '#991b1b', bg: '#fef2f2', border: '#fca5a5', icon: '!' },
};

const PRIORITY_URGENCY: Record<string, { color: string; bg: string }> = {
  high:   { color: '#dc2626', bg: '#fef2f2' },
  medium: { color: '#d97706', bg: '#fffbeb' },
  low:    { color: '#16a34a', bg: '#f0fdf4' },
};
const PRIORITY_ACTION: Record<string, string> = {
  'ดำเนินการทันที':  '#16a34a',
  'เร่งรัดพัฒนา':    '#d97706',
  'วางแผนระยะกลาง': '#2563eb',
  'เพิ่มงบวิจัย':    '#9333ea',
};

// Logic Chain Flow ─────────────────────────────────────────────────────────────
function LogicChainRow({ row, index }: { row: typeof alignmentRows[number]; index: number }) {
  const gap = GAP_CONFIG[row.gapLevel];
  const dir = stiDirections.find(d => d.id === row.stiDirectionId)!;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`grid grid-cols-12 gap-2 items-center py-3 px-4 rounded-lg border transition-all duration-150 ${
        hovered ? 'border-navy-300 bg-navy-50' : 'border-gray-100 bg-white'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Index */}
      <div className="col-span-1 text-center">
        <span className="text-xs font-bold text-gray-400">{String(index + 1).padStart(2, '0')}</span>
      </div>

      {/* Issue → Cause */}
      <div className="col-span-2">
        <p className="text-xs font-semibold text-navy-900 leading-tight">{row.issue}</p>
        <p className="text-xs text-gray-400 mt-0.5">{row.cause}</p>
      </div>

      {/* Arrow */}
      <div className="col-span-1 text-center text-gray-300 text-base">→</div>

      {/* Measure */}
      <div className="col-span-2">
        <p className="text-xs text-navy-700 font-medium leading-tight">{row.measure}</p>
      </div>

      {/* Arrow */}
      <div className="col-span-1 text-center text-gray-300 text-base">→</div>

      {/* Research */}
      <div className="col-span-1">
        <div className="flex flex-wrap gap-1">
          {row.researchIds.map(id => (
            <span key={id} className="text-xs px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200">{id}</span>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div className="col-span-1 text-center text-gray-300 text-base">→</div>

      {/* STI Direction */}
      <div className="col-span-2">
        <span
          className="inline-block text-xs px-2 py-1 rounded font-medium"
          style={{ backgroundColor: dir.color + '18', color: dir.color, border: `1px solid ${dir.color}40` }}
        >
          {dir.labelShort}
        </span>
      </div>

      {/* Gap Level */}
      <div className="col-span-1 text-center">
        <span
          className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-semibold"
          style={{ backgroundColor: gap.bg, color: gap.color, borderColor: gap.border }}
          title={row.note}
        >
          <span>{gap.icon}</span>
        </span>
      </div>
    </div>
  );
}

export default function STIAlignmentSection() {
  const [selectedDir, setSelectedDir] = useState<string | null>(null);

  const filteredRows = selectedDir
    ? alignmentRows.filter(r => r.stiDirectionId === selectedDir)
    : alignmentRows;

  const coveredCount = alignmentRows.filter(r => r.gapLevel === 'covered').length;
  const partialCount = alignmentRows.filter(r => r.gapLevel === 'partial').length;
  const gapCount = alignmentRows.filter(r => r.gapLevel === 'gap').length;

  return (
    <div className="space-y-8">
      <SectionHeader
        number="06"
        title="การเชื่อมโยงกับแผน ววน. 2566–2570"
        subtitle="แสดงห่วงโซ่ตรรกะจากปัญหา PM2.5 ถึงการสนับสนุนเชิงนโยบาย STI และช่องว่างที่ต้องเร่งแก้ไข"
        keyMessage="แผน ววน. มีกรอบยุทธศาสตร์ที่สอดคล้องกับการแก้ PM2.5 แต่ต้องการการกำหนดโจทย์วิจัยที่เชื่อมโยงกับพื้นที่และมาตรการอย่างชัดเจน"
      />

      {/* Disclaimer */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <span className="text-blue-500 text-lg flex-shrink-0">ℹ️</span>
        <p className="text-blue-800 text-xs leading-relaxed">
          <strong>หมายเหตุ:</strong> ป้ายกำกับทิศทาง ววน. ในต้นแบบนี้เป็นระดับสูง (high-level) เพื่อสาธิตโครงสร้าง ไม่ใช่รหัสโปรแกรมหรือแผนงานทางการ ต้องตรวจสอบกับเอกสารแผน ววน. 2566–2570 อย่างเป็นทางการก่อนนำไปใช้
        </p>
      </div>

      {/* STI Directions */}
      <div>
        <h3 className="text-navy-800 font-semibold text-sm mb-3">ทิศทางแผน ววน. ที่เกี่ยวข้อง</h3>
        <div className="flex flex-wrap gap-3">
          {stiDirections.map(dir => (
            <button
              key={dir.id}
              onClick={() => setSelectedDir(selectedDir === dir.id ? null : dir.id)}
              className={`flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all max-w-xs ${
                selectedDir === dir.id ? 'border-opacity-100 shadow-sm' : 'border-transparent hover:border-opacity-50'
              }`}
              style={{
                backgroundColor: dir.color + '10',
                borderColor: selectedDir === dir.id ? dir.color : dir.color + '30',
              }}
            >
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold mt-0.5"
                style={{ backgroundColor: dir.color }}
              >
                {dir.id.replace('STI', '')}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: dir.color }}>{dir.label}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">{dir.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'มีหลักฐานรองรับ', value: coveredCount, color: '#16a34a', bg: '#f0fdf4' },
          { label: 'หลักฐานบางส่วน', value: partialCount, color: '#d97706', bg: '#fffbeb' },
          { label: 'ช่องว่างวิจัย', value: gapCount, color: '#dc2626', bg: '#fef2f2' },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl p-4 text-center" style={{ backgroundColor: stat.bg }}>
            <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-xs font-medium mt-1" style={{ color: stat.color }}>{stat.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">ห่วงโซ่นโยบาย</p>
          </div>
        ))}
      </div>

      {/* Logic Chain Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-navy-800 font-semibold text-sm">ห่วงโซ่ตรรกะ: ปัญหา → มาตรการ → วิจัย → แผน ววน.</h3>
            {selectedDir && (
              <p className="text-xs text-accent-600 mt-0.5">
                กรองตาม: {stiDirections.find(d => d.id === selectedDir)?.label}
              </p>
            )}
          </div>
          {selectedDir && (
            <button
              onClick={() => setSelectedDir(null)}
              className="text-xs text-gray-400 hover:text-gray-600 underline"
            >
              ล้างตัวกรอง
            </button>
          )}
        </div>

        {/* Header */}
        <div className="grid grid-cols-12 gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500">
          <div className="col-span-1">#</div>
          <div className="col-span-2">ปัญหา / สาเหตุ</div>
          <div className="col-span-1" />
          <div className="col-span-2">มาตรการ</div>
          <div className="col-span-1" />
          <div className="col-span-1">วิจัย</div>
          <div className="col-span-1" />
          <div className="col-span-2">ทิศทาง ววน.</div>
          <div className="col-span-1 text-center">สถานะ</div>
        </div>

        <div className="p-3 space-y-1.5">
          {filteredRows.map((row, i) => (
            <LogicChainRow key={i} row={row} index={i} />
          ))}
        </div>

        {/* Legend */}
        <div className="px-5 py-3 border-t border-gray-100 flex flex-wrap gap-4">
          {Object.entries(GAP_CONFIG).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span
                className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold border"
                style={{ backgroundColor: cfg.bg, color: cfg.color, borderColor: cfg.border }}
              >
                {cfg.icon}
              </span>
              <span className="text-xs text-gray-500">{cfg.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Priority Matrix */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <h3 className="text-navy-800 font-semibold text-sm">เมทริกซ์ลำดับความสำคัญ: ความเร่งด่วน × ความพร้อมหลักฐาน</h3>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {priorityMatrix.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 bg-gray-50"
            >
              <div
                className="flex-shrink-0 w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: PRIORITY_URGENCY[item.urgency].color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-navy-800">{item.issue}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs" style={{ color: PRIORITY_URGENCY[item.urgency].color }}>
                    ความเร่งด่วน: {item.urgency === 'high' ? 'สูง' : 'ปานกลาง'}
                  </span>
                </div>
              </div>
              <span
                className="text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0"
                style={{ color: PRIORITY_ACTION[item.action] || '#1e3a5f', backgroundColor: (PRIORITY_ACTION[item.action] || '#1e3a5f') + '18' }}
              >
                {item.action}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
