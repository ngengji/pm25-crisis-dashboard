import { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import SectionHeader from '../components/SectionHeader';
import { areaCauseProfiles, causeMatrix } from '../data/causes';
import type { AreaTypeId } from '../types';

const MATRIX_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  primary:   { label: 'หลัก',        color: '#dc2626', bg: '#fef2f2' },
  secondary: { label: 'รอง',         color: '#f97316', bg: '#fff7ed' },
  none:      { label: '–',           color: '#cbd5e1', bg: '#f8fafc' },
};

// Custom pie label
function renderCustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, name, contribution }: any) {
  if (contribution < 10) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {contribution}%
    </text>
  );
}

export default function CausesSection() {
  const [selected, setSelected] = useState<AreaTypeId>('forest');
  const profile = areaCauseProfiles.find(p => p.id === selected)!;

  return (
    <div className="space-y-8">
      <SectionHeader
        number="03"
        title="แหล่งกำเนิดและสาเหตุ PM2.5 แยกตามพื้นที่"
        subtitle="สาเหตุของ PM2.5 แตกต่างกันตามลักษณะภูมิประเทศและกิจกรรมของมนุษย์ในแต่ละพื้นที่"
        keyMessage="การแก้ปัญหาต้องระบุสาเหตุหลักเฉพาะพื้นที่ก่อน ไม่สามารถใช้มาตรการเดียวสำหรับทุกพื้นที่ได้"
      />

      {/* Area Type Selector */}
      <div className="flex flex-wrap gap-3">
        {areaCauseProfiles.map(p => (
          <button
            key={p.id}
            onClick={() => setSelected(p.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
              selected === p.id
                ? 'bg-navy-900 text-white border-navy-900 shadow-sm'
                : 'bg-white text-navy-700 border-gray-200 hover:border-navy-300 hover:bg-navy-50'
            }`}
          >
            <span>{p.icon}</span>
            <span>{p.labelShort}</span>
          </button>
        ))}
      </div>

      {/* Profile Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Info Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{profile.icon}</span>
              <h3 className="text-navy-900 font-bold text-base">{profile.label}</h3>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {profile.exampleProvinces.map(pv => (
                <span key={pv} className="px-2 py-0.5 bg-navy-50 text-navy-600 rounded text-xs border border-navy-100">
                  {pv}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>🗓️</span>
              <span>{profile.season}</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-semibold text-navy-700 uppercase tracking-wide mb-2">สาเหตุหลัก</p>
            <div className="space-y-2">
              {profile.causes.map(c => (
                <div key={c.id}>
                  <div className="flex justify-between mb-0.5">
                    <span className="text-xs text-navy-700 font-medium">{c.name}</span>
                    <span className="text-xs font-bold" style={{ color: c.color }}>{c.contribution}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${c.contribution}%`, backgroundColor: c.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="bg-accent-50 border border-accent-200 rounded-lg p-3">
              <p className="text-xs font-semibold text-accent-800 mb-1">ข้อสรุปสำหรับพื้นที่นี้</p>
              <p className="text-xs text-accent-700 leading-relaxed">{profile.keyMessage}</p>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="text-navy-800 font-semibold text-sm mb-4">
            สัดส่วนแหล่งกำเนิด — {profile.labelShort}
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={profile.causes}
                dataKey="contribution"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                labelLine={false}
                label={renderCustomLabel}
              >
                {profile.causes.map(c => (
                  <Cell key={c.id} fill={c.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: any, name: string) => [`${v}%`, name]} contentStyle={{ fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Cause Descriptions */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm overflow-y-auto max-h-[360px]">
          <h3 className="text-navy-800 font-semibold text-sm mb-4">รายละเอียดแต่ละสาเหตุ</h3>
          <div className="space-y-4">
            {profile.causes.map(c => (
              <div key={c.id} className="pl-3 border-l-3 rounded" style={{ borderLeftColor: c.color, borderLeftWidth: 3 }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold" style={{ color: c.color }}>{c.contribution}%</span>
                  <span className="text-sm font-semibold text-navy-800">{c.name}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cause Matrix */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <h3 className="text-navy-800 font-semibold text-sm">เมทริกซ์สาเหตุ × ประเภทพื้นที่</h3>
          <p className="text-xs text-gray-400 mt-0.5">ความสัมพันธ์ระหว่างสาเหตุ PM2.5 และลักษณะพื้นที่</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-navy-950">
                <th className="px-4 py-3 text-left text-navy-300 font-semibold">สาเหตุ</th>
                {causeMatrix.columns.map(col => (
                  <th key={col} className="px-4 py-3 text-center text-navy-300 font-semibold">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {causeMatrix.rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 font-medium text-navy-700">{row}</td>
                  {causeMatrix.data[ri].map((cell, ci) => {
                    const cfg = MATRIX_LABELS[cell] || MATRIX_LABELS['none'];
                    return (
                      <td key={ci} className="px-4 py-3 text-center">
                        <span
                          className="px-2.5 py-1 rounded text-xs font-semibold"
                          style={{ backgroundColor: cfg.bg, color: cfg.color }}
                        >
                          {cfg.label}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400">⚠️ ข้อมูลจำลองสำหรับต้นแบบ — ตัวเลขสัดส่วนเป็นค่าประมาณ</p>
    </div>
  );
}
