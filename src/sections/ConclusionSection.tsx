import SectionHeader from '../components/SectionHeader';

const USE_CASES = [
  {
    icon: '🎯',
    title: 'ระบุพื้นที่เร่งด่วน',
    desc: 'ผู้บริหารสามารถระบุจังหวัดและภาคที่ต้องการการแทรกแซงเชิงนโยบายก่อน โดยอ้างอิงข้อมูลความรุนแรงและจำนวนประชากรที่ได้รับผลกระทบ',
  },
  {
    icon: '🔍',
    title: 'เลือกมาตรการตรงเหตุ',
    desc: 'เชื่อมโยงสาเหตุเฉพาะพื้นที่กับมาตรการที่เหมาะสม ลดความซ้ำซ้อนของงบประมาณ และเพิ่มประสิทธิผลของการแทรกแซง',
  },
  {
    icon: '📊',
    title: 'ประเมินหลักฐานก่อนตัดสินใจ',
    desc: 'ตรวจสอบว่ามาตรการที่จะเลือกมีหลักฐานวิจัยรองรับหรือยัง เพื่อลดความเสี่ยงจากนโยบายที่ขาดฐานหลักฐาน',
  },
  {
    icon: '🔗',
    title: 'เชื่อมโยงงบวิจัยกับปัญหา',
    desc: 'กำหนดทิศทางการสนับสนุนงานวิจัยผ่านแผน ววน. ให้ตอบโจทย์ช่องว่างหลักฐานที่ระบุได้จากการวิเคราะห์นี้',
  },
];

const GAPS = [
  'ข้อมูล PM2.5 แบบ real-time ในระดับตำบล/ชุมชนยังขาดแคลน',
  'ข้อมูลความสัมพันธ์เชิงเหตุผลระหว่างแหล่งกำเนิดและค่า PM2.5 ในพื้นที่ชายแดน',
  'หลักฐานต้นทุน–ผลประโยชน์ของมาตรการเกษตรทางเลือกในระดับนโยบาย',
  'กลไกชดเชยที่ได้รับการทดสอบในพื้นที่จริง (Pilot) อย่างเป็นระบบ',
  'ความร่วมมือข้อมูลกับประเทศเพื่อนบ้านเพื่อวิเคราะห์หมอกควันข้ามแดน',
];

const NEXT_PHASES = [
  {
    phase: 'ระยะที่ 1',
    title: 'เชื่อมต่อฐานข้อมูลจริง',
    desc: 'นำข้อมูล NRIIS, PCD, กรมอุตุฯ และ GISTDA เข้าสู่ระบบแทนข้อมูลจำลอง',
    color: '#2563eb',
  },
  {
    phase: 'ระยะที่ 2',
    title: 'พัฒนาระบบตัวชี้วัดเชิงนโยบาย',
    desc: 'กำหนด KPI สำหรับติดตามผลมาตรการ PM2.5 แต่ละพื้นที่ และแสดงผลอัตโนมัติ',
    color: '#7c3aed',
  },
  {
    phase: 'ระยะที่ 3',
    title: 'เชื่อมกับระบบติดตามแผน ววน.',
    desc: 'บูรณาการกับระบบรายงานความก้าวหน้าของแผน ววน. เพื่อให้ผู้บริหารเห็นสถานะวิจัยจริง',
    color: '#16a34a',
  },
];

export default function ConclusionSection() {
  return (
    <div className="space-y-8">
      <SectionHeader
        number="07"
        title="ข้อสรุปเชิงนโยบายและการใช้ประโยชน์"
        subtitle="สิ่งที่ระบบนี้ช่วยผู้กำหนดนโยบายได้ ช่องว่างที่เหลืออยู่ และแนวทางพัฒนาต่อ"
        keyMessage="PM2.5 ไม่ใช่ปัญหาเดียว — มันคือกลุ่มปัญหาที่ต้องการคำตอบที่แตกต่างกันตามพื้นที่และบริบท"
      />

      {/* Main Value Proposition */}
      <div className="bg-navy-950 rounded-xl p-6 text-white">
        <h3 className="text-white font-bold text-base mb-5">ระบบนี้ช่วยผู้บริหารและนักวิเคราะห์ทำอะไรได้บ้าง</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {USE_CASES.map((uc, i) => (
            <div key={i} className="bg-navy-900 rounded-xl p-4 flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{uc.icon}</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">{uc.title}</p>
                <p className="text-navy-300 text-xs leading-relaxed">{uc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Conclusions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-navy-900 font-bold text-sm mb-4">ข้อสรุปเชิงนโยบาย 5 ประการ</h3>
        <div className="space-y-4">
          {[
            {
              num: '01',
              title: 'PM2.5 ไม่ใช่ปัญหาเดียว — ต้องแยกพื้นที่',
              body: 'ภาคเหนือ ภาคกลาง และภาคชายแดนมีสาเหตุแตกต่างกันอย่างมีนัยสำคัญ การออกนโยบายระดับชาติเพียงชุดเดียวไม่เพียงพอ ต้องมีแผนเฉพาะพื้นที่',
            },
            {
              num: '02',
              title: 'หลักฐานวิจัยมีอยู่บ้าง แต่ยังขาดการเชื่อมโยงกับนโยบาย',
              body: 'งานวิจัยที่ดีมีอยู่จริง โดยเฉพาะด้านระบบตรวจวัดและผลกระทบสุขภาพ แต่ขาดกลไกที่จะแปลงหลักฐานเหล่านี้เป็นการตัดสินใจเชิงนโยบายอย่างเป็นระบบ',
            },
            {
              num: '03',
              title: 'แรงจูงใจทางเศรษฐกิจสำคัญกว่าการบังคับ',
              body: 'การเผาเกษตรคือทางเลือกเชิงเศรษฐกิจ ไม่ใช่ความประมาท มาตรการที่ยั่งยืนต้องมีทางเลือกและแรงจูงใจทางการเงินที่ชัดเจน',
            },
            {
              num: '04',
              title: 'หมอกควันข้ามแดนต้องการกลไกทางการทูต',
              body: 'ปัญหานี้ไม่สามารถแก้ด้วยนโยบายภายในประเทศเพียงอย่างเดียว ต้องการความร่วมมือเชิงสถาบันกับ ASEAN และประเทศเพื่อนบ้าน',
            },
            {
              num: '05',
              title: 'แผน ววน. ควรกำหนดโจทย์วิจัย PM2.5 อย่างชัดเจน',
              body: 'กรอบทิศทาง ววน. สอดคล้องกับความต้องการ แต่ต้องการการกำหนดโจทย์วิจัยเฉพาะเจาะจงที่เชื่อมกับช่องว่างที่วิเคราะห์ได้จากข้อมูล',
            },
          ].map((item) => (
            <div key={item.num} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-navy-900 flex items-center justify-center">
                <span className="text-white text-xs font-bold">{item.num}</span>
              </div>
              <div>
                <p className="text-sm font-bold text-navy-900 mb-1">{item.title}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data & Evidence Gaps */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h3 className="text-amber-900 font-bold text-sm mb-3 flex items-center gap-2">
          <span>⚠️</span> ช่องว่างข้อมูลและหลักฐานที่เหลืออยู่
        </h3>
        <ul className="space-y-2">
          {GAPS.map((g, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-amber-800">
              <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center font-bold text-xs">!</span>
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Next Phases */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h3 className="text-navy-900 font-bold text-sm mb-4">แผนพัฒนาระบบระยะถัดไป</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {NEXT_PHASES.map((phase) => (
            <div key={phase.phase} className="p-4 rounded-xl border-l-4" style={{ borderLeftColor: phase.color, backgroundColor: phase.color + '08' }}>
              <p className="text-xs font-bold mb-1" style={{ color: phase.color }}>{phase.phase}</p>
              <p className="text-sm font-bold text-navy-900 mb-2">{phase.title}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{phase.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center space-y-2 py-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-xs text-gray-500 font-medium">ต้นแบบระบบ — ข้อมูลทั้งหมดเป็นข้อมูลจำลองสำหรับการสาธิตเท่านั้น</span>
        </div>
        <p className="text-xs text-gray-400">
          สร้างด้วย React + TypeScript + Recharts · ศูนย์ข้อมูลสนับสนุนการตัดสินใจ PM2.5 · ต้นแบบ v1.0
        </p>
      </div>
    </div>
  );
}
