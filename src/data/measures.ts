import type { Measure } from '../types';

// ─── Measures Library ────────────────────────────────────────────────────────
// ฐานข้อมูลมาตรการตัวอย่างสำหรับต้นแบบ

export const measures: Measure[] = [
  // ── Prevention (การป้องกัน) ──────────────────────────────────────────
  {
    id: 'M01',
    name: 'ระบบตรวจสอบและเฝ้าระวัง PM2.5 แบบเรียลไทม์',
    category: 'prevention',
    relatedCauses: ['wildfire', 'transboundary', 'vehicles', 'industry'],
    areaTypes: ['forest', 'urban', 'agricultural', 'border'],
    description:
      'พัฒนาโครงข่ายสถานีวัดคุณภาพอากาศและระบบเซ็นเซอร์ต้นทุนต่ำสำหรับชุมชน เชื่อมโยงกับแพลตฟอร์มแสดงผลแบบ real-time เพื่อใช้ตัดสินใจเชิงนโยบายและแจ้งเตือนประชาชน',
    implementingAgency: 'กรมควบคุมมลพิษ, NECTEC, อปท.',
    effectiveness: 'high',
    timeframe: 'short',
    timeframeLabel: 'ระยะสั้น (1–2 ปี)',
  },
  {
    id: 'M02',
    name: 'ระบบพยากรณ์และแจ้งเตือนล่วงหน้า Hotspot ไฟป่า',
    category: 'prevention',
    relatedCauses: ['wildfire', 'transboundary'],
    areaTypes: ['forest', 'border'],
    description:
      'ใช้ข้อมูลดาวเทียม AI และแบบจำลองสภาพอากาศเพื่อพยากรณ์จุด Hotspot ล่วงหน้า 3–7 วัน ช่วยให้หน่วยงานเตรียมพร้อมก่อนเกิดเหตุ',
    implementingAgency: 'GISTDA, กรมอุตุนิยมวิทยา, กรมอุทยานฯ',
    effectiveness: 'high',
    timeframe: 'short',
    timeframeLabel: 'ระยะสั้น (1–2 ปี)',
  },
  {
    id: 'M03',
    name: 'บังคับใช้กฎหมายห้ามเผาในที่โล่งและการเผาตอซัง',
    category: 'prevention',
    relatedCauses: ['wildfire', 'rice_stubble', 'sugarcane', 'corn', 'highland_agriculture'],
    areaTypes: ['forest', 'agricultural'],
    description:
      'กำหนดช่วงเวลาห้ามเผา (Burning Ban Period) พร้อมมาตรการบังคับใช้ที่มีประสิทธิภาพ ผ่านการใช้ภาพถ่ายดาวเทียมตรวจสอบและบทลงโทษที่ชัดเจน',
    implementingAgency: 'กระทรวงทรัพยากรฯ, กรมส่งเสริมการเกษตร, ตำรวจ',
    effectiveness: 'medium',
    timeframe: 'immediate',
    timeframeLabel: 'เร่งด่วน (ทันที)',
  },
  {
    id: 'M04',
    name: 'โครงการเกษตรทางเลือกลดการเผา',
    category: 'prevention',
    relatedCauses: ['rice_stubble', 'sugarcane', 'corn', 'highland_agriculture'],
    areaTypes: ['agricultural', 'forest'],
    description:
      'ส่งเสริมเทคโนโลยีไถกลบตอซัง การผลิตปุ๋ยอินทรีย์ การสับหน้าดิน และการเกษตรอินทรีย์ เป็นทางเลือกทดแทนการเผา พร้อมสนับสนุนทางการเงิน',
    implementingAgency: 'กรมส่งเสริมการเกษตร, มหาวิทยาลัยเกษตรศาสตร์, อปท.',
    effectiveness: 'high',
    timeframe: 'medium',
    timeframeLabel: 'ระยะกลาง (2–4 ปี)',
  },
  {
    id: 'M05',
    name: 'มาตรฐานการปล่อยมลพิษยานพาหนะและอุตสาหกรรม',
    category: 'prevention',
    relatedCauses: ['vehicles', 'industry'],
    areaTypes: ['urban'],
    description:
      'ยกระดับมาตรฐานไอเสียรถยนต์สู่ Euro 6 เพิ่มความถี่การตรวจสภาพรถ และกำหนดค่ามาตรฐานการปล่อยมลพิษจากโรงงานที่เข้มงวดขึ้น',
    implementingAgency: 'กระทรวงอุตสาหกรรม, กรมขนส่งทางบก, กรมควบคุมมลพิษ',
    effectiveness: 'high',
    timeframe: 'long',
    timeframeLabel: 'ระยะยาว (4+ ปี)',
  },
  {
    id: 'M06',
    name: 'การจัดการเชื้อเพลิงในป่า (Prescribed Burning)',
    category: 'prevention',
    relatedCauses: ['wildfire'],
    areaTypes: ['forest'],
    description:
      'การเผาเชิงป้องกันแบบควบคุมในช่วงฤดูฝน เพื่อลดปริมาณเชื้อเพลิงสะสม ร่วมกับการสร้างแนวกันไฟโดยชุมชน',
    implementingAgency: 'กรมอุทยานฯ, กรมป่าไม้, ชุมชน',
    effectiveness: 'medium',
    timeframe: 'medium',
    timeframeLabel: 'ระยะกลาง (2–4 ปี)',
  },

  // ── Response / Mitigation (การรับมือ) ───────────────────────────────
  {
    id: 'M07',
    name: 'ศูนย์บัญชาการเหตุฉุกเฉิน PM2.5 (EOC)',
    category: 'response',
    relatedCauses: ['wildfire', 'transboundary', 'cross_border_haze'],
    areaTypes: ['forest', 'border'],
    description:
      'จัดตั้งศูนย์บัญชาการร่วมระดับจังหวัด/ระดับชาติ สำหรับประสานงานการดับไฟป่าและตอบสนองวิกฤต PM2.5 อย่างบูรณาการ',
    implementingAgency: 'กรมป้องกันและบรรเทาสาธารณภัย, จังหวัด',
    effectiveness: 'high',
    timeframe: 'immediate',
    timeframeLabel: 'เร่งด่วน (ทันที)',
  },
  {
    id: 'M08',
    name: 'มาตรการจำกัดยานพาหนะในเมือง (WFH / Odd-Even)',
    category: 'response',
    relatedCauses: ['vehicles', 'atmospheric'],
    areaTypes: ['urban'],
    description:
      'มาตรการฉุกเฉินในช่วงวิกฤต เช่น การอนุญาตให้ทำงานจากที่บ้าน การจำกัดเวลาเข้าออกรถ การยกเว้นค่าโดยสารรถสาธารณะ',
    implementingAgency: 'กระทรวงมหาดไทย, กทม., ภาคเอกชน',
    effectiveness: 'medium',
    timeframe: 'immediate',
    timeframeLabel: 'เร่งด่วน (ทันที)',
  },
  {
    id: 'M09',
    name: 'ฝนเทียมและการดับไฟป่าทางอากาศ',
    category: 'response',
    relatedCauses: ['wildfire', 'transboundary'],
    areaTypes: ['forest', 'border'],
    description:
      'ปฏิบัติการฝนเทียมในช่วงวิกฤต และการใช้เฮลิคอปเตอร์/เครื่องบินดับไฟป่าในพื้นที่เข้าถึงยาก',
    implementingAgency: 'กองทัพอากาศ, กรมฝนหลวงฯ, กรมอุทยานฯ',
    effectiveness: 'medium',
    timeframe: 'immediate',
    timeframeLabel: 'เร่งด่วน (ทันที)',
  },
  {
    id: 'M10',
    name: 'กลไกทางการทูตลดหมอกควันข้ามแดน ASEAN',
    category: 'response',
    relatedCauses: ['transboundary', 'cross_border_haze'],
    areaTypes: ['border', 'forest'],
    description:
      'เจรจาและประสานงานผ่านกรอบ ASEAN Agreement on Transboundary Haze Pollution เพื่อให้ประเทศเพื่อนบ้านร่วมลดการเผา',
    implementingAgency: 'กระทรวงการต่างประเทศ, ASEAN',
    effectiveness: 'low',
    timeframe: 'long',
    timeframeLabel: 'ระยะยาว (4+ ปี)',
  },

  // ── Recovery (การฟื้นฟู) ─────────────────────────────────────────────
  {
    id: 'M11',
    name: 'ระบบดูแลสุขภาพกลุ่มเสี่ยง (เด็ก ผู้สูงอายุ ผู้ป่วย)',
    category: 'recovery',
    relatedCauses: ['wildfire', 'vehicles', 'transboundary', 'industry'],
    areaTypes: ['forest', 'urban', 'agricultural', 'border'],
    description:
      'จัดบริการทางการแพทย์เชิงรุก แจกหน้ากาก N95 จัดห้องปลอดฝุ่นในโรงเรียน/ชุมชน และระบบติดตามสุขภาพกลุ่มเสี่ยง',
    implementingAgency: 'กระทรวงสาธารณสุข, อสม., อปท.',
    effectiveness: 'high',
    timeframe: 'immediate',
    timeframeLabel: 'เร่งด่วน (ทันที)',
  },
  {
    id: 'M12',
    name: 'โครงการชดเชยเกษตรกรที่หยุดเผา',
    category: 'recovery',
    relatedCauses: ['rice_stubble', 'sugarcane', 'corn'],
    areaTypes: ['agricultural'],
    description:
      'ระบบชดเชยรายได้หรือสนับสนุนต้นทุนสำหรับเกษตรกรที่เปลี่ยนพฤติกรรม เพื่อแก้ปัญหาแรงจูงใจทางเศรษฐกิจ',
    implementingAgency: 'กระทรวงเกษตรฯ, ธ.ก.ส., จังหวัด',
    effectiveness: 'high',
    timeframe: 'short',
    timeframeLabel: 'ระยะสั้น (1–2 ปี)',
  },
  {
    id: 'M13',
    name: 'การฟื้นฟูป่าหลังเกิดไฟ',
    category: 'recovery',
    relatedCauses: ['wildfire'],
    areaTypes: ['forest'],
    description:
      'ปลูกป่าทดแทนและฟื้นฟูระบบนิเวศหลังไฟป่า โดยใช้พันธุ์พืชพื้นเมืองและการมีส่วนร่วมของชุมชน',
    implementingAgency: 'กรมป่าไม้, กรมอุทยานฯ, ชุมชน, ภาคเอกชน',
    effectiveness: 'medium',
    timeframe: 'long',
    timeframeLabel: 'ระยะยาว (4+ ปี)',
  },
];
