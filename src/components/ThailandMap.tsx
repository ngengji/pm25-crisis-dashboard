/**
 * ThailandMap — Choropleth map of Thailand provinces
 * Fetches GeoJSON manually so we can inspect actual property names,
 * then colours each province by PM2.5 risk level.
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { provinces } from '../data/severity';
import type { ProvinceSeverity, RiskLevel } from '../types';

// ─── GeoJSON source ────────────────────────────────────────────────────────
const GEO_URL = 'https://cdn.jsdelivr.net/gh/apisit/thailand.json@master/thailand.json';

// ─── Colour palettes ──────────────────────────────────────────────────────
const RISK_FILL: Record<RiskLevel, string> = {
  critical: '#fca5a5',
  high:     '#fdba74',
  medium:   '#fde68a',
  low:      '#bbf7d0',
};
const RISK_FILL_HOVER: Record<RiskLevel, string> = {
  critical: '#ef4444',
  high:     '#f97316',
  medium:   '#eab308',
  low:      '#22c55e',
};
const RISK_FILL_SELECTED: Record<RiskLevel, string> = {
  critical: '#dc2626',
  high:     '#ea580c',
  medium:   '#ca8a04',
  low:      '#16a34a',
};
const RISK_STROKE: Record<RiskLevel, string> = {
  critical: '#b91c1c',
  high:     '#c2410c',
  medium:   '#a16207',
  low:      '#15803d',
};
const RISK_LABEL: Record<RiskLevel, string> = {
  critical: 'วิกฤต',
  high:     'สูง',
  medium:   'ปานกลาง',
  low:      'ต่ำ',
};

// ─── Fast lookup maps ──────────────────────────────────────────────────────
const BY_CODE = new Map<number, ProvinceSeverity>(provinces.map(p => [p.provCode, p]));
const BY_NAME = new Map<string, ProvinceSeverity>(provinces.map(p => [p.name, p]));
const BY_ID   = new Map<string, ProvinceSeverity>(provinces.map(p => [p.id, p]));

// ─── English → province ID mapping (ADM1_EN / NAME_1 fallback) ────────────
// Covers all 77 provinces; immune to Thai encoding issues
const EN_TO_ID: Record<string, string> = {
  'Bangkok': 'bangkok', 'Samut Prakan': 'samutprakan',
  'Nonthaburi': 'nonthaburi', 'Pathum Thani': 'pathumthani',
  'Phra Nakhon Si Ayutthaya': 'ayutthaya', 'Ang Thong': 'angthong',
  'Lop Buri': 'lopburi', 'Sing Buri': 'singburi',
  'Chai Nat': 'chainat', 'Saraburi': 'saraburi',
  'Chon Buri': 'chonburi', 'Rayong': 'rayong',
  'Chanthaburi': 'chanthaburi', 'Trat': 'trat',
  'Chachoengsao': 'chachoengsao', 'Prachin Buri': 'prachinburi',
  'Nakhon Nayok': 'nakhonnayok', 'Sa Kaeo': 'sakaeo',
  'Nakhon Ratchasima': 'nakhonratchasima', 'Buri Ram': 'buriram',
  'Surin': 'surin', 'Si Sa Ket': 'sisaket',
  'Ubon Ratchathani': 'ubonratchathani', 'Yasothon': 'yasothon',
  'Chaiyaphum': 'chaiyaphum', 'Amnat Charoen': 'amnatcharoen',
  'Bueng Kan': 'buengkan', 'Nong Bua Lam Phu': 'nongbualamphu',
  'Khon Kaen': 'khonkaen', 'Udon Thani': 'udonthani',
  'Loei': 'loei', 'Nong Khai': 'nongkhai',
  'Maha Sarakham': 'mahasarakham', 'Roi Et': 'roiet',
  'Kalasin': 'kalasin', 'Sakon Nakhon': 'sakonnakhon',
  'Nakhon Phanom': 'nakhonphanom', 'Mukdahan': 'mukdahan',
  'Chiang Mai': 'chiangmai', 'Lamphun': 'lamphun',
  'Lampang': 'lampang', 'Uttaradit': 'uttaradit',
  'Phrae': 'phrae', 'Nan': 'nan',
  'Phayao': 'phayao', 'Chiang Rai': 'chiangrai',
  'Mae Hong Son': 'maehongson', 'Nakhon Sawan': 'nakhonsawan',
  'Uthai Thani': 'uthaithani', 'Kamphaeng Phet': 'kamphaengphet',
  'Tak': 'tak', 'Sukhothai': 'sukhothai',
  'Phitsanulok': 'phitsanulok', 'Phichit': 'phichit',
  'Phetchabun': 'phetchabun', 'Ratchaburi': 'ratchaburi',
  'Kanchanaburi': 'kanchanaburi', 'Suphan Buri': 'suphanburi',
  'Nakhon Pathom': 'nakhonpathom', 'Samut Sakhon': 'samutsakhon',
  'Samut Songkhram': 'samutsongkhram', 'Phetchaburi': 'phetchaburi',
  'Prachuap Khiri Khan': 'prachuapkhirikhan',
  'Nakhon Si Thammarat': 'nakhonsithammarat',
  'Krabi': 'krabi', 'Phangnga': 'phangnga',
  'Phuket': 'phuket', 'Surat Thani': 'suratthani',
  'Ranong': 'ranong', 'Chumphon': 'chumphon',
  'Songkhla': 'songkhla', 'Satun': 'satun',
  'Trang': 'trang', 'Phatthalung': 'phatthalung',
  'Pattani': 'pattani', 'Yala': 'yala',
  'Narathiwat': 'narathiwat',
};

// ─── Province lookup — tries every property strategy ──────────────────────
function lookupProvince(props: Record<string, unknown>): ProvinceSeverity | undefined {
  // 1. Numeric province code (PROV_CODE, prov_code, CC_1, etc.)
  const codeRaw = props['PROV_CODE'] ?? props['prov_code'] ??
                  props['CC_1'] ?? props['ADM1_PCODE'];
  if (codeRaw != null) {
    const n = typeof codeRaw === 'number'
      ? codeRaw
      : parseInt(String(codeRaw).replace(/\D/g, ''), 10);
    if (!isNaN(n)) {
      const hit = BY_CODE.get(n);
      if (hit) return hit;
    }
  }

  // 2. Thai name fields (PROV_NAMT, NAME_TH, NL_NAME_1, nameTH, name)
  const thaiCandidates = [
    props['PROV_NAMT'], props['NAME_TH'], props['NL_NAME_1'],
    props['name_th'],   props['nameTH'],
  ];
  for (const raw of thaiCandidates) {
    if (!raw) continue;
    const name = String(raw).trim();
    let hit = BY_NAME.get(name);
    if (hit) return hit;
    // strip "จ." prefix
    hit = BY_NAME.get(name.replace(/^จ\.?\s*/, ''));
    if (hit) return hit;
    // substring
    hit = provinces.find(p => p.name.includes(name) || name.includes(p.name));
    if (hit) return hit;
  }

  // 3. English name fields (ADM1_EN, NAME_1, name)
  const engCandidates = [props['ADM1_EN'], props['NAME_1'], props['name']];
  for (const raw of engCandidates) {
    if (!raw) continue;
    const eng = String(raw).trim();
    const id = EN_TO_ID[eng];
    if (id) {
      const hit = BY_ID.get(id);
      if (hit) return hit;
    }
    // partial English match
    const hit = Object.entries(EN_TO_ID).find(
      ([k]) => eng.includes(k) || k.includes(eng),
    );
    if (hit) return BY_ID.get(hit[1]);
  }

  return undefined;
}

// Extract display name for tooltip
function getDisplayName(props: Record<string, unknown>): string {
  return String(
    props['PROV_NAMT'] ?? props['NAME_TH'] ?? props['NL_NAME_1'] ??
    props['ADM1_EN']   ?? props['NAME_1']  ?? props['name'] ?? '',
  ).trim();
}

// ─── Tooltip state ────────────────────────────────────────────────────────
interface TooltipState {
  visible: boolean;
  x: number; y: number;
  displayName: string;
  data: ProvinceSeverity | null;
}

interface Props {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  highlightRegion?: string | null;
}

export default function ThailandMap({ selectedId, onSelect, highlightRegion }: Props) {
  // ── เปิดมาที่ zoom 150% ──────────────────────────────────────────────────
  const [zoom, setZoom] = useState(1.5);

  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false, x: 0, y: 0, displayName: '', data: null,
  });

  // Debug: inspect first feature's properties to confirm which keys are present
  const [matchedCount, setMatchedCount] = useState<number | null>(null);
  const [sampleProps, setSampleProps] = useState<string>('');

  useEffect(() => {
    fetch(GEO_URL)
      .then(r => r.json())
      .then((geo: { features?: { properties: Record<string, unknown> }[] }) => {
        if (!geo.features?.length) return;
        // Log first feature's properties for debug
        setSampleProps(Object.keys(geo.features[0].properties).join(' · '));
        // Count how many provinces we can match
        const matched = geo.features.filter(
          f => lookupProvince(f.properties) !== undefined,
        ).length;
        setMatchedCount(matched);
      })
      .catch(() => {/* silently ignore in production */});
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent, displayName: string, data: ProvinceSeverity | null) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setTooltip({
        visible: true,
        x: e.clientX - rect.left + 12,
        y: e.clientY - rect.top - 8,
        displayName, data,
      });
    }, [],
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || !tooltip.visible) return;
    setTooltip(prev => ({
      ...prev,
      x: e.clientX - rect.left + 12,
      y: e.clientY - rect.top - 8,
    }));
  }, [tooltip.visible]);

  const handleMouseLeave = useCallback(() => {
    setTooltip(prev => ({ ...prev, visible: false }));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Map */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [101.0, 13.5], scale: 2300 }}
        width={380}
        height={560}
        style={{ width: '100%', height: 'auto' }}
      >
        <ZoomableGroup
          zoom={zoom}
          center={[101.0, 13.5]}
          minZoom={1}
          maxZoom={8}
          onMoveEnd={({ zoom: z }) => setZoom(z)}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map(geo => {
                const props = geo.properties as Record<string, unknown>;
                const data  = lookupProvince(props);
                const name  = getDisplayName(props);
                const isSelected = data?.id === selectedId;
                const isFaded = highlightRegion != null && data != null
                  && data.region !== highlightRegion;

                // Colour logic
                let fill        = '#dde3ed';   // unmatched → neutral blue-gray
                let stroke      = '#c4cdd9';
                let strokeWidth = 0.3 / zoom;  // thin lines scale with zoom

                if (data) {
                  fill        = isSelected ? RISK_FILL_SELECTED[data.riskLevel] : RISK_FILL[data.riskLevel];
                  stroke      = RISK_STROKE[data.riskLevel];
                  strokeWidth = (isSelected ? 1.2 : 0.5) / zoom;
                }

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    opacity={isFaded ? 0.25 : 1}
                    style={{
                      default: { outline: 'none', cursor: data ? 'pointer' : 'default' },
                      hover: {
                        outline: 'none',
                        fill: data
                          ? (isSelected ? RISK_FILL_SELECTED[data.riskLevel] : RISK_FILL_HOVER[data.riskLevel])
                          : '#c8d2de',
                        strokeWidth: 0.8 / zoom,
                        cursor: data ? 'pointer' : 'default',
                      },
                      pressed: { outline: 'none' },
                    }}
                    onMouseEnter={e => handleMouseEnter(e as React.MouseEvent, name, data ?? null)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => { if (data) onSelect(isSelected ? null : data.id); }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="pointer-events-none absolute z-50 bg-white border border-gray-200 shadow-xl rounded-lg p-3 text-xs min-w-[180px]"
          style={{ left: Math.min(tooltip.x, 210), top: Math.max(tooltip.y, 4) }}
        >
          {tooltip.data ? (
            <>
              <p className="font-bold text-navy-900 text-sm mb-2">{tooltip.data.name}</p>
              <div className="space-y-1.5">
                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">PM2.5 เฉลี่ย</span>
                  <span className="font-semibold text-navy-800">{tooltip.data.avgPM25} μg/m³</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">สูงสุด</span>
                  <span className="font-semibold text-navy-800">{tooltip.data.maxPM25} μg/m³</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">วันเกินมาตรฐาน</span>
                  <span className="font-semibold text-navy-800">{tooltip.data.daysExceeded} วัน</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">ช่วงวิกฤต</span>
                  <span className="font-semibold text-navy-800">{tooltip.data.peakMonth}</span>
                </div>
                <div className="pt-1 border-t border-gray-100 flex justify-between gap-3">
                  <span className="text-gray-500">ระดับ</span>
                  <span className="font-bold" style={{ color: RISK_FILL_SELECTED[tooltip.data.riskLevel] }}>
                    {RISK_LABEL[tooltip.data.riskLevel]}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-500">{tooltip.displayName || 'จังหวัด'}</p>
          )}
        </div>
      )}

      {/* Zoom controls */}
      <div className="absolute bottom-3 right-3 flex flex-col gap-1">
        <button onClick={() => setZoom(z => Math.min(z * 1.4, 8))}
          className="w-7 h-7 rounded bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-bold shadow-sm flex items-center justify-center">+</button>
        <button onClick={() => setZoom(z => Math.max(z / 1.4, 1))}
          className="w-7 h-7 rounded bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-bold shadow-sm flex items-center justify-center">−</button>
        <button onClick={() => setZoom(1.5)}
          className="w-7 h-7 rounded bg-white border border-gray-300 text-gray-400 hover:bg-gray-50 text-xs shadow-sm flex items-center justify-center" title="รีเซ็ต">⤢</button>
      </div>

      {/* Legend */}
      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 p-2.5 shadow-sm">
        <p className="text-xs font-semibold text-gray-600 mb-1.5">ระดับ PM2.5 เฉลี่ย</p>
        {([
          ['critical', 'วิกฤต  >60 μg'],
          ['high',     'สูง    40–60 μg'],
          ['medium',   'ปานกลาง 25–40 μg'],
          ['low',      'ต่ำ    <25 μg'],
        ] as const).map(([level, label]) => (
          <div key={level} className="flex items-center gap-1.5 mb-0.5">
            <div className="w-3 h-3 rounded-sm border flex-shrink-0"
              style={{ backgroundColor: RISK_FILL[level], borderColor: RISK_STROKE[level] }} />
            <span className="text-xs text-gray-600">{label}</span>
          </div>
        ))}
      </div>

      {/* Debug: show matched count and property keys (small, unobtrusive) */}
      {matchedCount !== null && (
        <div className="absolute bottom-3 left-2 bg-black/60 text-white rounded px-2 py-1 text-xs max-w-[180px]">
          <span className={matchedCount > 50 ? 'text-green-400' : 'text-amber-400'}>
            ✓ {matchedCount}/77 จังหวัด
          </span>
          {matchedCount < 10 && sampleProps && (
            <p className="text-gray-300 mt-0.5 break-all text-[10px]">keys: {sampleProps}</p>
          )}
        </div>
      )}

      <p className="text-center text-gray-400 text-xs mt-1">คลิกจังหวัดเพื่อกรอง · เลื่อน/ซูมได้</p>
    </div>
  );
}
