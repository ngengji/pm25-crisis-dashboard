import type { ResearchProject } from '../types';

// ─── Research Evidence Library (ตัวอย่าง) ────────────────────────────────────
// ⚠️ ข้อมูลจำลองสำหรับต้นแบบเท่านั้น — ไม่ใช่ข้อมูลจริงจากฐานข้อมูล NRIIS
// ใช้เพื่อสาธิตโครงสร้างระบบหลักฐานเชิงนโยบาย

export const researchProjects: ResearchProject[] = [
  {
    id: 'R01',
    title: 'ระบบพยากรณ์คุณภาพอากาศและ PM2.5 สำหรับภาคเหนือของประเทศไทย',
    year: 2565,
    hostAgency: 'วช. / มหาวิทยาลัยเชียงใหม่',
    theme: 'ระบบข้อมูลและการตัดสินใจ',
    areaRelevance: ['forest', 'border'],
    policyReadiness: 'high',
    linkedMeasures: ['M01', 'M02'],
    evidenceStrength: 'strong',
    abstract:
      'พัฒนาแบบจำลองทางคณิตศาสตร์ร่วมกับ Machine Learning สำหรับพยากรณ์ค่า PM2.5 รายวันในภาคเหนือ ล่วงหน้า 3 วัน ความแม่นยำ 82% ทดสอบในพื้นที่จริง 6 จังหวัด',
    status: 'completed',
  },
  {
    id: 'R02',
    title: 'แนวทางลดการเผาอ้อยก่อนตัดในภาคกลางและภาคตะวันออก',
    year: 2564,
    hostAgency: 'สวทช. / สถาบันวิจัยอ้อยและน้ำตาล',
    theme: 'นวัตกรรมเกษตรและชีวมวล',
    areaRelevance: ['agricultural'],
    policyReadiness: 'medium',
    linkedMeasures: ['M03', 'M04', 'M12'],
    evidenceStrength: 'partial',
    abstract:
      'ศึกษาแรงจูงใจทางเศรษฐกิจและอุปสรรคในการเลิกเผาอ้อย พัฒนาต้นแบบเครื่องตัดอ้อยสดขนาดเล็กสำหรับชาวไร่รายย่อย พบว่าต้องการเงินอุดหนุนเฉลี่ย 850 บาท/ไร่ เพื่อให้คุ้มทุน',
    status: 'completed',
  },
  {
    id: 'R03',
    title: 'นวัตกรรมเซ็นเซอร์ PM2.5 ต้นทุนต่ำสำหรับการติดตามเชิงพื้นที่',
    year: 2566,
    hostAgency: 'NECTEC / สวทช.',
    theme: 'ระบบข้อมูลและการตัดสินใจ',
    areaRelevance: ['forest', 'urban', 'agricultural', 'border'],
    policyReadiness: 'high',
    linkedMeasures: ['M01'],
    evidenceStrength: 'strong',
    abstract:
      'ออกแบบและทดสอบเซ็นเซอร์ PM2.5 ต้นทุนต่ำ (<3,000 บาท/หน่วย) เชื่อมต่อ IoT ที่มีความแม่นยำเพียงพอสำหรับงานชุมชน ทดสอบในพื้นที่ชุมชน 12 แห่งใน 4 ภาค',
    status: 'completed',
  },
  {
    id: 'R04',
    title: 'ผลกระทบต่อสุขภาพระยะยาวจาก PM2.5 ในกลุ่มเสี่ยง',
    year: 2565,
    hostAgency: 'กรมควบคุมโรค / กระทรวงสาธารณสุข',
    theme: 'สุขภาพและการคุ้มครองกลุ่มเสี่ยง',
    areaRelevance: ['forest', 'urban'],
    policyReadiness: 'high',
    linkedMeasures: ['M11'],
    evidenceStrength: 'strong',
    abstract:
      'ติดตามสุขภาพเด็ก ผู้สูงอายุ และผู้ป่วยโรคเรื้อรังในพื้นที่วิกฤต 3 จังหวัดภาคเหนือ พบอัตราการเข้ารับการรักษา (ER Visit) เพิ่มขึ้น 34% ในช่วงวิกฤต PM2.5',
    status: 'completed',
  },
  {
    id: 'R05',
    title: 'รูปแบบการจัดการไฟป่าโดยชุมชนบนพื้นที่สูง ภาคเหนือ',
    year: 2564,
    hostAgency: 'วช. / มหาวิทยาลัยแม่โจ้',
    theme: 'การจัดการเชิงพื้นที่และนโยบายสาธารณะ',
    areaRelevance: ['forest'],
    policyReadiness: 'medium',
    linkedMeasures: ['M03', 'M06', 'M13'],
    evidenceStrength: 'partial',
    abstract:
      'ศึกษาและพัฒนารูปแบบการจัดการไฟป่าโดยชุมชน (Community-Based Fire Management) ในพื้นที่สูง 8 ชุมชน พบว่าชุมชนที่มีกฎชุมชนชัดเจนลดจำนวน Hotspot ได้ 40–60%',
    status: 'completed',
  },
  {
    id: 'R06',
    title: 'กลไกนโยบายระหว่างประเทศเพื่อลดหมอกควันข้ามแดน',
    year: 2566,
    hostAgency: 'TDRI / กระทรวงการต่างประเทศ',
    theme: 'การจัดการเชิงพื้นที่และนโยบายสาธารณะ',
    areaRelevance: ['border', 'forest'],
    policyReadiness: 'low',
    linkedMeasures: ['M10'],
    evidenceStrength: 'partial',
    abstract:
      'วิเคราะห์ประสิทธิผลของกรอบ ASEAN Agreement on Transboundary Haze Pollution และเสนอแนวทางเสริมสร้างพันธกรณีทางกฎหมาย พบว่ากลไกปัจจุบันขาดความผูกพันทางกฎหมายที่เพียงพอ',
    status: 'ongoing',
  },
  {
    id: 'R07',
    title: 'เทคโนโลยีดักจับและกรองฝุ่นสำหรับเขตอุตสาหกรรม',
    year: 2565,
    hostAgency: 'MTEC / สวทช.',
    theme: 'เทคโนโลยีสิ่งแวดล้อม',
    areaRelevance: ['urban'],
    policyReadiness: 'low',
    linkedMeasures: ['M05'],
    evidenceStrength: 'insufficient',
    abstract:
      'วิจัยพื้นฐานด้านวัสดุกรองฝุ่น PM2.5 ประสิทธิสูงสำหรับปล่องระบาย ยังอยู่ในระดับ TRL 4 ต้องการการทดสอบในสภาพจริงเพิ่มเติม',
    status: 'ongoing',
  },
  {
    id: 'R08',
    title: 'ระบบ AI สำหรับตรวจจับและพยากรณ์ Hotspot ไฟป่าจากดาวเทียม',
    year: 2566,
    hostAgency: 'GISTDA / กรมอุทยานฯ',
    theme: 'ระบบข้อมูลและการตัดสินใจ',
    areaRelevance: ['forest', 'border'],
    policyReadiness: 'high',
    linkedMeasures: ['M02', 'M07'],
    evidenceStrength: 'strong',
    abstract:
      'พัฒนา Deep Learning model สำหรับตรวจจับ Hotspot ไฟป่าจากภาพ Satellite ล่วงหน้า 5–7 วัน ทดสอบในฤดูกาล 2565–2566 ความแม่นยำ 88% ลดเวลาตอบสนอง 60%',
    status: 'completed',
  },
  {
    id: 'R09',
    title: 'แนวทางลดการเผาข้าวโพดในพื้นที่สูง : กรณีศึกษาภาคเหนือ',
    year: 2564,
    hostAgency: 'มหาวิทยาลัยเชียงใหม่ / สกสว.',
    theme: 'นวัตกรรมเกษตรและชีวมวล',
    areaRelevance: ['forest', 'agricultural'],
    policyReadiness: 'medium',
    linkedMeasures: ['M04', 'M12'],
    evidenceStrength: 'partial',
    abstract:
      'ศึกษาปัจจัยทางเศรษฐกิจและสังคมที่ผลักดันการเผาข้าวโพดในพื้นที่สูง เสนอแพ็คเกจสนับสนุน ประกอบด้วยเครื่องมือ+ความรู้+ตลาด พบว่าต้องการงบสนับสนุน 3 ปีแรกจึงจะยั่งยืน',
    status: 'completed',
  },
  {
    id: 'R10',
    title: 'ประเมินผลกระทบทางเศรษฐกิจของ PM2.5 ในภาคเหนือ',
    year: 2565,
    hostAgency: 'สศช. / NESDC',
    theme: 'การจัดการเชิงพื้นที่และนโยบายสาธารณะ',
    areaRelevance: ['forest', 'urban'],
    policyReadiness: 'medium',
    linkedMeasures: ['M11', 'M13'],
    evidenceStrength: 'strong',
    abstract:
      'ประเมินมูลค่าความเสียหายทางเศรษฐกิจจาก PM2.5 ในภาคเหนือด้านสุขภาพ การท่องเที่ยว และแรงงาน ประมาณการ 35,000–55,000 ล้านบาท/ปีในปีวิกฤต',
    status: 'completed',
  },
  {
    id: 'R11',
    title: 'ต้นแบบระบบชดเชยเกษตรกรหยุดเผาอ้อย: การทดลองเชิงนโยบาย',
    year: 2566,
    hostAgency: 'สกสว. / กระทรวงเกษตรฯ',
    theme: 'นวัตกรรมเกษตรและชีวมวล',
    areaRelevance: ['agricultural'],
    policyReadiness: 'medium',
    linkedMeasures: ['M12', 'M03'],
    evidenceStrength: 'partial',
    abstract:
      'นำร่องโครงการ Payment for Ecosystem Services (PES) ในพื้นที่ปลูกอ้อย 3 จังหวัด พบว่าเกษตรกร 68% ยินดีหยุดเผาหากได้รับชดเชย 1,000–1,500 บาท/ไร่',
    status: 'ongoing',
  },
  {
    id: 'R12',
    title: 'สมรรถภาพปอดของเด็กในพื้นที่ PM2.5 สูง: การศึกษากลุ่มตัวอย่างตามยาว',
    year: 2566,
    hostAgency: 'คณะแพทยศาสตร์ มช. / สธ.',
    theme: 'สุขภาพและการคุ้มครองกลุ่มเสี่ยง',
    areaRelevance: ['forest'],
    policyReadiness: 'high',
    linkedMeasures: ['M11'],
    evidenceStrength: 'strong',
    abstract:
      'ติดตามสมรรถภาพปอดเด็กอายุ 6–12 ปีในเชียงใหม่เป็นเวลา 3 ปี พบการลดลงของ FVC และ FEV1 อย่างมีนัยสำคัญในช่วงวิกฤต PM2.5 เสนอแนะระบบห้องเรียนปลอดฝุ่นเป็นมาตรการเร่งด่วน',
    status: 'completed',
  },
];

// ─── Gap Analysis Summary ─────────────────────────────────────────────────────
export const gapSummary = {
  strong: researchProjects.filter(p => p.evidenceStrength === 'strong').length,
  partial: researchProjects.filter(p => p.evidenceStrength === 'partial').length,
  insufficient: researchProjects.filter(p => p.evidenceStrength === 'insufficient').length,
};

// ─── Policy Readiness Summary ─────────────────────────────────────────────────
export const readinessSummary = {
  high: researchProjects.filter(p => p.policyReadiness === 'high').length,
  medium: researchProjects.filter(p => p.policyReadiness === 'medium').length,
  low: researchProjects.filter(p => p.policyReadiness === 'low').length,
};
