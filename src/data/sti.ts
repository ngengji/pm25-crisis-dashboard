import type { STIDirection, AlignmentRow } from '../types';

// ─── STI Plan Directions (แผน ววน. 2566–2570) ────────────────────────────────
// ⚠️ ป้ายกำกับระดับสูงเพื่อการสาธิต — ต้องตรวจสอบกับเอกสารแผน ววน. อย่างเป็นทางการ

export const stiDirections: STIDirection[] = [
  {
    id: 'STI1',
    label: 'ระบบข้อมูลและการตัดสินใจ',
    labelShort: 'ข้อมูล/ตัดสินใจ',
    description:
      'การพัฒนาระบบข้อมูลขนาดใหญ่ ดาวเทียม AI และแพลตฟอร์มสนับสนุนการตัดสินใจของภาครัฐ',
    color: '#2563eb',
  },
  {
    id: 'STI2',
    label: 'เทคโนโลยีสิ่งแวดล้อม',
    labelShort: 'เทคโนโลยีสิ่งแวดล้อม',
    description:
      'นวัตกรรมและเทคโนโลยีสำหรับการจัดการมลภาวะ พลังงานสะอาด และสิ่งแวดล้อม',
    color: '#16a34a',
  },
  {
    id: 'STI3',
    label: 'นวัตกรรมเกษตรและชีวมวล',
    labelShort: 'เกษตร/ชีวมวล',
    description:
      'การปรับเปลี่ยนระบบเกษตรกรรม เทคโนโลยีชีวมวล และการใช้ประโยชน์จากวัสดุเหลือทิ้ง',
    color: '#ca8a04',
  },
  {
    id: 'STI4',
    label: 'สุขภาพและการคุ้มครองกลุ่มเสี่ยง',
    labelShort: 'สุขภาพ/กลุ่มเสี่ยง',
    description:
      'วิจัยผลกระทบสุขภาพ ระบบเฝ้าระวังโรค และมาตรการป้องกันสำหรับกลุ่มเปราะบาง',
    color: '#dc2626',
  },
  {
    id: 'STI5',
    label: 'การจัดการเชิงพื้นที่และนโยบายสาธารณะ',
    labelShort: 'พื้นที่/นโยบาย',
    description:
      'กลไกนโยบาย การกำกับดูแล และการจัดการทรัพยากรธรรมชาติและสิ่งแวดล้อมเชิงพื้นที่',
    color: '#7c3aed',
  },
];

// ─── Alignment Rows (PM2.5 Issue → STI Direction) ────────────────────────────

export const alignmentRows: AlignmentRow[] = [
  {
    issue: 'ไฟป่าและการเผาในที่โล่งภาคเหนือ',
    cause: 'ไฟป่า / เผาเกษตรบนที่สูง',
    measure: 'ระบบพยากรณ์ Hotspot + บังคับใช้กฎหมาย',
    researchIds: ['R01', 'R05', 'R08'],
    stiDirectionId: 'STI1',
    gapLevel: 'covered',
    note: 'มีหลักฐานวิจัยรองรับในระดับดี พร้อมนำไปใช้',
  },
  {
    issue: 'หมอกควันข้ามแดน',
    cause: 'การเผาไหม้ในต่างประเทศ',
    measure: 'กลไกทางการทูต ASEAN',
    researchIds: ['R06'],
    stiDirectionId: 'STI5',
    gapLevel: 'gap',
    note: 'ขาดงานวิจัยรองรับมาตรการทางการทูต งบวิจัยยังน้อย',
  },
  {
    issue: 'การเผาตอซังและพืชไร่',
    cause: 'แรงจูงใจเศรษฐกิจเกษตรกร',
    measure: 'เกษตรทางเลือก + ระบบชดเชย',
    researchIds: ['R02', 'R09', 'R11'],
    stiDirectionId: 'STI3',
    gapLevel: 'partial',
    note: 'มีงานวิจัยบ้าง แต่ยังขาด evidence ระดับ policy scale',
  },
  {
    issue: 'มลพิษจากยานพาหนะในเมือง',
    cause: 'ยานพาหนะ + สภาพอากาศสะสม',
    measure: 'มาตรฐานไอเสีย + มาตรการฉุกเฉิน',
    researchIds: ['R03'],
    stiDirectionId: 'STI2',
    gapLevel: 'partial',
    note: 'มาตรฐานยานพาหนะต้องการงานวิจัยเฉพาะบริบทไทยเพิ่ม',
  },
  {
    issue: 'มลพิษจากอุตสาหกรรม',
    cause: 'โรงงาน + นิคมอุตสาหกรรม',
    measure: 'เทคโนโลยีดักจับฝุ่น + กฎระเบียบ',
    researchIds: ['R07'],
    stiDirectionId: 'STI2',
    gapLevel: 'gap',
    note: 'เทคโนโลยีอยู่ระดับ TRL4 ยังไม่พร้อมใช้งานจริง',
  },
  {
    issue: 'ผลกระทบสุขภาพกลุ่มเสี่ยง',
    cause: 'PM2.5 จากทุกแหล่ง',
    measure: 'ระบบดูแลสุขภาพเชิงรุก',
    researchIds: ['R04', 'R12'],
    stiDirectionId: 'STI4',
    gapLevel: 'covered',
    note: 'หลักฐานชัดเจน มาตรการมีความพร้อมสูง',
  },
  {
    issue: 'ผลกระทบทางเศรษฐกิจและสังคม',
    cause: 'การสูญเสียรายได้ การท่องเที่ยว แรงงาน',
    measure: 'ระบบประเมินและชดเชยความเสียหาย',
    researchIds: ['R10'],
    stiDirectionId: 'STI5',
    gapLevel: 'partial',
    note: 'มีข้อมูลเศรษฐศาสตร์ แต่ยังขาดกลไกชดเชยที่ชัดเจน',
  },
];

// ─── Priority Matrix ──────────────────────────────────────────────────────────
// ความเร่งด่วน × ความพร้อมของหลักฐาน
export const priorityMatrix = [
  { issue: 'ระบบเฝ้าระวัง PM2.5', urgency: 'high', readiness: 'high', action: 'ดำเนินการทันที' },
  { issue: 'ผลกระทบสุขภาพ', urgency: 'high', readiness: 'high', action: 'ดำเนินการทันที' },
  { issue: 'ไฟป่า AI Hotspot', urgency: 'high', readiness: 'high', action: 'ดำเนินการทันที' },
  { issue: 'เกษตรทางเลือก', urgency: 'high', readiness: 'medium', action: 'เร่งรัดพัฒนา' },
  { issue: 'ชดเชยเกษตรกร', urgency: 'high', readiness: 'medium', action: 'เร่งรัดพัฒนา' },
  { issue: 'มาตรฐานยานพาหนะ', urgency: 'medium', readiness: 'medium', action: 'วางแผนระยะกลาง' },
  { issue: 'กลไกอาเซียน', urgency: 'high', readiness: 'low', action: 'เพิ่มงบวิจัย' },
  { issue: 'เทคโนโลยีดักฝุ่น', urgency: 'medium', readiness: 'low', action: 'เพิ่มงบวิจัย' },
];
