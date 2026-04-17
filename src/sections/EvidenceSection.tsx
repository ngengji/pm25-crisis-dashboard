import { useState, useMemo } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import SectionHeader from '../components/SectionHeader';
import { researchProjects, gapSummary, readinessSummary } from '../data/evidence';
import type { EvidenceStrength, PolicyReadiness, AreaTypeId } from '../types';

const STRENGTH_CONFIG: Record<EvidenceStrength, { label: string; color: string; bg: string; dot: string }> = {
  strong:       { label: 'หลักฐานชัดเจน',    color: '#166534', bg: '#f0fdf4', dot: '#16a34a' },
  partial:      { label: 'หลักฐานบางส่วน',  color: '#92400e', bg: '#fffbeb', dot: '#d97706' },
  insufficient: { label: 'หลักฐานไม่เพียงพอ', color: '#991b1b', bg: '#fef2f2', dot: '#dc2626' },
};

const READINESS_CONFIG: Record<PolicyReadiness, { label: string; color: string; bg: string }> = {
  high:   { label: 'พร้อมใช้สูง',   color: '#1d4ed8', bg: '#eff6ff' },
  medium: { label: 'พร้อมใช้ปานกลาง', color: '#7c3aed', bg: '#f5f3ff' },
  low:    { label: 'ต้องพัฒนาเพิ่ม', color: '#6b7280', bg: '#f9fafb' },
};

const AREA_LABELS: Record<AreaTypeId, string> = {
  forest:       'ป่า/ภูเขา',
  urban:        'เมือง/กทม.',
  agricultural: 'เกษตรกรรม',
  border:       'ชายแดน',
};

function EvidenceCard({ project }: { project: typeof researchProjects[number] }) {
  const [open, setOpen] = useState(false);
  const str = STRENGTH_CONFIG[project.evidenceStrength];
  const rdy = READINESS_CONFIG[project.policyReadiness];

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <span className="text-xs font-bold text-gray-400 flex-shrink-0">{project.id}</span>
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium`}
              style={{ backgroundColor: str.bg, color: str.color, borderColor: str.dot + '60' }}>
              <span className="inline-block w-1.5 h-1.5 rounded-full mr-1" style={{ backgroundColor: str.dot }} />
              {str.label}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded border font-medium`}
              style={{ backgroundColor: rdy.bg, color: rdy.color }}>
              {rdy.label}
            </span>
          </div>
        </div>

        <h4 className="text-sm font-semibold text-navy-900 leading-snug mb-2">{project.title}</h4>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
          <span>📅 {project.year}</span>
          <span>🏛️ {project.hostAgency}</span>
          <span className={`px-1.5 py-0.5 rounded ${project.status === 'completed' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
            {project.status === 'completed' ? 'เสร็จสิ้น' : 'กำลังดำเนินการ'}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {project.areaRelevance.map(a => (
            <span key={a} className="text-xs px-1.5 py-0.5 bg-navy-50 text-navy-600 rounded border border-navy-100">
              {AREA_LABELS[a]}
            </span>
          ))}
          <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">{project.theme}</span>
        </div>

        {open && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-600 leading-relaxed">{project.abstract}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="text-xs text-gray-400 mr-1">มาตรการที่เชื่อมโยง:</span>
              {project.linkedMeasures.map(m => (
                <span key={m} className="text-xs px-1.5 py-0.5 bg-accent-50 text-accent-700 rounded border border-accent-200">{m}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="w-full py-2 text-xs text-gray-400 hover:text-navy-600 hover:bg-gray-50 border-t border-gray-100 transition-colors"
      >
        {open ? '▲ ย่อ' : '▼ ดูบทคัดย่อ'}
      </button>
    </div>
  );
}

export default function EvidenceSection() {
  const [search, setSearch] = useState('');
  const [filterStrength, setFilterStrength] = useState<EvidenceStrength | 'all'>('all');
  const [filterReadiness, setFilterReadiness] = useState<PolicyReadiness | 'all'>('all');

  const filtered = useMemo(() =>
    researchProjects.filter(p => {
      if (filterStrength !== 'all' && p.evidenceStrength !== filterStrength) return false;
      if (filterReadiness !== 'all' && p.policyReadiness !== filterReadiness) return false;
      if (search) {
        const q = search.toLowerCase();
        return p.title.includes(q) || p.hostAgency.includes(q) || p.theme.includes(q);
      }
      return true;
    }),
    [search, filterStrength, filterReadiness]
  );

  const gapData = [
    { name: 'หลักฐานชัดเจน', value: gapSummary.strong, fill: '#16a34a' },
    { name: 'หลักฐานบางส่วน', value: gapSummary.partial, fill: '#d97706' },
    { name: 'ไม่เพียงพอ', value: gapSummary.insufficient, fill: '#dc2626' },
  ];

  const readinessData = [
    { name: 'พร้อมใช้สูง', value: readinessSummary.high, fill: '#2563eb' },
    { name: 'ปานกลาง', value: readinessSummary.medium, fill: '#7c3aed' },
    { name: 'ต้องพัฒนา', value: readinessSummary.low, fill: '#6b7280' },
  ];

  const themeData = Object.entries(
    researchProjects.reduce((acc, p) => {
      acc[p.theme] = (acc[p.theme] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-8">
      <SectionHeader
        number="05"
        title="ฐานข้อมูลหลักฐานวิจัย (NRIIS)"
        subtitle="ผลงานวิจัยที่รองรับมาตรการ PM2.5 และการวิเคราะห์ช่องว่างหลักฐาน"
        keyMessage="มีหลักฐานวิจัยที่ดีในบางประเด็น แต่ยังขาดงานวิจัยที่รองรับมาตรการชายแดนและอุตสาหกรรม"
      />

      {/* Prototype Warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <span className="text-amber-500 text-lg flex-shrink-0">⚠️</span>
        <div>
          <p className="text-amber-800 text-sm font-semibold">ข้อมูลตัวอย่างสำหรับต้นแบบ</p>
          <p className="text-amber-700 text-xs mt-0.5">โครงการวิจัยทั้งหมดในส่วนนี้เป็นข้อมูลจำลองที่สร้างขึ้นเพื่อสาธิตโครงสร้างระบบเท่านั้น ไม่ใช่ข้อมูลจริงจากฐานข้อมูล NRIIS การใช้งานจริงต้องเชื่อมต่อกับฐานข้อมูลวิจัยจริงและตรวจสอบความถูกต้องก่อน</p>
        </div>
      </div>

      {/* Summary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="text-navy-800 font-semibold text-sm mb-1">ระดับหลักฐานวิจัย</h3>
          <p className="text-xs text-gray-400 mb-3">แยกตามความชัดเจนของหลักฐาน</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={gapData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
                {gapData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: '11px' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="text-navy-800 font-semibold text-sm mb-1">ความพร้อมเชิงนโยบาย</h3>
          <p className="text-xs text-gray-400 mb-3">แยกตามระดับความพร้อมนำไปใช้</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={readinessData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
                {readinessData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: '11px' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="text-navy-800 font-semibold text-sm mb-1">โครงการแยกตามประเด็น</h3>
          <p className="text-xs text-gray-400 mb-3">จำนวนโครงการวิจัยตามหัวข้อ</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={themeData} layout="vertical" margin={{ left: 8, right: 20, top: 4, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 9 }} width={90} />
              <Tooltip contentStyle={{ fontSize: '11px' }} />
              <Bar dataKey="value" fill="#2563eb" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-3">
        <input
          type="text"
          placeholder="ค้นหาโครงการวิจัย (ชื่อโครงการ, หน่วยงาน, ประเด็น)..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-transparent"
        />
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-gray-500 font-medium">ระดับหลักฐาน:</span>
          {(['all', 'strong', 'partial', 'insufficient'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilterStrength(s)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                filterStrength === s ? 'bg-navy-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {s === 'all' ? 'ทั้งหมด' : STRENGTH_CONFIG[s].label}
            </button>
          ))}
          <span className="text-xs text-gray-500 font-medium ml-2">ความพร้อม:</span>
          {(['all', 'high', 'medium', 'low'] as const).map(r => (
            <button
              key={r}
              onClick={() => setFilterReadiness(r)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                filterReadiness === r ? 'bg-navy-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {r === 'all' ? 'ทั้งหมด' : READINESS_CONFIG[r].label}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400">{filtered.length} โครงการ</span>
        </div>
      </div>

      {/* Evidence Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map(p => <EvidenceCard key={p.id} project={p} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-2xl mb-2">🔬</p>
          <p>ไม่พบโครงการวิจัยที่ตรงกับเงื่อนไข</p>
        </div>
      )}

      {/* Gap Summary */}
      <div className="bg-navy-950 rounded-xl p-5">
        <h3 className="text-white font-bold text-sm mb-4">สรุปช่องว่างหลักฐานวิจัย (Gap Analysis)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'ช่องว่างวิกฤต',
              color: '#f87171',
              items: ['กลไกนโยบายหมอกควันข้ามแดน', 'เทคโนโลยีดักจับฝุ่นอุตสาหกรรม', 'ผลกระทบสุขภาพระยะยาวพื้นที่ชายแดน'],
            },
            {
              title: 'ช่องว่างบางส่วน',
              color: '#fbbf24',
              items: ['มาตรการลดการเผาอ้อยระดับนโยบาย', 'ระบบชดเชยเกษตรกรระยะยาว', 'มาตรฐานยานพาหนะบริบทไทย'],
            },
            {
              title: 'มีหลักฐานพร้อม',
              color: '#34d399',
              items: ['ระบบพยากรณ์คุณภาพอากาศ', 'AI Hotspot ไฟป่า', 'ผลกระทบสุขภาพกลุ่มเสี่ยง'],
            },
          ].map(block => (
            <div key={block.title} className="bg-navy-900 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: block.color }} />
                <p className="text-xs font-bold" style={{ color: block.color }}>{block.title}</p>
              </div>
              <ul className="space-y-1.5">
                {block.items.map((item, i) => (
                  <li key={i} className="text-xs text-navy-300 flex items-start gap-2">
                    <span className="flex-shrink-0 mt-0.5">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
