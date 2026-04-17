import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ReferenceLine, BarChart, Bar, Cell,
} from 'recharts';
import SectionHeader from '../components/SectionHeader';
import { kpis, trendData, executiveSummary } from '../data/overview';
import type { KPI } from '../types';

// ─── KPI Card ─────────────────────────────────────────────────────────────────
function KPICard({ kpi }: { kpi: KPI }) {
  const severityColors: Record<string, string> = {
    critical: 'border-red-400 bg-red-50',
    high:     'border-orange-400 bg-orange-50',
    medium:   'border-yellow-400 bg-yellow-50',
    low:      'border-green-400 bg-green-50',
  };
  const valueColors: Record<string, string> = {
    critical: 'text-red-700',
    high:     'text-orange-700',
    medium:   'text-yellow-700',
    low:      'text-green-700',
  };
  const trendIcon = kpi.trend === 'up' ? '↑' : kpi.trend === 'down' ? '↓' : '→';
  const trendColor = kpi.trend === 'up' ? 'text-red-600' : kpi.trend === 'down' ? 'text-green-600' : 'text-gray-500';

  return (
    <div className={`rounded-xl border-l-4 bg-white p-4 shadow-sm hover:shadow-md transition-shadow ${severityColors[kpi.severity]}`}>
      <p className="text-navy-500 text-xs font-medium uppercase tracking-wide mb-1">{kpi.label}</p>
      <div className="flex items-baseline gap-1">
        <span className={`text-3xl font-bold ${valueColors[kpi.severity]}`}>{kpi.value}</span>
        <span className="text-navy-500 text-sm">{kpi.unit}</span>
      </div>
      <p className="text-navy-400 text-xs mt-1">{kpi.sublabel}</p>
      <div className={`mt-2 text-xs font-medium ${trendColor}`}>
        {trendIcon} {kpi.trendLabel}
      </div>
    </div>
  );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg text-xs">
      <p className="font-semibold text-navy-800 mb-2">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex justify-between gap-4">
          <span style={{ color: entry.color }}>{entry.name}</span>
          <span className="font-medium">{entry.value} μg/m³</span>
        </div>
      ))}
    </div>
  );
}

// ─── Top Risk Provinces (for bar chart) ──────────────────────────────────────
const topProvinces = [
  { name: 'แม่ฮ่องสอน', avg: 92.1, color: '#dc2626' },
  { name: 'เชียงใหม่',   avg: 85.3, color: '#dc2626' },
  { name: 'เชียงราย',    avg: 75.2, color: '#dc2626' },
  { name: 'น่าน',        avg: 62.4, color: '#f97316' },
  { name: 'ลำปาง',       avg: 58.7, color: '#f97316' },
  { name: 'ลำพูน',       avg: 54.2, color: '#f97316' },
  { name: 'กรุงเทพฯ',    avg: 42.3, color: '#eab308' },
  { name: 'สมุทรปราการ', avg: 40.1, color: '#eab308' },
];

export default function OverviewSection() {
  return (
    <div className="space-y-8">
      <SectionHeader
        number="01"
        title="ภาพรวมวิกฤต PM2.5 ประเทศไทย ปี 2566"
        subtitle="สรุปสถานการณ์ฝุ่นละออง PM2.5 และตัวชี้วัดสำคัญสำหรับผู้กำหนดนโยบาย"
        keyMessage="ประเทศไทยเผชิญวิกฤต PM2.5 ที่ซับซ้อนและมีผลกระทบหลายมิติ ต้องการมาตรการเฉพาะพื้นที่และหลักฐานวิจัยรองรับ"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map(kpi => <KPICard key={kpi.id} kpi={kpi} />)}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="text-navy-800 font-semibold text-sm mb-1">แนวโน้ม PM2.5 รายเดือน แยกตามภาค ปี 2566</h3>
          <p className="text-navy-400 text-xs mb-4">เส้นประสีแดง = มาตรฐานไทย (37.5 μg/m³) · เส้นประสีเทา = แนวทาง WHO (15 μg/m³)</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={trendData} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} unit=" μg" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <ReferenceLine y={37.5} stroke="#dc2626" strokeDasharray="4 4" strokeWidth={1.5}
                label={{ value: 'มาตรฐานไทย', position: 'insideTopRight', fontSize: 10, fill: '#dc2626' }} />
              <ReferenceLine y={15} stroke="#9ca3af" strokeDasharray="4 4" strokeWidth={1}
                label={{ value: 'WHO', position: 'insideTopRight', fontSize: 10, fill: '#9ca3af' }} />
              <Line dataKey="north"     name="ภาคเหนือ"                   stroke="#dc2626" strokeWidth={2} dot={false} />
              <Line dataKey="central"   name="กรุงเทพฯ/ภาคกลาง"           stroke="#2563eb" strokeWidth={2} dot={false} />
              <Line dataKey="northeast" name="ภาคตะวันออกเฉียงเหนือ"      stroke="#ca8a04" strokeWidth={2} dot={false} />
              <Line dataKey="east"      name="ภาคตะวันออก"                 stroke="#7c3aed" strokeWidth={1.5} dot={false} />
              <Line dataKey="south"     name="ภาคใต้"                      stroke="#16a34a" strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Provinces Bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="text-navy-800 font-semibold text-sm mb-1">จังหวัดเสี่ยงสูงสุด 8 อันดับ</h3>
          <p className="text-navy-400 text-xs mb-4">ค่าเฉลี่ย PM2.5 รายปี (μg/m³)</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topProvinces} layout="vertical" margin={{ left: 16, right: 24, top: 4, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} domain={[0, 110]} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#334155' }} width={70} />
              <Tooltip
                formatter={(v: any) => [`${v} μg/m³`, 'PM2.5 เฉลี่ย']}
                contentStyle={{ fontSize: '12px' }}
              />
              <ReferenceLine x={37.5} stroke="#dc2626" strokeDasharray="3 3" strokeWidth={1.5} />
              <Bar dataKey="avg" radius={[0, 3, 3, 0]}>
                {topProvinces.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-navy-950 rounded-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-6 rounded bg-accent-500" />
          <h3 className="text-white font-bold text-base">สาระสำคัญสำหรับผู้บริหาร</h3>
        </div>
        <p className="text-navy-300 text-sm leading-relaxed mb-4">{executiveSummary.subheadline}</p>
        <ul className="space-y-2.5 mb-5">
          {executiveSummary.keyPoints.map((pt, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded bg-accent-500/20 border border-accent-500/40 flex items-center justify-center text-accent-400 text-xs font-bold">{i + 1}</span>
              <span className="text-navy-200 text-sm leading-relaxed">{pt}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-navy-800 pt-4">
          <p className="text-xs text-navy-400 font-medium uppercase tracking-wide mb-1">ประเด็นที่ต้องการการตัดสินใจ</p>
          <p className="text-sm text-white">{executiveSummary.decisionCall}</p>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-gray-400">
        ⚠️ ข้อมูลทั้งหมดเป็นข้อมูลจำลองสำหรับต้นแบบระบบ ไม่ใช่ข้อมูลทางการ
      </p>
    </div>
  );
}
