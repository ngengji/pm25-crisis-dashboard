import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine,
} from 'recharts';
import SectionHeader from '../components/SectionHeader';
import ThailandMap from '../components/ThailandMap';
import { provinces, regionSummary } from '../data/severity';
import type { Region, RiskLevel } from '../types';

const RISK_LABEL: Record<RiskLevel, string> = {
  critical: 'วิกฤต',
  high:     'สูง',
  medium:   'ปานกลาง',
  low:      'ต่ำ',
};
const RISK_COLOR: Record<RiskLevel, string> = {
  critical: 'bg-red-100 text-red-700 border-red-300',
  high:     'bg-orange-100 text-orange-700 border-orange-300',
  medium:   'bg-yellow-100 text-yellow-700 border-yellow-300',
  low:      'bg-green-100 text-green-700 border-green-300',
};
const RISK_BAR_COLOR: Record<RiskLevel, string> = {
  critical: '#dc2626',
  high:     '#f97316',
  medium:   '#eab308',
  low:      '#16a34a',
};

export default function SeveritySection() {
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | 'all'>('all');
  const [sortBy, setSortBy] = useState<'avgPM25' | 'daysExceeded'>('avgPM25');

  // When a province is selected on the map, also derive its region
  const handleMapSelect = (id: string | null) => {
    setSelectedProvinceId(id);
    if (id) {
      const prov = provinces.find(p => p.id === id);
      if (prov) setSelectedRegion(prov.region);
    } else {
      setSelectedRegion('all');
    }
  };

  // Filter: region first, then province if selected on map
  const filtered = provinces
    .filter(p => {
      if (selectedProvinceId) return p.id === selectedProvinceId;
      if (selectedRegion !== 'all') return p.region === selectedRegion;
      return true;
    })
    .sort((a, b) => b[sortBy] - a[sortBy]);

  const selectedProvince = selectedProvinceId
    ? provinces.find(p => p.id === selectedProvinceId)
    : null;

  return (
    <div className="space-y-8">
      <SectionHeader
        number="02"
        title="พื้นที่และระดับความรุนแรง"
        subtitle="การกระจายตัวของ PM2.5 ตามภูมิภาคและจังหวัด เพื่อระบุพื้นที่เร่งด่วน"
        keyMessage="ภาคเหนือมีความรุนแรงสูงสุดอย่างชัดเจน แต่กรุงเทพฯ/ปริมณฑลมีประชากรเสี่ยงมากที่สุดในแง่จำนวน"
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ── Left: Thailand Map ──────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-navy-800 font-semibold text-sm">แผนที่ความรุนแรง PM2.5</h3>
                <p className="text-navy-400 text-xs mt-0.5">ค่าเฉลี่ยรายปี ปี 2566</p>
              </div>
              {selectedProvinceId && (
                <button
                  onClick={() => { setSelectedProvinceId(null); setSelectedRegion('all'); }}
                  className="text-xs text-accent-600 hover:text-accent-800 font-medium border border-accent-200 px-2 py-1 rounded"
                >
                  ล้างตัวกรอง
                </button>
              )}
            </div>

            <ThailandMap
              selectedId={selectedProvinceId}
              onSelect={handleMapSelect}
              highlightRegion={selectedRegion !== 'all' && !selectedProvinceId ? selectedRegion : null}
            />
          </div>

          {/* Region filter chips */}
          <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 mb-2">กรองตามภาค</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { setSelectedRegion('all'); setSelectedProvinceId(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedRegion === 'all' && !selectedProvinceId
                    ? 'bg-navy-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                ทุกภาค
              </button>
              {regionSummary.map(r => (
                <button
                  key={r.id}
                  onClick={() => {
                    setSelectedRegion(selectedRegion === r.id ? 'all' : r.id as Region);
                    setSelectedProvinceId(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedRegion === r.id && !selectedProvinceId
                      ? 'bg-navy-800 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {r.label.split('/')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Region summary cards */}
          <div className="space-y-2">
            {regionSummary.map(r => (
              <div
                key={r.id}
                onClick={() => {
                  setSelectedRegion(r.id as Region);
                  setSelectedProvinceId(null);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer hover:shadow-sm ${
                  selectedRegion === r.id && !selectedProvinceId
                    ? 'border-navy-400 bg-navy-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-navy-800">{r.label}</p>
                  <span className={`text-xs px-1.5 py-0.5 rounded border ${RISK_COLOR[r.riskLevel]}`}>
                    {RISK_LABEL[r.riskLevel]}
                  </span>
                </div>
                <div className="mt-1.5 flex gap-3">
                  <span className="text-xs text-gray-500">
                    เฉลี่ย <b className="text-navy-800">{r.avgPM25}</b> μg/m³
                  </span>
                  <span className="text-xs text-gray-500">
                    เกิน <b className="text-navy-800">{r.daysExceeded}</b> วัน
                  </span>
                  <span className="text-xs text-gray-500">
                    <b className="text-navy-800">{r.provinces}</b> จังหวัด
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Charts + Table ───────────────────────────────────── */}
        <div className="lg:col-span-3 space-y-5">

          {/* Selected province spotlight */}
          {selectedProvince && (
            <div
              className="rounded-xl border p-4"
              style={{
                borderColor: RISK_BAR_COLOR[selectedProvince.riskLevel] + '60',
                backgroundColor: RISK_BAR_COLOR[selectedProvince.riskLevel] + '0C',
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-navy-900">{selectedProvince.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded border ${RISK_COLOR[selectedProvince.riskLevel]}`}>
                      {RISK_LABEL[selectedProvince.riskLevel]}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{selectedProvince.regionLabel}</p>
                </div>
                <button
                  onClick={() => { setSelectedProvinceId(null); setSelectedRegion('all'); }}
                  className="text-gray-400 hover:text-gray-600 text-lg"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                {[
                  { label: 'PM2.5 เฉลี่ย', value: `${selectedProvince.avgPM25}`, unit: 'μg/m³' },
                  { label: 'สูงสุด', value: `${selectedProvince.maxPM25}`, unit: 'μg/m³' },
                  { label: 'วันเกินมาตรฐาน', value: `${selectedProvince.daysExceeded}`, unit: 'วัน' },
                  { label: 'ประชากร', value: `${(selectedProvince.population / 1e6).toFixed(1)}`, unit: 'ล้านคน' },
                ].map(stat => (
                  <div key={stat.label} className="bg-white rounded-lg p-3 border border-gray-100">
                    <p className="text-xs text-gray-500">{stat.label}</p>
                    <p className="text-xl font-bold text-navy-900">{stat.value}
                      <span className="text-xs font-normal text-gray-400 ml-1">{stat.unit}</span>
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                ช่วงวิกฤตสูงสุด: <span className="font-semibold text-navy-700">{selectedProvince.peakMonth}</span>
                {' · '}ประเภทพื้นที่: <span className="font-semibold text-navy-700">{selectedProvince.areaType}</span>
              </p>
            </div>
          )}

          {/* Bar Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h3 className="text-navy-800 font-semibold text-sm">
                ค่า PM2.5 แยกจังหวัด
                {selectedRegion !== 'all' && !selectedProvinceId && (
                  <span className="ml-2 text-accent-600">
                    — {regionSummary.find(r => r.id === selectedRegion)?.label}
                  </span>
                )}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy('avgPM25')}
                  className={`px-3 py-1 text-xs rounded ${sortBy === 'avgPM25' ? 'bg-navy-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  เฉลี่ย PM2.5
                </button>
                <button
                  onClick={() => setSortBy('daysExceeded')}
                  className={`px-3 py-1 text-xs rounded ${sortBy === 'daysExceeded' ? 'bg-navy-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  วันเกินมาตรฐาน
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={filtered.slice(0, 12)}
                margin={{ left: -10, right: 8, bottom: 38, top: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: '#475569' }}
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  formatter={(v: unknown) => [
                    `${v} ${sortBy === 'avgPM25' ? 'μg/m³' : 'วัน'}`,
                    sortBy === 'avgPM25' ? 'PM2.5 เฉลี่ย' : 'วันเกินมาตรฐาน',
                  ]}
                  contentStyle={{ fontSize: '12px' }}
                />
                {sortBy === 'avgPM25' && (
                  <ReferenceLine y={37.5} stroke="#dc2626" strokeDasharray="4 4" strokeWidth={1.5}
                    label={{ value: '37.5 มาตรฐาน', fontSize: 9, fill: '#dc2626', position: 'insideTopRight' }}
                  />
                )}
                <Bar dataKey={sortBy} radius={[3, 3, 0, 0]}>
                  {filtered.slice(0, 12).map((p, i) => (
                    <Cell key={i} fill={p.id === selectedProvinceId ? RISK_BAR_COLOR[p.riskLevel] : RISK_BAR_COLOR[p.riskLevel]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Province Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-navy-800 font-semibold text-sm">รายละเอียดแยกจังหวัด</h3>
              <span className="text-xs text-gray-400">{filtered.length} จังหวัด</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-2.5 text-left text-navy-600 font-semibold">จังหวัด</th>
                    <th className="px-4 py-2.5 text-left text-navy-600 font-semibold">ภาค</th>
                    <th className="px-4 py-2.5 text-right text-navy-600 font-semibold">PM2.5 เฉลี่ย</th>
                    <th className="px-4 py-2.5 text-right text-navy-600 font-semibold">สูงสุด</th>
                    <th className="px-4 py-2.5 text-right text-navy-600 font-semibold">วันเกิน</th>
                    <th className="px-4 py-2.5 text-right text-navy-600 font-semibold">ประชากร</th>
                    <th className="px-4 py-2.5 text-center text-navy-600 font-semibold">ระดับ</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <tr
                      key={p.id}
                      onClick={() => handleMapSelect(selectedProvinceId === p.id ? null : p.id)}
                      className={`border-b border-gray-50 cursor-pointer transition-colors ${
                        p.id === selectedProvinceId
                          ? 'bg-navy-50'
                          : i % 2 === 0 ? 'hover:bg-gray-50' : 'bg-gray-50/50 hover:bg-gray-100'
                      }`}
                    >
                      <td className="px-4 py-2.5 font-semibold text-navy-800">{p.name}</td>
                      <td className="px-4 py-2.5 text-gray-500">{p.regionLabel}</td>
                      <td className="px-4 py-2.5 text-right font-bold" style={{ color: RISK_BAR_COLOR[p.riskLevel] }}>
                        {p.avgPM25}
                      </td>
                      <td className="px-4 py-2.5 text-right text-gray-600">{p.maxPM25}</td>
                      <td className="px-4 py-2.5 text-right text-gray-600">{p.daysExceeded}</td>
                      <td className="px-4 py-2.5 text-right text-gray-600">
                        {(p.population / 1_000_000).toFixed(1)} ล้าน
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={`px-2 py-0.5 rounded border text-xs ${RISK_COLOR[p.riskLevel]}`}>
                          {RISK_LABEL[p.riskLevel]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400">
        ⚠️ ข้อมูลจำลองสำหรับต้นแบบ — แผนที่ใช้ขอบเขตจังหวัดจาก apisit/thailand.json
      </p>
    </div>
  );
}
