import type { KPI, TrendPoint } from '../types';

// ─── KPI Cards ──────────────────────────────────────────────────────────────
// ข้อมูลจำลองอ้างอิงจากรายงานคุณภาพอากาศปี 2566 — ใช้เพื่อการนำเสนอต้นแบบเท่านั้น

export const kpis: KPI[] = [
  {
    id: 'days_exceeded',
    label: 'วันที่ PM2.5 เกินมาตรฐาน',
    value: '127',
    unit: 'วัน',
    sublabel: 'เฉลี่ยทั่วประเทศ ปี 2566',
    trend: 'up',
    trendLabel: '+18% จากปี 2565',
    severity: 'critical',
    icon: 'Calendar',
  },
  {
    id: 'provinces_at_risk',
    label: 'จังหวัดที่เสี่ยงสูงหรือวิกฤต',
    value: '38',
    unit: 'จังหวัด',
    sublabel: 'จาก 77 จังหวัดทั่วประเทศ',
    trend: 'up',
    trendLabel: '+5 จากปี 2565',
    severity: 'critical',
    icon: 'MapPin',
  },
  {
    id: 'population_affected',
    label: 'ประชาชนที่ได้รับผลกระทบ',
    value: '18.4',
    unit: 'ล้านคน',
    sublabel: 'ในช่วงวิกฤตมีนาคม–เมษายน 2566',
    trend: 'up',
    trendLabel: '+12% จากปี 2565',
    severity: 'high',
    icon: 'Users',
  },
  {
    id: 'peak_pm25',
    label: 'ค่า PM2.5 สูงสุดที่บันทึกได้',
    value: '312.5',
    unit: 'μg/m³',
    sublabel: 'เชียงใหม่ มีนาคม 2566',
    trend: 'up',
    trendLabel: '8.3× เกินมาตรฐาน',
    severity: 'critical',
    icon: 'AlertTriangle',
  },
  {
    id: 'economic_damage',
    label: 'มูลค่าความเสียหายโดยประมาณ',
    value: '72',
    unit: 'พันล้านบาท',
    sublabel: 'รวมด้านสุขภาพและการท่องเที่ยว',
    trend: 'up',
    trendLabel: 'ประมาณการเบื้องต้น',
    severity: 'high',
    icon: 'TrendingUp',
  },
];

// ─── Monthly PM2.5 Trend 2023 (μg/m³) ───────────────────────────────────────
// ค่าเฉลี่ยรายเดือนแยกตามภาค (ข้อมูลจำลอง)

export const trendData: TrendPoint[] = [
  { month: 'ม.ค.',   north: 82,  central: 46, northeast: 42, east: 28, south: 18, standard: 37.5, who: 15 },
  { month: 'ก.พ.',   north: 118, central: 62, northeast: 55, east: 32, south: 20, standard: 37.5, who: 15 },
  { month: 'มี.ค.',  north: 198, central: 78, northeast: 72, east: 38, south: 22, standard: 37.5, who: 15 },
  { month: 'เม.ย.',  north: 145, central: 68, northeast: 82, east: 35, south: 25, standard: 37.5, who: 15 },
  { month: 'พ.ค.',   north: 62,  central: 44, northeast: 55, east: 30, south: 20, standard: 37.5, who: 15 },
  { month: 'มิ.ย.',  north: 24,  central: 34, northeast: 28, east: 22, south: 18, standard: 37.5, who: 15 },
  { month: 'ก.ค.',   north: 15,  central: 26, northeast: 20, east: 18, south: 16, standard: 37.5, who: 15 },
  { month: 'ส.ค.',   north: 12,  central: 22, northeast: 18, east: 16, south: 14, standard: 37.5, who: 15 },
  { month: 'ก.ย.',   north: 18,  central: 28, northeast: 22, east: 18, south: 16, standard: 37.5, who: 15 },
  { month: 'ต.ค.',   north: 35,  central: 38, northeast: 32, east: 24, south: 18, standard: 37.5, who: 15 },
  { month: 'พ.ย.',   north: 55,  central: 52, northeast: 42, east: 30, south: 20, standard: 37.5, who: 15 },
  { month: 'ธ.ค.',   north: 68,  central: 55, northeast: 48, east: 32, south: 22, standard: 37.5, who: 15 },
];

// ─── Executive Summary ────────────────────────────────────────────────────────
export const executiveSummary = {
  headline: 'วิกฤต PM2.5 ประเทศไทย ปี 2566',
  subheadline: 'ฝุ่นละอองขนาดเล็กสะสมเกินมาตรฐาน 127 วัน ส่งผลกระทบต่อสุขภาพ เศรษฐกิจ และคุณภาพชีวิตของประชาชนกว่า 18 ล้านคน',
  keyPoints: [
    'ภาคเหนือเผชิญวิกฤตรุนแรงที่สุด โดยเชียงใหม่มีค่า PM2.5 สูงสุดถึง 312.5 μg/m³ ในเดือนมีนาคม 2566',
    'ปัญหาเกิดจากหลายสาเหตุที่แตกต่างกันตามพื้นที่ ทั้งไฟป่า เผาเกษตร มลพิษจากยานพาหนะ และหมอกควันข้ามแดน',
    'การแก้ไขต้องใช้มาตรการเฉพาะพื้นที่ (area-specific) ไม่สามารถใช้นโยบายเดียวสำหรับทุกพื้นที่',
    'หลักฐานวิจัยมีอยู่ในบางประเด็น แต่ยังขาดการเชื่อมโยงกับแผนนโยบายและการนำไปใช้จริงอย่างเป็นระบบ',
    'แผน ววน. 2566–2570 มีกรอบที่สอดคล้องกับการแก้ปัญหา PM2.5 แต่ต้องการการกำหนดเป้าหมายวิจัยที่ชัดเจนขึ้น',
  ],
  decisionCall: 'ผู้บริหารต้องพิจารณาจัดสรรงบวิจัยและนโยบายที่ตรงกับสาเหตุเฉพาะพื้นที่ และสร้างระบบติดตามผลที่เชื่อมโยงกับการตัดสินใจเชิงนโยบาย',
};
